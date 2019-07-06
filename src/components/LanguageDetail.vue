<template>
  <div class="language-detail container">
    <!-- LANGUAGE IDENTIFICATION -->
    <div class="card">
      <div class="identification container">
        <h4 v-if="language" class="left-align indigo-text">
          <i class="material-icons">fingerprint</i>
          Identification of {{language.name}}
        </h4>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div class="field identificationField">
                Dil ile ilgili bilgiler ve değerlendirme butonu
                <router-link :to="{name: 'Evaluate', params: {id: language.id}} ">
                  <a class="waves-effect waves-light btn-large">
                    <i class="material-icons right">assignment</i>Evaluate
                  </a>
                </router-link>
              </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
    </div>

    <!-- METAMODEL BENCHMARKING -->
    <div class="card">
      <div class="faml-comp container">
        <h4 class="left-align indigo-text">
          <i class="material-icons">fingerprint</i> Metamodel Comparison
        </h4>
        <div class="section">
          <div class="row">
            <div class="col s6">
              <div class="field totalPercentage">TOTAL PERCENTAGE</div>
            </div>
            <div class="col s6">
              <div class="field totalPercentage">MODEL COMP DESCRIPTION</div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div class="field totalPercentage">DESIGN TIME PER & TABLE</div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div class="field totalPercentage">RUN TIME PER & TABLE</div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
    </div>

    <!-- TIME TABLE -->
    <div class="card">
      <div class="identification container">
        <h4 v-if="language" class="left-align indigo-text">
          <i class="material-icons">fingerprint</i> Time Table
        </h4>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div class="field timeTableField">Geliştirme süreleri grafiği ve açıklama</div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
    </div>

    <!-- SURVEY RESULTS -->
    <div class="card">
      <div class="survey container">
        <h4 class="left-align indigo-text">
          <i class="material-icons">fingerprint</i> Survey Results
        </h4>
        <div class="section">
          <div class="row">
            <div class="col s6">
              <div class="field averageSurvey">Average sonuç grafiği</div>
            </div>
            <div class="col s6">
              <div class="field surveyDesc">Açıklama</div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div
                class="field surveyField"
              >Tab menu ile kategoriler arasında geçiş yaparak anket sonuçlarına ulaşma</div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
    </div>

    <!-- METAMODEL BENCHMARKING -->
    <div class="card">
      <div class="caseStudy container">
        <h4 class="left-align indigo-text">
          <i class="material-icons">fingerprint</i> Case Study Analysis
        </h4>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div
                class="field modelling"
              >Modelling dosyasından kullanılan entitylerin analizi, hangi entityler ne kadar kullanıldı.</div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div
                class="field generated"
              >GP ve FP üzerinden yüzde kaç generate edilmiş sonuçları grafiği</div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
    </div>

    <br />
    <br />
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
label {
  font-size: 15px;
  color: #000000;
}
.container {
  padding: 2px;
}
</style>
