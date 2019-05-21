<template>
  <div class="evaluate container">
    <h3 class="center-align indigo-text" v-if="language">Evaluation Form for {{language.name}}</h3>
    <form @submit.prevent="AddEvaluation">
      <!-- LETTER OF CONSENT -->
      <div class="card">
        <div class="letter-of-consent container">
          <h4 class="left-align indigo-text">
            <i class="material-icons">verified_user</i> Letter of Consent
          </h4>
          <div class="field consent">
            <p>
              This experimental work is conducted within the EGE University International Computer Institute Software Engineering Laboratory (SerLAB).
              <br>
              <br>All information stated as part of this experiment is confidential and will be kept as such. Associate Professor Geylani Kardaş and Assistant Professor Moharram Challenger are responsible for this experiment and can be contacted at:
            </p>
            <ul>
              <li>
                Associate Professor Geylani Kardaş:
                <a
                  href="http://ube.ege.edu.tr/~kardas/"
                >http://ube.ege.edu.tr/~kardas/</a>
              </li>
              <li>
                Assistant Professor Moharram Challenger:
                <a
                  href="http://ube.ege.edu.tr/~challenger/"
                >http://ube.ege.edu.tr/~challenger/</a>
              </li>
            </ul>We would like to emphasize that:
            <ol>
              <li>Your participation is entirely voluntary;</li>
              <li>You are free to refuse to answer any question;</li>
              <li>You are free to withdraw at any time.</li>
            </ol>The experiment will be kept strictly confidential and will be made available only to members of the research team of the study or, in case external quality assessment takes place, to assessors under the same confidentiality conditions. Data collected in this experiment may be part of the final research report, but under no circumstances will your name or any identifying characteristic be included in the report.
            <br>
            <br>I accept the terms addressed above:
          </div>
          <div class="field isAccept">
            <p>
              <label>
                <input
                  class="with-gap"
                  name="isAccept"
                  type="radio"
                  value="true"
                  v-model="personalData.consent"
                  checked
                >
                <span>Yes</span>
              </label>
              <label>
                <input
                  class="with-gap"
                  name="isAccept"
                  type="radio"
                  value="false"
                  v-model="personalData.consent"
                >
                <span>No</span>
              </label>
            </p>
          </div>
        </div>
      </div>

      <!-- PERSONAL DATA -->
      <div class="card">
        <div class="personal-data container">
          <h4 class="left-align indigo-text">
            <i class="material-icons">fingerprint</i> Personal Data
          </h4>
          <div class="section">
            <div class="input-field col s12">
              <input
                id="email"
                type="email"
                name="email"
                class="validate"
                v-model="personalData.email"
                oninvalid="this.setCustomValidity('Please Enter valid email')"
                oninput="setCustomValidity('')"
                required
              >
              <label for="email">Email</label>
              <span class="helper-text" data-error="invalid email">abc@xyz.com</span>
            </div>
            <div class="divider"></div>
          </div>
          <div class="section">
            <div class="row">
              <div class="col s6">
                <div class="field gender">
                  <label for="gender">Gender</label>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="gender"
                        type="radio"
                        value="male"
                        v-model="personalData.gender"
                        checked
                        required
                      >
                      <span>Male</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="gender"
                        type="radio"
                        value="female"
                        v-model="personalData.gender"
                      >
                      <span>Female</span>
                    </label>
                  </p>
                </div>
              </div>
              <div class="col s6">
                <div class="field age">
                  <label for="age">Age</label>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="age"
                        type="radio"
                        value="17-22"
                        v-model="personalData.age"
                        checked
                        required
                      >
                      <span>17-22</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="age"
                        type="radio"
                        value="23-25"
                        v-model="personalData.age"
                      >
                      <span>23-25</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="age"
                        type="radio"
                        value="26+"
                        v-model="personalData.age"
                      >
                      <span>26+</span>
                    </label>
                  </p>
                </div>
              </div>
            </div>
            <div class="divider"></div>
          </div>
          <div class="section">
            <div class="row">
              <div class="col s6">
                <div class="field studies">
                  <label for="studies">Please select your field of studies.</label>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="studies"
                        type="radio"
                        value="Computer Science/Engineering"
                        v-model="personalData.study"
                        checked
                        required
                      >
                      <span>Computer Science/Engineering</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="studies"
                        type="radio"
                        value="Electronic Engineering"
                        v-model="personalData.study"
                      >
                      <span>Electronic Engineering</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="studies"
                        type="radio"
                        value="Other"
                        v-model="personalData.study"
                      >
                      <span>Other</span>
                    </label>
                  </p>
                </div>
              </div>
              <div class="col s6">
                <div class="field education">
                  <label for="education">Completed Education</label>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="education"
                        type="radio"
                        value="Bachelor of Science"
                        v-model="personalData.education"
                        checked
                        required
                      >
                      <span>Bachelor of Science</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="education"
                        type="radio"
                        value="Master of Science"
                        v-model="personalData.education"
                      >
                      <span>Master of Science</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="education"
                        type="radio"
                        value="Doctor of Philosophy"
                        v-model="personalData.education"
                      >
                      <span>Doctor of Philosophy</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="education"
                        type="radio"
                        value="Postdoctoral"
                        v-model="personalData.education"
                      >
                      <span>Postdoctoral</span>
                    </label>
                  </p>
                </div>
              </div>
            </div>
            <div class="divider"></div>
          </div>
          <div class="section">
            <div class="row">
              <div class="col s6">
                <div class="field experience">
                  <label for="experience">Previous Experience With Multi-Agent Systems (MAS)</label>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="experience"
                        type="radio"
                        value="I've learned MAS in the context of a course."
                        v-model="personalData.experience"
                        checked
                        required
                      >
                      <span>I've learned MAS in the context of a course.</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="experience"
                        type="radio"
                        value="I've used MAS in a professional context"
                        v-model="personalData.experience"
                      >
                      <span>I've used MAS in a professional context</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="experience"
                        type="radio"
                        value="I know what MAS is but never used it"
                        v-model="personalData.experience"
                      >
                      <span>I know what MAS is but never used it</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="with-gap"
                        name="experience"
                        type="radio"
                        value="I've never heard of it."
                        v-model="personalData.experience"
                      >
                      <span>I've never heard of it.</span>
                    </label>
                  </p>
                </div>
              </div>
              <div class="col s6">
                <div class="field occupation">
                  <label for="occupation">Current occupation</label>
                  <p>
                    <label>
                      <input
                        class="filled-in"
                        name="occupation"
                        type="checkbox"
                        value="true"
                        v-model="personalData.occupation.student"
                      >
                      <span>Student</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="filled-in"
                        name="occupation"
                        type="checkbox"
                        value="true"
                        v-model="personalData.occupation.researcher"
                      >
                      <span>Researcher</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        class="filled-in"
                        name="occupation"
                        type="checkbox"
                        value="true"
                        v-model="personalData.occupation.worker"
                      >
                      <span>Worker</span>
                    </label>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DEVELOPMENT TIMES -->
      <div class="card">
        <div class="development-times container">
          <h4 class="left-align indigo-text">
            <i class="material-icons">timer</i> Development Times
          </h4>
          <p>
            Please enter the time for each phase during the evaluation process. All fields must be in
            <b>minutes</b> and as an
            <b>integer</b>
          </p>
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s6">
                  <i class="material-icons prefix">sync_problem</i>
                  <input
                    id="icon_problem"
                    type="number"
                    class="validate"
                    min="1"
                    max="240"
                    v-model="developmentTimes.problemAnalysis"
                    v-on:keypress="isNumber($event)"
                    required
                  >
                  <label for="icon_problem">Problem Analysis</label>
                  <span class="helper-text">minutes</span>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">developer_board</i>
                  <input
                    id="icon_modelling"
                    type="number"
                    class="validate"
                    min="1"
                    max="240"
                    v-model="developmentTimes.modellingDesign"
                    v-on:keypress="isNumber($event)"
                    required
                  >
                  <label for="icon_modelling">Modelling - Design</label>
                  <span class="helper-text">minutes</span>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <i class="material-icons prefix">code</i>
                  <input
                    id="icon_implementation"
                    type="number"
                    class="validate"
                    min="1"
                    max="240"
                    v-model="developmentTimes.implementation"
                    v-on:keypress="isNumber($event)"
                    required
                  >
                  <label for="icon_implementation">Implemantaion</label>
                  <span class="helper-text">minutes</span>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">bug_report</i>
                  <input
                    id="icon_error"
                    type="number"
                    class="validate"
                    min="1"
                    max="240"
                    v-model="developmentTimes.errorTesting"
                    v-on:keypress="isNumber($event)"
                    required
                  >
                  <label for="icon_error">Error detection - Testing</label>
                  <span class="helper-text">minutes</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- UPLOADS -->
      <div class="card">
        <div class="uploads container">
          <h4 class="left-align indigo-text">
            <i class="material-icons">cloud_upload</i> Project Files Uploads
          </h4>
          <p>
            Please upload the project files you developed during the evaluation process in this section. In this process you must have 3 types of folders.
            These files and their descriptions are listed below.
          </p>
          <ol>
            <li>
              <b>Modelling Artifacts:</b> The model project folder that you developed using the agent modelling tool.
            </li>
            <li>
              <b>Generated Project:</b> Project folder generated by agent modeling tool.
            </li>
            <li>
              <b>Full Project:</b> Project folder that also including your personal codes.
            </li>
          </ol>

          <p>
            Please note that upload the folders in
            <b>.zip format</b>.
          </p>

          <div class="file-field input-field">
            <div class="btn">
              <span>Modelling Artifacts</span>
              <input
                type="file"
                accept="application/zip, application/rar"
                id="modelling-artifacts"
                @change="detectMA($event.target.files)"
              >
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
              <span class="helper-text">
                Please rename your zip file to
                <i>
                  <b>ModellingProject.zip</b>
                </i>
              </span>
            </div>
          </div>
          <div class="file-field input-field">
            <div class="btn">
              <span>Generated Project</span>
              <input
                type="file"
                accept="application/zip, application/rar"
                id="generated-project"
                @change="detectGP($event.target.files)"
              >
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
              <span class="helper-text">
                Please rename your zip file to
                <i>
                  <b>GeneratedProject.zip</b>
                </i>
              </span>
            </div>
          </div>
          <div class="file-field input-field">
            <div class="btn">
              <span>Full Project</span>
              <input
                type="file"
                accept="application/zip, application/rar"
                id="full-project"
                @change="detectFP($event.target.files)"
              >
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
              <span class="helper-text">
                Please rename your zip file to
                <i>
                  <b>FullProject.zip</b>
                </i>
              </span>
            </div>
          </div>
          <br>
        </div>
      </div>

      <!-- SURVEY -->
      <div class="card">
        <div class="survey container">
          <h4 class="left-align indigo-text">
            <i class="material-icons">assessment</i> Quality Survey
          </h4>
        </div>
      </div>

      <div class="field center-align">
        <p
          v-if="this.validation.consentValidation"
          class="red-text"
        >{{validation.consentValidation}}</p>
        <p v-if="this.validation.emailValidation" class="red-text">{{validation.emailValidation}}</p>
        <button class="btn blue">Submit</button>
      </div>
    </form>

    <!-- Modal Structure -->
    <div id="modal" class="modal">
      <div class="modal-content">
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
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
      validation: {
        emailValidation: null,
        consentValidation: null
      },
      language: null,
      personalData: {
        consent: false,
        email: "",
        gender: "",
        age: "",
        study: "",
        education: "",
        experience: "",
        occupation: {
          student: false,
          researcher: false,
          worker: false
        },

        modellingArtifact: File,
        generatedProject: File,
        fullProject: File
      },
      developmentTimes: {
        problemAnaylysis: "",
        modellingDesign: "",
        implementation: "",
        errorTesting: ""
      }
    };
  },
  methods: {
    AddPersonalDataToFirestore() {
      //PERSONAL DATA
      db.collection("personal_datas")
        .add({
          evaluate_language: this.language.id,
          consent: this.personalData.consent,
          email: this.personalData.email,
          gender: this.personalData.gender,
          age: this.personalData.age,
          study: this.personalData.study,
          education: this.personalData.education,
          experience: this.personalData.experience,
          occupation: {
            student: this.personalData.occupation.student,
            researcher: this.personalData.occupation.researcher,
            worker: this.personalData.occupation.worker
          }
        })
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(email + "'s personal data successfully added firestore");
        })
        .catch(err => {
          console.log(err);
        });
    },

    AddCaseStudyFilesToStorage() {
      storage
        .ref(
          this.language.id +
            "/" +
            this.personalData.email +
            "/MA/" +
            this.modellingArtifact.name
        )
        .put(this.modellingArtifact)
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(
            email + "'s modelling project files successfully added storage"
          );
        })
        .catch(err => {
          console.log(err);
        });
      storage
        .ref(
          this.language.id +
            "/" +
            this.personalData.email +
            "/GP/" +
            this.generatedProject.name
        )
        .put(this.generatedProject)
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(
            email + "'s generated project files successfully added storage"
          );
        })
        .catch(err => {
          console.log(err);
        });
      storage
        .ref(
          this.language.id +
            "/" +
            this.personalData.email +
            "/FP/" +
            this.fullProject.name
        )
        .put(this.fullProject)
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(
            email + "'s full project files successfully added storage"
          );
        })
        .catch(err => {
          console.log(err);
        });
    },

    AddEvaluation() {
      if (this.personalData.email && this.personalData.consent) {
        this.AddCaseStudyFilesToStorage();
        this.AddPersonalDataToFirestore();
        //this.$(".modal").openModal()
        this.$router.push({ name: "Index" });
      } else {
        if (!this.personalData.email)
          this.validation.emailValidation = "You must enter a valid email";
        if (!this.personalData.consent)
          this.validation.consentValidation =
            "You must accept letter of consent for submit";
      }
    },

    detectMA(fileList) {
      this.modellingArtifact = fileList[0];
    },
    detectGP(fileList) {
      this.generatedProject = fileList[0];
    },
    detectFP(fileList) {
      this.fullProject = fileList[0];
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  },
  created() {
    let ref = db.collection("languages").where("id", "==", this.id);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.language = doc.data();
        this.language.id = doc.id;
        //$('#modal1').modal({ show: false})
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
