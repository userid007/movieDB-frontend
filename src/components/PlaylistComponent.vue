<template>
  <div class="list-group pt-3" @click="getPlaylist">
    <div class="card">
      <div class="card-body">
        <h3 class="mb-1">{{ pinfo.name }}</h3>
      </div>
    </div>

    <div class="list-group-item">
      <div class="d-flex justify-content-between">
        <div>
          <h6 class="text-muted">{{ pinfo.type }}</h6>
          <h6 class="text-muted">Created by : {{ pinfo.username }}</h6>
          <h6 class="text-muted">Creation Time : {{ pinfo.createdAt }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pinfo: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      playlists: [],
    };
  },
  methods: {
    getPlaylist() {
      localStorage.setItem("playlist", this.pinfo._id);
      localStorage.setItem("type", this.type);
      this.$router.push("playlist");
    },
  },
};
</script>

<style scoped lang="scss">
</style>
