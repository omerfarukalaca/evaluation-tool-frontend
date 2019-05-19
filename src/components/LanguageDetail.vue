<template>
  <div class="language-detail container">
    <h5>Language Detail {{language.name}}</h5>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "LanguageDetail",
  data() {
    return{
        id: this.$route.params.id,
        language: null
    }
  },
  created() {
    let ref = db.collection("languages").where("id", "==", this.id);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.language = doc.data();
        this.language.id = doc.id;
      });
    });
  }
};
</script>

<style scoped>
</style>
