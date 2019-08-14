<template>
  <div class="hello">
    <div class="container">
      <div class="jumbotron">
        <h1 style="text-align: center;"  class="display-4">Agent DSML Evaluation Tool</h1>
        <h5
          class="lead"
        >Greetings,<br><br>  The Agent DSL/DSML Evaluation Tool is a platform for evaluating DSL's and DSML's developed for Multi-Agent System modeling. 
        <br><br>You can go to details to see reviews about the following languages. You can evaluate any of these languages by performing their projects.</h5>
      </div>
      <br />
      <br />
      <div class="languages container">
        <div class="card" v-for="language in languages" :key="language.id">
          <div class="card-content">
            <h5 style="text-align: center;" class="indigo-text">{{language.name}}</h5>
            <div class="section">
              <div class="row">
                <div class="col s12">
                  <div class="field identificationField">
                    <vs-table hoverFlat="false" :data="language">
                      <template slot-scope="{data}">
                        <vs-tr style="font-size:15px;">
                          <vs-td width="30%">
                            <b>Language Name :</b>
                          </vs-td>
                          <vs-td width="70%" :data="data.name">{{data.name}}</vs-td>
                        </vs-tr>
                        <vs-tr style="font-size:15px;">
                          <vs-td>
                            <b>Version :</b>
                          </vs-td>
                          <vs-td :data="data.version">{{data.version}}</vs-td>
                        </vs-tr>
                        <vs-tr style="font-size:15px;">
                          <vs-td>
                            <b>Owner :</b>
                          </vs-td>
                          <vs-td :data="data.owner">{{data.owner}}</vs-td>
                        </vs-tr>
                        <vs-tr style="font-size:15px;">
                          <vs-td>
                            <b>URL :</b>
                          </vs-td>
                          <vs-td>
                            <a>{{data.url}}</a>
                          </vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <br />
              <br />
              <div style="text-align: center;">
                <vs-button color="primary" type="border">
                  <router-link
                    :to="{name: 'LanguageDetail', params: {id: language.id}} "
                  >Click For Details!</router-link>
                </vs-button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    return {
      id: this.$route.params.language_id,
      languages: []
    };
  },
  created() {
    //fetch data from the firestore
    db.collection("languages")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let language = doc.data();
          language.id = doc.id;
          if (doc.data().is_active == true) this.languages.push(language);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
