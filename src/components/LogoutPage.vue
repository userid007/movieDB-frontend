<template>
  <div></div>
</template>

<script>
export default {
  beforeMount() {
    localStorage.clear();
    this.$router.push("login");
    window.location.reload();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
