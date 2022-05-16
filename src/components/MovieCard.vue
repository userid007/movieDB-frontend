<template>
  <div class="col-sm-2 card">
    <img :src="minfo.Poster" class="card-img-top" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">{{ minfo.Title }}</h5>
      <p class="card-text">
        {{ minfo.Year }}
      </p>
      <button
        @click="getPlaylist"
        v-if="show"
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        :data-bs-target="'#' + minfo.imdbID"
      >
        Add to Playlist
      </button>

      <div
        v-if="show"
        class="modal fade"
        :id="minfo.imdbID"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add to Playlist
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="list-group">
                <a
                  v-if="movielist && movielist.length === 0"
                  href=""
                  @click="tocreate()"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  >Please create playlist first</a
                >
                <a
                  v-for="t in movielist"
                  @click="addToPlaylist(t._id)"
                  :key="t._id"
                  class="list-group-item list-group-item-action"
                  aria-current="true"
                >
                  {{ t.name }}
                </a>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    minfo: {
      type: Object,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      movielist: undefined,
      showmsg: false,
    };
  },
  created() {
    this.getPlaylist();
  },
  methods: {
    tocreate() {
      this.$router.push("create");
    },
    getPlaylist() {
      const self = this;
      axios
        .get("http://localhost:8000/api/v1/playlist/private", {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        })
        .then(function (response) {
          console.log(response);
          self.movielist = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addToPlaylist(id) {
      console.log(id);

      console.log(this.minfo.Title);
      axios
        .put(
          "http://localhost:8000/api/v1/playlist/update",
          { movieListId: id, movieId: this.minfo.imdbID },
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then(function (response) {
          console.log(response);
          alert("Movie added to playlist " + response.data.data.name);
        })
        .catch(function (error) {
          console.log(error);
          alert("Error");
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
