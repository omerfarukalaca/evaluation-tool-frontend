<template>
  <div class="hello">
    <div class="container">
      <div class="jumbotron">
        <h1 class="display-4">Agent DSML Evaluation Tool</h1>
        <p
          class="lead"
        >This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      languages: []
    };
  },
  methods: {
    deleteLanguage(id) {
      // Delete doc from firestore
      db.collection("languages")
        .doc(id)
        .delete()
        .then(() => {
          this.languages = this.languages.filter(language => {
            return language.id !== id;
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
