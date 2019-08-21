
<template>
  <div class="add language container">
    <h3 class="center-align indigo-text">Add New Agent DSML</h3>
    <form @submit.prevent="MetamodelMatch">
      <!-- LANGUAGE DATA -->
      <div class="card">
        <div class="match-data container">
          <h4 class="left-align indigo-text">
            <i class="material-icons">fingerprint</i> Metamodel Concept Matching
          </h4>
          <div class="section">
            <div class="input-field col s12">
              <div>
                <div slot="header">
                  <h5>Design Time Concepts Matching</h5>
                </div>
                <vs-table hoverFlat="false" :data="faml.designtimeconcepts">
                  <template slot="thead">
                    <vs-th>FAML Concept</vs-th>
                    <vs-th>Definition</vs-th>
                    <vs-th>{{language.name}} Concept</vs-th>
                  </template>
                  <template>
                    <vs-tr :key="indextr" v-for="(tr, indextr) in faml.designtimeconcepts">
                      <vs-td
                        style="font-size:15px;"
                        :data="faml.designtimeconcepts[indextr].concept"
                      >{{faml.designtimeconcepts[indextr].concept}}</vs-td>
                      <vs-td
                        style="font-size:15px;"
                        :data="language.famlComparison.designTimeConcepts[indextr]"
                      >{{faml.designtimeconcepts[indextr].definition}}</vs-td>
                      <vs-td
                        style="font-size:15px;"
                        :data="language.famlComparison.designTimeConcepts[indextr]"
                      >
                        <vs-select
                          placeholder="Select"
                          multiple
                          autocomplete
                          class="selectExample"
                          v-model="designTimeConceptArray[indextr]"
                        >
                          <vs-select-item
                            :key="index"
                            :value="item.entity"
                            :text="item.entity"
                            v-for="(item,index) in entitiesOptions"
                          />
                        </vs-select>
                      </vs-td>
                    </vs-tr>
                  </template>
                  <br />
                  <br />
                  <br />
                </vs-table>
              </div>
            </div>
            <div class="divider"></div>
            <div class="input-field col s12">
              <div>
                <div slot="header">
                  <h5>Runtime Concepts Matching</h5>
                </div>
                <vs-table hoverFlat="false" :data="faml.runtimeConcepts">
                  <template slot="thead">
                    <vs-th>FAML Concept</vs-th>
                    <vs-th>Definition</vs-th>
                    <vs-th>{{language.name}} Concept</vs-th>
                  </template>
                  <template>
                    <vs-tr :key="indextr" v-for="(tr, indextr) in faml.runtimeConcepts">
                      <vs-td
                        style="font-size:15px;"
                        :data="faml.runtimeConcepts[indextr].concept"
                      >{{faml.runtimeConcepts[indextr].concept}}</vs-td>
                      <vs-td
                        style="font-size:15px;"
                        :data="language.famlComparison.runTimeConcepts[indextr]"
                      >{{faml.runtimeConcepts[indextr].definition}}</vs-td>
                      <vs-td
                        style="font-size:15px;"
                        :data="language.famlComparison.runTimeConcepts[indextr]"
                      >
                        <vs-select
                          placeholder="Select"
                          multiple
                          autocomplete
                          class="selectExample"
                          v-model="runTimeConceptArray[indextr]"
                        >
                          <vs-select-item
                            :key="index"
                            :value="item.entity"
                            :text="item.entity"
                            v-for="(item,index) in entitiesOptions"
                          />
                        </vs-select>
                      </vs-td>
                    </vs-tr>
                  </template>
                  <br />
                  <br />
                  <br />
                </vs-table>
              </div>
            </div>
            <div class="divider"></div>
          </div>
        </div>
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
  name: "MetamodelMatch",
  components: {},
  data() {
    return {
      faml: null,
      designTimeConceptArray: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      runTimeConceptArray: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      language: null
    };
  },
  computed: {
    entitiesOptions() {
      var entities = [];
      for (let index = 0; index < this.language.entites.length; index++) {
        entities[index] = {
          entity: this.language.entites[index]
        };
      }
      return entities;
    }
  },
  created() {
    let ref = db
      .collection("languages")
      .where("id", "==", this.$route.params.id);
    let famlRef = db.collection("languages").where("is_active", "==", false);
    famlRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.faml = doc.data();
        this.faml.id = doc.id;
      });
    });
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.language = doc.data();
        this.language.id = doc.id;
      });
    });
  },
  methods: {
    AddMetamodelMatchToFirestore() {
      var dtConcepts = [];
      var dtLength = 0;
      var rtConcepts = [];
      var rtLength = 0;
      var stringElement = "";
      for (let index = 0; index < this.designTimeConceptArray.length; index++) {
        if (this.designTimeConceptArray[index].length == 0) {
          dtConcepts[index] = "N/A";
        } else {
          for (let k = 0; k < this.designTimeConceptArray[index].length; k++) {
            if (index == 0)
              stringElement += this.designTimeConceptArray[index][k];
            else stringElement += "," + this.designTimeConceptArray[index][k];
          }
          dtConcepts[index] = stringElement;
          dtLength++;
          stringElement = "";
        }
      }

      stringElement = "";
      for (let index = 0; index < this.runTimeConceptArray.length; index++) {
        if (this.runTimeConceptArray[index].length == 0) {
          rtConcepts[index] = "N/A";
        } else {
          for (let k = 0; k < this.runTimeConceptArray[index].length; k++) {
            if (index == 0) stringElement += this.runTimeConceptArray[index][k];
            else stringElement += "," + this.runTimeConceptArray[index][k];
          }
          rtConcepts[index] = stringElement;
          rtLength++;
          stringElement = "";
        }
      }

      var designTimePercentage =
        (100 * dtLength) /
        this.faml.designtimeconcepts.length;
      var runTimePercentage =
        (100 * rtLength) /
        this.faml.runtimeConcepts.length;
      //languages

      console.log((((designTimePercentage + runTimePercentage) / 2).toFixed(2)).constructor);
      console.log((designTimePercentage.toFixed(2)).constructor);
      console.log((runTimePercentage.toFixed(2)).constructor);
      console.log(dtConcepts);
      console.log(rtConcepts);

      db.collection("languages")
        .where("name", "==", this.language.name)
        .get()
        .then(docs => {
          docs.forEach(doc => {
            db.collection("languages")
              .doc(doc.id)
              .update({
                famlComparison: {
                  averagePer: parseFloat((((designTimePercentage + runTimePercentage) / 2).toFixed(2))),
                  designTimePer: parseFloat((designTimePercentage.toFixed(2))),
                  runTimePer: parseFloat((runTimePercentage.toFixed(2))),
                  designTimeConcepts: dtConcepts,
                  runTimeConcepts: rtConcepts
                }
              });
          });
        })
        .then(() => {
          //this.$router.push({ name: "Index" });
          console.log(this.language.name + " FAML metamodel matching added.");
        })
        .catch(err => {
          console.log(err);
        });
    },
    MetamodelMatch() {
      this.AddMetamodelMatchToFirestore();
      this.$router.push({ name: "Index" });
    }
  }
};
</script>

<style scoped>
