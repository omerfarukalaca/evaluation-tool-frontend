
<template>
  <div class="add language container">
    <h3 class="center-align indigo-text">Add New Agent DSML</h3>
    <form @submit.prevent="AddAgentDSML">
      <!-- LANGUAGE DATA -->
      <div class="card">
        <div class="language-data container">
          <h4 class="left-align indigo-text">
            <i class="material-icons">fingerprint</i> Agent DSML Data
          </h4>
          <div class="section">
            <div class="input-field col s12">
              <input id="name" type="text" name="name" v-model="language.name" required />
              <label for="name">Language Name</label>
            </div>
            <div class="input-field col s12">
              <input id="version" type="text" name="version" v-model="language.version" required />
              <label for="version">Version</label>
            </div>
            <div class="input-field col s12">
              <input id="owner" type="text" name="owner" v-model="language.owner" required />
              <label for="owner">Owner</label>
            </div>
            <div class="input-field col s12">
              <input id="url" type="text" name="url" v-model="language.url" required />
              <label for="url">URL</label>
            </div>
            <div class="divider"></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="uploads container">
          <h4 class="left-align indigo-text">
            <i class="material-icons">cloud_upload</i> Metamodel & Case Studies
          </h4>
          <div class="file-field input-field">
            <div class="btn">
              <span>Metamodel Files</span>
              <input
                type="file"
                accept="application/json"
                id="modelling-artifacts"
                @change="detectMetamodel($event.target.files)"
              />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
              <span class="helper-text">
                Please upload metamodel in JSON format
              </span>
            </div>
          </div>
          <div class="form-group" v-for="(input,k) in inputs" :key="k">
            <div class="input-field col s12">
              <input id="csName" type="text" class="form-control" v-model="input.name" />
              <label for="csName">Case Study Name</label>
            </div>
            <div class="file-field input-field">
              <div class="btn">
                <span>Case Study File</span>
                <input
                  type="file"
                  accept="application/pdf"
                  id="caseStudy-file"
                  @change="detectCaseStudy($event.target.files, k)"
                />
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
            <span>
              <i
                class="btn"
                @click="remove(k)"
                v-show="k || ( !k && inputs.length > 1)"
              >Remove Case Study</i>
              <i class="btn" @click="add(k)" v-show="k == inputs.length-1">Add Case Study</i>
            </span>
          </div>
        </div>
        <br />
        <br />
      </div>
      <div class="field center-align">
        <button class="btn blue">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from "@/firebase/init";
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default {
  name: "AddLanguage",
  components: {},
  data() {
    return {
      language: {
        name: "",
        owner: "",
        url: "",
        version: "",
        metamodelFileName: "",
        entites: ["N/A"]
      },
      languageUploads: {
        metamodel: File
      },
      inputs: [
        {
          name: "",
          file: File
        }
      ]
    };
  },
  methods: {
    add(index) {
      this.inputs.push({ name: "" });
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    AddAgentDSMLDataToFirestore() {
      var caseStudies = [];
      for (let index = 0; index < this.inputs.length; index++) {
        caseStudies[index] = {
          name: this.inputs[index].name,
          document: "",
          developmentTimes: {
            userCount: 0,
            times: {
              errorDetection: 0,
              implementation: 0,
              modelling: 0,
              problemAnalysis: 0
            }
          },
          withoutDevelopmentTimes: {
            userCount: 0,
            times: {
              errorDetection: 0,
              implementation: 0,
              modelling: 0,
              problemAnalysis: 0
            }
          },
          caseStudyAnalysis: {
            LoC: {
              generated: 0,
              hardCoded: 0
            },
            modellingEntities: []
          },
          surveyResults: {
            Compatibility: [0, 0, 0, 0, 0],
            Expressiveness: [0, 0, 0, 0, 0],
            Functional: [0, 0, 0, 0, 0],
            MAS: [0, 0, 0, 0, 0],
            Reliability: [0, 0, 0, 0, 0],
            Usability: [0, 0, 0, 0, 0],
            n1: [0, 0, 0, 0, 0],
            n2: [0, 0, 0, 0, 0],
            n3: [0, 0, 0, 0, 0],
            n4: [0, 0, 0, 0, 0],
            n5: [0, 0, 0, 0, 0],
            n6: [0, 0, 0, 0, 0],
            n7: [0, 0, 0, 0, 0],
            n8: [0, 0, 0, 0, 0],
            n9: [0, 0, 0, 0, 0],
            n10: [0, 0, 0, 0, 0],
            n11: [0, 0, 0, 0, 0],
            n12: [0, 0, 0, 0, 0],
            n13: [0, 0, 0, 0, 0],
            n14: [0, 0, 0, 0, 0],
            n15: [0, 0, 0, 0, 0],
            n16: [0, 0, 0, 0, 0],
            n17: [0, 0, 0, 0, 0],
            n18: [0, 0, 0, 0, 0],
            n19: [0, 0, 0, 0, 0],
            n20: [0, 0, 0, 0, 0],
            n21: [0, 0, 0, 0, 0],
            n22: [0, 0, 0, 0, 0],
            n23: [0, 0, 0, 0, 0],
            n24: [0, 0, 0, 0, 0]
          }
        };
      }

      var famlComparison = {
        averagePer: 0,
        designTimePer: 0,
        runTimePer: 0,
        designTimeConcepts: [
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A"
        ],
        runTimeConcepts: [
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A",
          "N/A"
        ]
      };

      //languages
      db.collection("languages")
        .add({
          created_at: Date.now(),
          name: this.language.name,
          owner: this.language.owner,
          metamodelFileName: this.language.metamodelFileName,
          url: this.language.url,
          version: this.language.version,
          surveyAverageScores: [0, 0, 0, 0, 0, 0, 0],
          is_active: true,
          caseStudies: caseStudies,
          entites: [],
          famlComparison:famlComparison
        })
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(this.language.name + " Agent DSML added.");
        })
        .catch(err => {
          console.log(err);
        });
    },
    detectMetamodel(fileList) {
      this.language.metamodelFileName = fileList[0].name;
      this.languageUploads.metamodel = fileList[0];
    },
    detectCaseStudy(fileList, index) {
      this.inputs[index].file = fileList[0];
    },
    AddCaseStudyFilesToStorage() {
      storage
        .ref(
          this.language.name +
            "/" +
            "/metamodel/" +
            this.languageUploads.metamodel.name
        )
        .put(this.languageUploads.metamodel)
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(
            this.language.name +
              "'s metamodel successfully added storage" +
              this.inputs[0]
          );
        })
        .catch(err => {
          console.log(err);
        });

      for (let index = 0; index < this.inputs.length; index++) {
        storage
          .ref(this.language.name + "/caseStudies/" + this.inputs[index].name)
          .put(this.inputs[index].file)
          .then(() => {
            //this.$router.push({ name: "Index" });
            console.log(
              this.language.name + "'s caseStudy successfully added storage"
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    async AddAgentDSML() {
      this.AddAgentDSMLDataToFirestore();
      this.AddCaseStudyFilesToStorage();

      var newLanguageId;
      let ref = db
        .collection("languages")
        .where("name", "==", this.language.name);
      await ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          newLanguageId = doc.id;
        });
      });

      this.$router.push({
        name: "MetamodelMatch",
        params: { id: newLanguageId }
      });
    }
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