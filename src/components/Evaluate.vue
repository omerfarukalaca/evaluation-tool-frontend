<template>
  <div class="evaluate container">
    <h3 class="center-align indigo-text" v-if="language">Evaluation Form for {{language.name}}</h3>
    <form @submit.prevent="AddEvaluation">
      <!-- LETTER OF CONSENT -->
      <div class="letter-of-consent container">
        <h4 class="left-align indigo-text">Letter of Consent</h4>
        <div class="field consent">
          <p>
        This experimental work is conducted within the EGE University International Computer Institute Software Engineering Laboratory (SerLAB).

        <br><br>All information stated as part of this experiment is confidential and will be kept as such. Associate Professor Geylani Kardaş and Assistant Professor Moharram Challenger are responsible for this experiment and can be contacted at:
        <ul>
            <li>Associate Professor Geylani Kardaş:  
                <a href="http://ube.ege.edu.tr/~kardas/">http://ube.ege.edu.tr/~kardas/</a>
            </li>
            <li>Assistant Professor Moharram Challenger:  
                <a href="http://ube.ege.edu.tr/~challenger/">http://ube.ege.edu.tr/~challenger/</a>
            </li>
        </ul>

        We would like to emphasize that:
        <ol>
            <li>Your participation is entirely voluntary;</li>
            <li>You are free to refuse to answer any question;</li>
            <li>You are free to withdraw at any time.</li>
        </ol>
        The experiment will be kept strictly confidential and will be made available only to members of the research team of the study or, in case external quality assessment takes place, to assessors under the same confidentiality conditions. Data collected in this experiment may be part of the final research report, but under no circumstances will your name or any identifying characteristic be included in the report.
        <br><br>I accept the terms addressed above:
      </p>
        </div>
      <div class="field isAccept">
          <p>
            <label>
              <input class="with-gap" name="isAccept" type="radio"  value=true v-model="personalData.consent" checked>
              <span>Yes</span>
            </label>
            <label>
              <input class="with-gap" name="isAccept" type="radio" value=false v-model="personalData.consent">
              <span>No</span>
            </label>
          </p>
        </div>
      </div>

      <!-- PERSONAL DATA -->
      <div class="personal-data container">
        <h4 class="left-align indigo-text">Personal Data</h4>
        <div class="field email">
          <label for="email">Email Address</label>
          <input type="email" name="email" v-model="personalData.email">
        </div>
        <br>
        <div class="field gender">
          <label for="gender">Gender</label>
          <p>
            <label>
              <input class="with-gap" name="gender" type="radio"  value="male" v-model="personalData.gender" checked>
              <span>Male</span>
            </label>
            <label>
              <input class="with-gap" name="gender" type="radio" value="female" v-model="personalData.gender">
              <span>Female</span>
            </label>
          </p>
        </div>
        <div class="field age">
          <label for="age">Age</label>
          <p>
            <label>
              <input class="with-gap" name="age" type="radio" value="17-22" v-model="personalData.age" checked>
              <span>17-22</span>
            </label>
            <label>
              <input class="with-gap" name="age" type="radio" value="23-25" v-model="personalData.age">
              <span>23-25</span>
            </label>
            <label>
              <input class="with-gap" name="age" type="radio" value="26+" v-model="personalData.age">
              <span>26+</span>
            </label>
          </p>
        </div>
        <div class="field studies">
          <label for="studies">Please select your field of studies. If none of the below defines it correctly, please choose the option "other"</label>
          <p>
             <label>
              <input class="with-gap" name="studies" type="radio" value="Computer Science/Engineering" v-model="personalData.study" checked>
              <span>Computer Science/Engineering</span>
            </label>
          </p>
          <p>
            <label>
              <input class="with-gap" name="studies" type="radio" value="Electronic Engineering" v-model="personalData.study">
              <span>Electronic Engineering</span>
            </label>
          </p>
          <p><label>
              <input class="with-gap" name="studies" type="radio" value="Other" v-model="personalData.study">
              <span>Other</span>
            </label>
          </p>
        </div>
        <div class="field education">
          <label for="education">Completed Education</label>
          <p>
             <label>
              <input class="with-gap" name="education" type="radio" value="Bachelor of Science" v-model="personalData.education" checked>
              <span>Bachelor of Science</span>
            </label>
          </p>
          <p>
            <label>
              <input class="with-gap" name="education" type="radio" value="Master of Science" v-model="personalData.education">
              <span>Master of Science</span>
            </label>
          </p>
          <p><label>
              <input class="with-gap" name="education" type="radio" value="Doctor of Philosophy" v-model="personalData.education">
              <span>Doctor of Philosophy</span>
            </label>
          </p>
          <p><label>
              <input class="with-gap" name="education" type="radio" value="Postdoctoral" v-model="personalData.education">
              <span>Postdoctoral</span>
            </label>
          </p>
        </div>
      </div>
      <!-- DEVELOPMENT TIMES -->
      <div class="development-times container">
        <h4 class="left-align indigo-text">Development Times</h4>
      </div>
      <!-- UPLOADS -->
      <div class="uploads container">
        <h4 class="left-align indigo-text">Uploads</h4>
          <div class="file-field input-field">
            <div class="btn">
              <span>Modeling Artifacts</span>
              <input type="file" id="modelling-artifacts" @change="detectMA($event.target.files)">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </div>
          <div class="file-field input-field">
            <div class="btn">
              <span>Generated Project</span>
              <input type="file" id="generated-project" @change="detectGP($event.target.files)">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </div>
          <div class="file-field input-field">
            <div class="btn">
              <span>Full Project</span>
              <input type="file" id="full-project" @change="detectFP($event.target.files)">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </div>
      </div>
      <!-- SURVEY -->
      <div class="survey container">
        <h4 class="left-align indigo-text">Survey</h4>
      </div>
      

      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn blue">Submit</button>
      </div>
    </form>
    <br><br><br><br><br>
  </div>
</template>

<script>
import firebaseApp from "@/firebase/init";
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default {
  name: "Evaluate",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      feedback: null,
      language: null,
      personalData: {
        consent: false,
        email: "",
        gender: "",
        study:"",
        education:"",
      modellingArtifact: File,
      generatedProject: File,
      fullProject: File,
      }
    };
  },
  methods: {
    AddEvaluation(){
      if(this.personalData.email && this.personalData.consent){
        this.feedback = null
        storage.ref(this.language.id+"/"+this.personalData.email+"/MA/"+this.modellingArtifact.name).put(this.modellingArtifact);
        storage.ref(this.language.id+"/"+this.personalData.email+"/GP/"+this.generatedProject.name).put(this.generatedProject);
        storage.ref(this.language.id+"/"+this.personalData.email+"/FP/"+this.fullProject.name).put(this.fullProject);
        //PERSONAL DATA
        db.collection('personal_datas').add({
          evaluate_language: this.language.id,
          consent: this.personalData.consent,
          email: this.personalData.email,
          gender: this.personalData.gender,
          age: this.personalData.age,
          study: this.personalData.study,
          education: this.personalData.education,
        }).then(() =>{
          this.$router.push({name: 'Index'})
        }).catch(err => {
          console.log(err)
        })
      } else {
        if(!this.personalData.email)
          this.feedback = 'You must enter a valid email'
        else
          this.feedback = 'You must accept letter of consent for submit'
      }
    },
    detectMA (fileList) {
      this.modellingArtifact = fileList[0]
    },
    detectGP (fileList) {
      this.generatedProject = fileList[0]
    },
    detectFP (fileList) {
      this.fullProject = fileList[0]
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
