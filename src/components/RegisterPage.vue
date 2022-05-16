<template>
  <div class="text-center center">
    <form @submit.prevent="register" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      <input
        type="text"
        class="form-control top"
        placeholder="Username"
        name="username"
        required
        autofocus
      />
      <input
        type="password"
        class="form-control middle"
        placeholder="Password"
        name="password"
        required
      />
      <input
        type="password"
        class="form-control bottom"
        placeholder="Confirm Password"
        name="passwordConfirmation"
        required
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign Up
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
  methods: {
    register(e) {
      const self = this;

      if (e.target[1].value !== e.target[2].value) {
        self.err = true;
        self.msg = "Comfirm password shoud match";
      } else {
        axios
          .post("http://localhost:8000/api/v1/auth/register", {
            username: e.target[0].value,
            password: e.target[1].value,
          })
          .then(function (response) {
            console.log(response);
            self.err = false;
            self.$router.push("login");
          })
          .catch(function (error) {
            console.log(error);
            self.msg = error.response.data.message;
            self.err = true;
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
