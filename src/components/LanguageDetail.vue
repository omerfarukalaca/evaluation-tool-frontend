<template>
  <div class="language-detail container">
    <h5 v-if="language">Language Detail {{language.name}}</h5>
    <router-link :to="{name: 'Evaluate', params: {id: language.id}} ">
      <a class="waves-effect waves-light btn-large">
        <i class="material-icons right">assignment</i>Evaluate
      </a>
    </router-link>
  </div>
</template>
<script>
import firebaseApp from "@/firebase/init";
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default {
  name: "LanguageDetail",
  data() {
    return {
      id: this.$route.params.id,
      language: null
    };
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
