import Vue from 'vue'
export default Vue.mixin({
  methods: {
    isloggedin() {
      if (localStorage.getItem('accessToken')) {
        return true;
      }
      else {
        this.$router.push("login");
      }
    }
  }
})