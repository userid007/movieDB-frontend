<template>
  <div class="text-center center">
    <form @submit.prevent="login" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      <input
        type="text"
        class="form-control top"
        placeholder="Username"
        name="Username"
        required
        autofocus
      />
      <input
        type="password"
        class="form-control bottom"
        placeholder="Password"
        name="password"
        required
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Login
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
    };
  },
  mounted() {
    console.log(this.$router);
  },
  methods: {
    login(e) {
      const self = this;
      axios
        .post(`${process.env.VUE_APP_API}/api/v1/auth/login`, {
          username: e.target[0].value,
          password: e.target[1].value,
        })
        .then(function (response) {
          console.log(response);
          localStorage.setItem(
            "accessToken",
            "Bearer " + response.data.data.accessToken
          );
          self.err = false;

          self.$router.push("home");
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          self.msg = error.response.data.message;
          self.err = true;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
