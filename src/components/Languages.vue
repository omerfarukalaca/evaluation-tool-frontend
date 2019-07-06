<template>
  <div class="languages container">
    <div class="card" v-for="language in languages" :key="language.id">
      <div class="card-content">
        <h5 class="indigo-text">{{language.name}}</h5>

      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name: 'LanguageDetail', params: {id: language.id}} ">
          <i class="material-icons forward">forward</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase/init";
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default {
  name: "Languages",
  data() {
    return{
        id: this.$route.params.language_id,
        languages: []
    }
  },
  created() {
    //fetch data from the firestore
    db.collection("languages")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let language = doc.data();
          language.id = doc.id;
          if(doc.data().is_active == true)
            this.languages.push(language);
        });
      });
  }
};
</script>

<style scoped>
</style>
