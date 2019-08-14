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
                    v-model="developmentData.developmentTimes.problemAnalysis"
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
                    v-model="developmentData.developmentTimes.modellingDesign"
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
                    v-model="developmentData.developmentTimes.implementation"
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
                    v-model="developmentData.developmentTimes.errorTesting"
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
            <i class="material-icons">assessment</i>
            Quality Survey
          </h4>
          <p>
            Please evaluate Agent DSML in terms of the following norms. You can give a score between 1 and 5 to the norms. 
          </p>
          <ol>
            <li>
                Very Bad
            </li>
            <li>
                Bad
            </li>
            <li>
                Average
            </li>
            <li>
                Good
            </li>
            <li>
                Very Good
            </li>
          </ol>
          <div class="section">
            <div class="row" v-for="norm in getNorms" :key="norm.id">
              <div class="col s12">
                <div class="field norm">
                  <b>{{ norm.id }}-</b>
                  {{ norm.norm }}
                </div>
                <p style="text-align: left;">
                  <label v-for="choice in getChoices" :key="choice.id">
                    <input
                      class="with-gap"
                      v-bind:name="norm.id"
                      type="radio"
                      v-bind:value="choice.id"
                      v-model="results[norm.id]"
                      multiple
                      required
                    >
                    <span style="padding-left: 23px; margin-left: 20px">{{ choice.id }}</span>
                  </label>
                </p>
                <div class="divider"></div>
              </div>
            </div>
          </div>
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
  computed: {
    getChoices() {
      return [
        {
          id: 1,
          mood: "Very Bad"
        },
        {
          id: 2,
          mood: "Bad"
        },
        {
          id: 3,
          mood: "Average"
        },
        {
          id: 4,
          mood: "Good"
        },
        {
          id: 5,
          mood: "Very Good"
        }
      ];
    },
    getNorms() {
      return [
        {
          id: 1,
          norm:
            "All concepts and scenarios of the domain can be expressed in the Agent DSML (completeness)"
        },
        {
          id: 2,
          norm:
            "Agent DSML is appropriate for the specific applications of the domain (e.g. to express an algorithm) (appropriateness)"
        },
        {
          id: 3,
          norm:
            "The required amount of effort for understanding the language is small (comprehensibility)"
        },
        {
          id: 4,
          norm:
            "The concepts and symbols of the language are easy to learn and remember (learnability)"
        },
        {
          id: 5,
          norm:
            "Language has capability to help users achieve their tasks in a minimum number of steps"
        },
        {
          id: 6,
          norm:
            "Users can recognize whether the Agent DSML is appropriate for their needs (likeability,userperception)"
        },
        {
          id: 7,
          norm:
            "Agent DSML has attributes that make it easy to operate and control the language (operability)"
        },
        {
          id: 8,
          norm: "Agent DSML has symbols that are good-looking (attractiveness)"
        },
        {
          id: 9,
          norm:
            "The language provides mechanisms for compactness of the representation of the program. (compactness)"
        },
        {
          id: 10,
          norm:
            "Agent DSML protects users against making errors. The DSL avoids the user to make mistakes. (model checking)"
        },
        {
          id: 11,
          norm:
            "Agent DSML includes right elements and correct relations between them (Agent DSML prevents the unexpected interactions between its elements) (correctness)"
        },
        {
          id: 12,
          norm: "A problem solving strategy can be mapped into a program easily"
        },
        {
          id: 13,
          norm:
            "The Agent DSML that provides one and only one good way to express every concept of interest (unique)"
        },
        {
          id: 14,
          norm:
            "Each Agent DSML construct is used to represent exactly one distinct concept in the domain (orthogonal)"
        },
        {
          id: 15,
          norm:
            "The language constructs correspond to important domain concepts. Agent DSML does not include domain concepts that are not important."
        },
        {
          id: 16,
          norm: "Agent DSML does not contain conflicting elements."
        },
        {
          id: 17,
          norm:
            "Agent DSML is at the right abstraction level such that it is not more complex or detailed than necessary"
        },
        {
          id: 18,
          norm:
            "Using Agent DSML to develop models fits in the development process, since it is used as part of a development process with phases and roles."
        },
        {
          id: 19,
          norm:
            "Agent DSML is compatible with the domain. Agent DMSL has capability to operate with other elements of the domain with no modification required to perform a specific application in the domain."
        },
        {
          id: 20,
          norm: "Agent DMSL make MAS development easier."
        },
        {
          id: 21,
          norm:
            "Agent DSML is appropriate for BDI (Belief-Desire-Intention) agent development."
        },
        {
          id: 22,
          norm: "IDE of Agent DSML is easy to use."
        },
        {
          id: 23,
          norm:
            "Agent DSML is powerful enough to model the general MAS structure."
        },
        {
          id: 24,
          norm:
            "Agent DSML handles any encountered difficulties while using it."
        }
      ];
    }
  },
  name: "Evaluate",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      caseStudy: this.$route.params.caseStudy,
      results: [],
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
        }
      },
      developmentData: {
        developmentTimes: {
          problemAnalysis: "",
          modellingDesign: "",
          implementation: "",
          errorTesting: ""
        },
        zips: {
          modellingArtifact: File,
          generatedProject: File,
          fullProject: File
        }
      },
      modellingURL: "OK",
      generatedURL: "OK",
      fullURL: "OK",
    };
  },
  methods: {
    AddPersonalDataToFirestore() {
      console.log(this.results.toString()),
      //PERSONAL DATA
      db.collection("personal_datas")
        .add({
          created_at: Date.now(),
          evaluate_language: this.language.id,
          caseStudy: this.caseStudy,
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
            worker: this.personalData.occupation.worker,
          },
          results: this.results.toString(),
        })
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(
            this.personalData.email +
              "'s personal data successfully added firestore"
          );
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
            this.developmentData.zips.modellingArtifact.name
        )
        .put(this.developmentData.zips.modellingArtifact)
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(
            this.personalData.email +
              "'s modelling project files successfully added storage"
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
            this.developmentData.zips.generatedProject.name
        )
        .put(this.developmentData.zips.generatedProject)
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(
            this.personalData.email +
              "'s generated project files successfully added storage"
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
            this.developmentData.zips.fullProject.name
        )
        .put(this.developmentData.zips.fullProject)
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(
            this.personalData.email +
              "'s full project files successfully added storage"
          );
        })
        .catch(err => {
          console.log(err);
        });
    },

    AddDevelopmentDataToFirestore() {
      //DEVELOPMENT DATA
      db.collection("development_datas")
        .add({
          evaluate_language: this.language.id,
          caseStudy: this.caseStudy,
          email: this.personalData.email,
          developmentTimes: {
            problemAnalysis: parseInt(
              this.developmentData.developmentTimes.problemAnalysis,
              10
            ),
            modellingDesign: parseInt(
              this.developmentData.developmentTimes.modellingDesign,
              10
            ),
            implementation: parseInt(
              this.developmentData.developmentTimes.implementation,
              10
            ),
            errorTesting: parseInt(
              this.developmentData.developmentTimes.errorTesting,
              10
            )
          },
          zips: {
            modellingArtifact: this.developmentData.zips.modellingArtifact.name,
            generatedProject: this.developmentData.zips.generatedProject.name,
            fullProject: this.developmentData.zips.fullProject.name
          }
        })
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(
            this.personalData.email +
              "'s development data successfully added firestore"
          );
        })
        .catch(err => {
          console.log(err);
        });
    },

    AddEvaluation() {
      if (this.personalData.email && this.personalData.consent) {
        this.AddPersonalDataToFirestore();
        this.AddDevelopmentDataToFirestore();
        this.AddCaseStudyFilesToStorage();
        //this.$(".modal").openModal()
        this.GeneratePDF();
        this.$router.push({ name: "Index" });
      } else {
        if (!this.personalData.email)
          this.validation.emailValidation = "You must enter a valid email";
        if (!this.personalData.consent)
          this.validation.consentValidation =
            "You must accept letter of consent for submit";
      }
    },

    SetDownloadUrls() {
      console.log("SerURLS");
          storage
        .ref(
          this.language.id +
            "/" +
            this.personalData.email +
            "/MA/" +
            this.developmentData.zips.modellingArtifact.name
        )
        .getDownloadURL()
        .then(function(downloadURL) {
          this.modellingURL = downloadURL;
          console.log(downloadURL);
        });

      storage
        .ref(
          this.language.id +
            "/" +
            this.personalData.email +
            "/GP/" +
            this.developmentData.zips.generatedProject.name
        )
        .getDownloadURL()
        .then(function(downloadURL) {
          this.generatedURL = downloadURL;
          console.log(downloadURL);
        });

      storage
        .ref(
          this.language.id +
            "/" +
            this.personalData.email +
            "/FP/" +
            this.developmentData.zips.fullProject.name
        )
        .getDownloadURL()
        .then(function(downloadURL) {
          this.fullURL = downloadURL;
          console.log(downloadURL);
        });
    },

    GeneratePDF() {
      // Don't forget, that there are CORS-Restrictions. So if you want to run it without a Server in your Browser you need to transform the image to a dataURL
      // Use http://dataurl.net/#dataurlmaker
      console.log("GeneratePDF");
      var doc = new jsPDF();
      doc.setFontSize(20);
      doc.setFontStyle("bold");
      doc.text(20, 20, "Evaluation Form - " + this.language.name);
      doc.setFontSize(16);
      doc.text(20, 30, "Personal Data");
      doc.setFontStyle("normal");
      doc.setFontSize(12);
      doc.text(20, 38, "E-mail : " + this.personalData.email);
      doc.text(20, 43, "Gender : " + this.personalData.gender);
      doc.text(20, 48, "Age : " + this.personalData.age);
      doc.text(20, 53, "Completed Education : " + this.personalData.education);
      doc.text(
        20,
        58,
        "Previous Experience With MAS : " + this.personalData.experience
      );
      var student = "";
      var researcher = "";
      var worker = "";
      if (this.personalData.occupation.student) {
        student = "Student, ";
      }
      if (this.personalData.occupation.researcher) {
        researcher = "Researcher, ";
      }
      if (this.personalData.occupation.worker) {
        worker = "Worker, ";
      }
      doc.text(20, 63, "Current occupation : " + student + researcher + worker);
      doc.setFontSize(16);
      doc.setFontStyle("bold");
      doc.text(20, 73, "Development Times");
      doc.setFontStyle("normal");
      doc.setFontSize(12);
      doc.text(
        20,
        81,
        "Problem Analysis : " +
          this.developmentData.developmentTimes.problemAnalysis +
          " min"
      );
      doc.text(
        20,
        86,
        "Modelling-Design : " +
          this.developmentData.developmentTimes.modellingDesign +
          " min"
      );
      doc.text(
        20,
        91,
        "Implementation : " +
          this.developmentData.developmentTimes.implementation +
          " min"
      );
      doc.text(
        20,
        96,
        "Error Detection/ Testing : " +
          this.developmentData.developmentTimes.errorTesting +
          " min"
      );
      doc.setFontSize(16);
      doc.setFontStyle("bold");
      doc.text(20, 106, "Project Files Uploads");
      doc.setFontStyle("normal");
      doc.setFontSize(12);
      doc.text(20, 114, "Modelling Artifacts :");
      doc.text(20, 119, this.modellingURL);
      doc.text(20, 124, "Generated Project :");
      doc.text(20, 129, this.generatedURL);
      doc.text(20, 134, "Full Project :");
      doc.text(20, 139, this.fullURL);
      doc.setFontSize(16);
      doc.setFontStyle("bold");
      doc.text(20, 149, "Quality Survey");
      doc.setFontStyle("normal");
      doc.setFontSize(12);
      doc.text(
        20,
        157,
        "Functional Suitability (1-2) : " +
          this.results[1] +
          " - " +
          this.results[2]
      );
      doc.text(
        20,
        162,
        "Usability (3-9) : " +
          this.results[3] +
          " - " +
          this.results[4] +
          " - " +
          this.results[5] +
          " - " +
          this.results[6] +
          " - " +
          this.results[7] +
          " - " +
          this.results[8] +
          " - " +
          this.results[9]
      );
      doc.text(
        20,
        167,
        "Reliability (10-11) : " + this.results[10] + " - " + this.results[11]
      );
      doc.text(
        20,
        172,
        "Expressiveness (12-17) : " +
          this.results[12] +
          " - " +
          this.results[13] +
          " - " +
          this.results[14] +
          " - " +
          this.results[15] +
          " - " +
          this.results[16] +
          " - " +
          this.results[17]
      );
      doc.text(
        20,
        177,
        "Compatibility (18-19) : " + this.results[18] + " - " + this.results[19]
      );
      doc.text(
        20,
        182,
        "MAS Development (20-24) : " +
          this.results[20] +
          " - " +
          this.results[21] +
          " - " +
          this.results[22] +
          " - " +
          this.results[23] +
          " - " +
          this.results[24]
      );

      doc.text(20, 190, "Timestamp : " + Date.now());
      doc.text(20, 195, "Agent DSML : " + this.language.name);
      doc.text(20, 200, "Case Study : ");

      doc.setFontSize(12);
      doc.text(
        30,
        220,
        "Thank you very much for your participation.The answers you provide are listed above. "
      );
      doc.text(
        20,
        225,
        "This is a project being developed. Therefore, as a precaution, please send email this document "
      );
      doc.text(20, 230, "to the following email addresses: ");
      doc.text(20, 240, "Assoc. Prof. Dr. Geylani Kardas : geylani@gmail.com");
      doc.text(20, 245, "Ömer Faruk Alaca : omerfarukalaca@gmail.com ");

      doc.setFontSize(9);
      doc.text(20, 260, Date());
      doc.text(
        20,
        265,
        "Ege University International Computer Graduate School "
      );

      doc.save(this.personalData.email + "-" + Date.now() + ".pdf");
    },
    detectMA(fileList) {
      this.developmentData.zips.modellingArtifact = fileList[0];
    },
    detectGP(fileList) {
      this.developmentData.zips.generatedProject = fileList[0];
    },
    detectFP(fileList) {
      this.developmentData.zips.fullProject = fileList[0];
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
