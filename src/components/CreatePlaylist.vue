<template>
  <div class="text-center center">
    <form @submit.prevent="createPlaylist" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Create Playlist</h1>
      <input
        type="text"
        class="form-control middle"
        placeholder="Playlist Name"
        name="name"
        required
        autofocus
      />
      <div class="form-check middle d-flex justify-content-between mt-2">
        <label class="form-check-label" for="isPrivate">Private List</label>
        <input
          v-model="isPrivate"
          class="form-check-input"
          type="checkbox"
          name="isPrivate"
          id="isPrivate"
        />
      </div>
      <button class="btn btn-lg btn-primary btn-block mt-2" type="submit">
        Create Playlist
      </button>
      <div v-if="err" class="alert alert-danger mt-2" role="alert">
        {{ msg }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      err: false,
      msg: "",
      isPrivate: false,
    };
  },
  methods: {
    createPlaylist(e) {
      const self = this;
      axios
        .post(
          "http://localhost:8000/api/v1/playlist/create",
          {
            name: e.target[0].value,
            isPrivate: self.isPrivate,
          },
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then(function (response) {
          console.log(response);
          self.err = false;
          self.$router.push("home");
        })
        .catch(function (error) {
          console.log(error);
          self.msg = error.response.data.message;
          self.err = true;
        });
    },
  },
  beforeMount() {
    this.isloggedin();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
