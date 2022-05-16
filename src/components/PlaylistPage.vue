<template>
  <div>
    <div v-if="moviesList.length === 0">
      <h1>No movies added in playlist</h1>
    </div>
    <div v-else class="row w-100 h-100">
      <MovieCard
        v-for="m in moviesList"
        :key="m.imdbID"
        :minfo="m"
        :show="false"
      />
    </div>
  </div>
</template>

<script>
import MovieCard from "./MovieCard.vue";
import mixin from "../mixin";
import axios from "axios";
export default {
  mixins: [mixin],
  components: {
    MovieCard,
  },
  data() {
    return {
      playlistId: "",
      moviesList: [],
      type: "public",
    };
  },
  beforeCreate() {
    this.playlistId = localStorage.getItem("playlist");
    this.type = localStorage.getItem("type");
    const self = this;
    var url = "";
    console.log(self.type);
    if (self.type === "private") {
      url = `${process.env.VUE_APP_API}/api/v1/playlist/privatelist/${self.playlistId}`;
    } else if (self.type === "public") {
      url = `${process.env.VUE_APP_API}/api/v1/public/playlist/${self.playlistId}`;
    }

    axios
      .get(url, {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      })
      .then(function (response) {
        console.log(response.data.data);
        for (const id of response.data.data.moviesId) {
          axios
            .get(
              `http://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDBAPIKEY}&i=${id}`
            )
            .then(function (response) {
              console.log(response);
              self.moviesList.push(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
