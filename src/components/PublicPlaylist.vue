<template>
  <div>
    <div v-if="playlists.length === 0">
      <h1>No playlists are available</h1>
    </div>
    <div class="moviecards">
      <PlaylistComponent
        v-for="p in playlists"
        :key="p._id"
        :pinfo="p"
        :type="type"
      />
    </div>
  </div>
</template>

<script>
import PlaylistComponent from "./PlaylistComponent.vue";
import mixin from "../mixin";
import axios from "axios";
export default {
  mixins: [mixin],
  components: {
    PlaylistComponent,
  },
  data() {
    return {
      playlists: [],
      type: "public",
    };
  },
  created() {
    const self = this;
    axios
      .get(`${process.env.VUE_APP_API}/api/v1/playlist/public`)
      .then(function (response) {
        console.log(response.data.data);
        self.playlists = response.data.data;
        for (var i = 0; i < self.playlists.length; i++) {
          if (self.playlists[i].isPrivate) {
            self.playlists[i].type = "Private";
          } else {
            self.playlists[i].type = "Public";
          }
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
.moviecards {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
