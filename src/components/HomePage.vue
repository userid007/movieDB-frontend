<template>
  <div class="search">
    <form @submit.prevent="SearchMovie" class="form-search">
      <input
        v-model="movieName"
        type="text"
        class="form-control middle d-inline"
        placeholder="Type here to search"
        name="Search"
        required
        autofocus
      />
      <button
        class="d-inline btn btn-lg btn-primary btn-block mt-2"
        type="submit"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
    <div class="row w-100 h-100">
      <MovieCard
        v-for="m in moviesList"
        :key="m.imdbID"
        :minfo="m"
        :show="true"
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
      movieName: "",
      moviesList: [],
    };
  },
  methods: {
    SearchMovie() {
      const self = this;
      axios
        .get(
          `http://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDBAPIKEY}&s=${this.movieName}`
        )
        .then(function (response) {
          console.log(response);
          self.moviesList = response.data.Search;
        })
        .catch(function (error) {
          console.log(error);
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
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .form-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    margin-bottom: 2rem;
    input {
      width: 90%;
      padding: 1rem;
    }
    button {
      margin: 2rem 1rem 0.5rem 1rem;
    }
  }
}
</style>
