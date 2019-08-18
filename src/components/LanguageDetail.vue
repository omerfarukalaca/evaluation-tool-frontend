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
                <vs-table hoverFlat="false" :data="language">
                  <template slot-scope="{data}">
                    <vs-tr style="font-size:15px;">
                      <vs-td>
                        <b>Language Name :</b>
                      </vs-td>
                      <vs-td :data="data.name">{{data.name}}</vs-td>
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
                        <a :href="data.url">{{data.url}}</a>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>

                <div class="row">
                  <div class="field PerDescription">
                    <br />
                    <br />
                    If you want to make evaluation for {{language.name}} language. Please select a case study and press the evaluate button.
                    <br />
                    <br />
                  </div>
                  <form @submit.prevent="GoEvaluation">
                    <div class="col s6">
                      <div class="con-select-example">
                        <vs-select
                          class="selectExample"
                          label="Case Study"
                          v-model="caseStudySelect"
                        >
                          <vs-select-item
                            :key="index"
                            :value="item.value"
                            :text="item.text"
                            v-for="item,index in caseStudiesOptions"
                          />
                        </vs-select>
                      </div>
                    </div>
                    <div class="col s6">
                      <div style="text-align: left;">
                        <p
                          v-if="this.validation.caseStudy"
                          class="red-text"
                        >{{validation.caseStudy}}</p>
                        <button class="btn blue">Evaluate</button>
                      </div>
                    </div>
                  </form>
                </div>
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
              <div class="field totalPercentage">
                <apexchart
                  width="400"
                  type="donut"
                  :options="benchmarkingOptions"
                  :series="benchmarkingSeries"
                ></apexchart>
              </div>
            </div>
            <div class="col s6">
              <div class="field PerDescription">
                <br />
                <br />Comparison with FAML metamodel was performed in two different categories. These are in terms of
                <b>design time concepts</b> and
                <b>runtime concepts</b>. According to this evaluation,
                <b>%{{language.famlComparison.averagePer}}</b> matching was observed with the concepts in FAML metamodel.
                More detailed information on design time and runtime is given below.
              </div>
            </div>
          </div>
          <vs-collapse>
            <vs-collapse-item>
              <div slot="header">
                <h6>
                  Design Time Concepts Matching -
                  <b>%{{language.famlComparison.designTimePer}}</b>
                </h6>
              </div>
              <vs-table hoverFlat="false" :data="faml.designtimeconcepts">
                <template slot="thead">
                  <vs-th>FAML Concept</vs-th>
                  <vs-th>{{language.name}} Concept</vs-th>
                </template>
                <template>
                  <vs-tr
                    :state="language.famlComparison.designTimeConcepts[indextr] != 'N/A' ?'success':language.famlComparison.designTimeConcepts[indextr] == 'N/A'?'danger':null"
                    :key="indextr"
                    v-for="(tr, indextr) in faml.designtimeconcepts"
                  >
                    <vs-td
                      style="font-size:15px;"
                      :data="faml.designtimeconcepts[indextr].concept"
                    >{{faml.designtimeconcepts[indextr].concept}}</vs-td>
                    <vs-td
                      style="font-size:15px;"
                      :data="language.famlComparison.designTimeConcepts[indextr]"
                    >{{language.famlComparison.designTimeConcepts[indextr]}}</vs-td>
                    <template style="font-size:15px;" class="expand-user" slot="expand">
                      <div style="font-size:15px; text-align: left;">
                        <b>FAML Definition:</b>
                        {{faml.designtimeconcepts[indextr].definition}}
                      </div>
                    </template>
                  </vs-tr>
                </template>
                <br />
                <br />
                <br />
              </vs-table>
            </vs-collapse-item>
            <vs-collapse-item>
              <div slot="header">
                <h6>
                  Run Time Concepts Matching -
                  <b>%{{language.famlComparison.runTimePer}}</b>
                </h6>
              </div>
              <vs-table hoverFlat="false" :data="faml.runtimeConcepts">
                <template slot="thead">
                  <vs-th>FAML Concept</vs-th>
                  <vs-th>{{language.name}} Concept</vs-th>
                </template>
                <template>
                  <vs-tr
                    :state="language.famlComparison.runTimeConcepts[indextr] != 'N/A' ?'success':language.famlComparison.runTimeConcepts[indextr] == 'N/A'?'danger':null"
                    :key="indextr"
                    v-for="(tr, indextr) in faml.runtimeConcepts"
                  >
                    <vs-td
                      style="font-size:15px;"
                      :data="faml.runtimeConcepts[indextr].concept"
                    >{{faml.runtimeConcepts[indextr].concept}}</vs-td>
                    <vs-td
                      style="font-size:15px;"
                      :data="language.famlComparison.runTimeConcepts[indextr]"
                    >{{language.famlComparison.runTimeConcepts[indextr]}}</vs-td>
                    <template style="font-size:15px;" class="expand-user" slot="expand">
                      <div style="font-size:15px;">
                        <b>FAML Definition:</b>
                        {{faml.runtimeConcepts[indextr].definition}}
                      </div>
                    </template>
                  </vs-tr>
                  <br />
                  <br />
                  <br />
                  <br />
                </template>
              </vs-table>
            </vs-collapse-item>
          </vs-collapse>
          <div class="divider"></div>
        </div>
      </div>
    </div>

    <!-- DEVELOPMENT TIMES ANALYSIS -->
    <div class="card">
      <div class="identification container">
        <h4 v-if="language" class="left-align indigo-text">
          <i class="material-icons">fingerprint</i> Development Times Analysis
        </h4>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div class="field timeTableField">
                <apexchart
                  type="bar"
                  height="350"
                  :options="chartOptions"
                  :series="developmentSeries"
                />
              </div>
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
              <div class="field averageSurvey">
                <apexchart type="radar" height="400" :options="radarOptions" :series="radarSeries" />
              </div>
            </div>
            <div class="col s6">
              <br />
              <br />
              <br />
              <br />
              <br />
              <vs-row vs-justify="center">
                <vs-col type="flex" vs-justify="center" vs-align="center">
                  <vs-card>
                    <div slot="header">
                      <h5 style="text-align: center;">Average Point</h5>
                      <h4 style="text-align: center;">
                        <b>{{this.language.surveyAverageScores[0].toFixed(2)}} / 5</b>
                      </h4>
                    </div>
                  </vs-card>
                </vs-col>
              </vs-row>
            </div>
            <div class="col s12">
              <div class="field surveyDesc"></div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div class="field surveyField">
                <vs-tabs>
                  <vs-tab label="Functional Suitability">
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyChartOptions"
                        :series="surveySeries(100)"
                      />
                    </div>
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyQueChartOptions(100)"
                        :series="surveyQueChartSeries(100)"
                      />
                    </div>

                    <vs-collapse>
                      <div v-for="(item, index) in norms.functionalSuitability.norms" :key="index">
                        <vs-collapse-item>
                          <div slot="header">
                            <p>
                              <b>{{index+1}}</b>
                              . {{item}}
                            </p>
                          </div>
                          <apexchart
                            type="bar"
                            height="350"
                            :options="surveyChartOptions"
                            :series="surveySeries(index+1)"
                          />
                        </vs-collapse-item>
                      </div>
                    </vs-collapse>
                  </vs-tab>
                  <vs-tab label="Usability">
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyChartOptions"
                        :series="surveySeries(200)"
                      />
                    </div>
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyQueChartOptions(200)"
                        :series="surveyQueChartSeries(200)"
                      />
                    </div>

                    <vs-collapse>
                      <div v-for="(item, index) in norms.Usability.norms" :key="index">
                        <vs-collapse-item>
                          <div slot="header">
                            <p>
                              <b>{{index+3}}</b>
                              . {{item}}
                            </p>
                          </div>
                          <apexchart
                            type="bar"
                            height="350"
                            :options="surveyChartOptions"
                            :series="surveySeries(index+3)"
                          />
                        </vs-collapse-item>
                      </div>
                    </vs-collapse>
                  </vs-tab>
                  <vs-tab label="Reliability">
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyChartOptions"
                        :series="surveySeries(300)"
                      />
                    </div>
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyQueChartOptions(300)"
                        :series="surveyQueChartSeries(300)"
                      />
                    </div>

                    <vs-collapse>
                      <div v-for="(item, index) in norms.Reliability.norms" :key="index">
                        <vs-collapse-item>
                          <div slot="header">
                            <p>
                              <b>{{index+10}}</b>
                              . {{item}}
                            </p>
                          </div>
                          <apexchart
                            type="bar"
                            height="350"
                            :options="surveyChartOptions"
                            :series="surveySeries(index+10)"
                          />
                        </vs-collapse-item>
                      </div>
                    </vs-collapse>
                  </vs-tab>
                  <vs-tab label="Expressiveness">
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyChartOptions"
                        :series="surveySeries(400)"
                      />
                    </div>
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyQueChartOptions(400)"
                        :series="surveyQueChartSeries(400)"
                      />
                    </div>

                    <vs-collapse>
                      <div v-for="(item, index) in norms.Expressiveness.norms" :key="index">
                        <vs-collapse-item>
                          <div slot="header">
                            <p>
                              <b>{{index+12}}</b>
                              . {{item}}
                            </p>
                          </div>
                          <apexchart
                            type="bar"
                            height="350"
                            :options="surveyChartOptions"
                            :series="surveySeries(index+12)"
                          />
                        </vs-collapse-item>
                      </div>
                    </vs-collapse>
                  </vs-tab>
                  <vs-tab label="Compatibility">
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyChartOptions"
                        :series="surveySeries(500)"
                      />
                    </div>
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyQueChartOptions(500)"
                        :series="surveyQueChartSeries(500)"
                      />
                    </div>

                    <vs-collapse>
                      <div v-for="(item, index) in norms.Compatibility.norms" :key="index">
                        <vs-collapse-item>
                          <div slot="header">
                            <p>
                              <b>{{index+18}}</b>
                              . {{item}}
                            </p>
                          </div>
                          <apexchart
                            type="bar"
                            height="350"
                            :options="surveyChartOptions"
                            :series="surveySeries(index+18)"
                          />
                        </vs-collapse-item>
                      </div>
                    </vs-collapse>
                  </vs-tab>
                  <vs-tab label="MAS Development">
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyChartOptions"
                        :series="surveySeries(600)"
                      />
                    </div>
                    <div class="con-tab-ejemplo">
                      <apexchart
                        type="bar"
                        height="350"
                        :options="surveyQueChartOptions(600)"
                        :series="surveyQueChartSeries(600)"
                      />
                    </div>

                    <vs-collapse>
                      <div v-for="(item, index) in norms.MAS.norms" :key="index">
                        <vs-collapse-item>
                          <div slot="header">
                            <p>
                              <b>{{index+20}}</b>
                              . {{item}}
                            </p>
                          </div>
                          <apexchart
                            type="bar"
                            height="350"
                            :options="surveyChartOptions"
                            :series="surveySeries(index+20)"
                          />
                        </vs-collapse-item>
                      </div>
                    </vs-collapse>
                  </vs-tab>
                </vs-tabs>
              </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
    </div>

    <!-- CASE STUDY ANALYSIS -->
    <div class="card">
      <div class="caseStudy container">
        <h4 class="left-align indigo-text">
          <i class="material-icons">fingerprint</i> Case Study Analysis
        </h4>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div class="field timeTableField">
                <apexchart
                  type="bar"
                  height="600"
                  :options="modelChartOptions"
                  :series="modelSeries"
                />
              </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="section">
          <div class="row">
            <div class="col s12">
              <div class="field generated">
                <apexchart
                  type="bar"
                  height="350"
                  :options="generationOptions"
                  :series="generationSeries"
                />
              </div>
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
  designTimeindex: 25,

  data() {
    return {
      validation: {
        caseStudy: null
      },
      caseStudySelect: null,
      caseStudies: null,
      id: this.$route.params.id,
      language: null,
      faml: null,
      norms: null,
      benchmarkingOptions: {
        labels: ["Supported", "Not Supported"]
      },
      chartOptions: {
        chart: {
          stacked: false,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: true
          }
        },

        xaxis: {
          type: "string",
          categories: [
            "Problem Analysis",
            "Modelling & Design",
            "Implementation",
            "Error Testing"
          ],
          title: {
            text: "Minutes"
          }
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      radarOptions: {
        labels: [
          "Functional Suitability",
          "Usability",
          "Reliability",
          "Expressiveness",
          "Compatibility",
          "MAS Development"
        ]
      },
      surveyChartOptions: {
        chart: {
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        title: {
          text: "Point Perspective",
          align: "left"
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },

        xaxis: {
          type: "string",
          categories: ["1", "2", "3", "4", "5"],
          title: {
            text: "Points"
          }
        },
        yaxis: {
          title: {
            text: "Number of Answers"
          }
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      }
    };
  },
  created() {
    let ref = db.collection("languages").where("id", "==", this.id);
    let famlRef = db.collection("languages").where("is_active", "==", false);
    let normsRef = db
      .collection("quality_norms")
      .where("is_active", "==", true);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.language = doc.data();
        this.language.id = doc.id;
      });
    });
    famlRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.faml = doc.data();
        this.faml.id = doc.id;
      });
    });
    normsRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.norms = doc.data();
        this.norms.id = doc.id;
      });
    });
  },
  computed: {
    radarSeries() {
      return [
        {
          name: "Average Point",
          data: [
            this.language.surveyAverageScores[1].toFixed(2),
            this.language.surveyAverageScores[2].toFixed(2),
            this.language.surveyAverageScores[3].toFixed(2),
            this.language.surveyAverageScores[4].toFixed(2),
            this.language.surveyAverageScores[5].toFixed(2),
            this.language.surveyAverageScores[6].toFixed(2)
          ]
        }
      ];
    },
    caseStudiesOptions() {
      var caseStudies = [];
      for (let index = 0; index < this.language.caseStudies.length; index++) {
        caseStudies[index] = {
          text: this.language.caseStudies[index].name,
          value: this.language.caseStudies[index].name
        };
      }
      return caseStudies;
    },

    generationOptions() {
      var caseStudyTexts = [];

      for (let index = 0; index < this.language.caseStudies.length; index++) {
        caseStudyTexts[index] = [this.language.caseStudies[index].name];
      }

      caseStudyTexts[this.language.caseStudies.length] = "All Case Studies";

      return {
        chart: {
          stacked: true,
          stackType: "100%",
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: true
          }
        },

        xaxis: {
          type: "string",
          categories: caseStudyTexts,
          title: {
            text: "LoC"
          }
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      };
    },

    modelChartOptions() {
      var entityTexts = [];

      for (let index = 0; index < this.language.entites.length; index++) {
        entityTexts[index] = [this.language.entites[index]];
      }
      return {
        chart: {
          stacked: false,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: true
          }
        },

        xaxis: {
          type: "string",
          categories: entityTexts,
          title: {
            text: "Entity Count"
          }
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      };
    },

    benchmarkingSeries() {
      return [
        this.language.famlComparison.averagePer,
        100 - this.language.famlComparison.averagePer
      ];
    },
    developmentSeries() {
      var developmentSeries = [];
      var problemAnalysis = 0;
      var modelling = 0;
      var implementation = 0;
      var errorDetection = 0;

      for (let index = 0; index < this.language.caseStudies.length; index++) {
        (problemAnalysis += this.language.caseStudies[index].developmentTimes
          .times.problemAnalysis),
          (modelling += this.language.caseStudies[index].developmentTimes.times
            .modelling),
          (implementation += this.language.caseStudies[index].developmentTimes
            .times.implementation),
          (errorDetection += this.language.caseStudies[index].developmentTimes
            .times.errorDetection),
          (developmentSeries[index] = {
            name: this.language.caseStudies[index].name,
            data: [
              this.language.caseStudies[index].developmentTimes.times
                .problemAnalysis,
              this.language.caseStudies[index].developmentTimes.times.modelling,
              this.language.caseStudies[index].developmentTimes.times
                .implementation,
              this.language.caseStudies[index].developmentTimes.times
                .errorDetection
            ]
          });
      }

      var divider = 0;
      for (let k = 0; k < this.language.caseStudies.length; k++) {
        if (this.language.caseStudies[k].developmentTimes.userCount != 0)
          divider++;
      }

      developmentSeries[this.language.caseStudies.length] = {
        name: "All Case Studies",
        data: [
          (problemAnalysis / divider).toFixed(2),
          (modelling / divider).toFixed(2),
          (implementation / divider).toFixed(2),
          (errorDetection / divider).toFixed(2)
        ]
      };
      return developmentSeries;
    },
    generationSeries() {
      var generatedArray = [];
      var hardCodedArray = [];
      var totalgenerated = 0;
      var totalhardCoded = 0;
      for (let index = 0; index < this.language.caseStudies.length; index++) {
        totalgenerated += this.language.caseStudies[index].caseStudyAnalysis.LoC
          .generated;
        generatedArray[index] = this.language.caseStudies[
          index
        ].caseStudyAnalysis.LoC.generated;
        totalhardCoded += this.language.caseStudies[index].caseStudyAnalysis.LoC
          .hardCoded;
        hardCodedArray[index] = this.language.caseStudies[
          index
        ].caseStudyAnalysis.LoC.hardCoded;
      }

      generatedArray[this.language.caseStudies.length] =
        totalgenerated / this.language.caseStudies.length;
      hardCodedArray[this.language.caseStudies.length] =
        totalhardCoded / this.language.caseStudies.length;

      var returnData = [
        {
          name: "Generated Code",
          data: generatedArray
        },
        {
          name: "Hard Coded by Developer",
          data: hardCodedArray
        }
      ];

      return returnData;
    },
    modelSeries() {
      var returnData = [];
      var totalData = [];
      var tempData = [];

      for (let index = 0; index < this.language.entites.length; index++) {
        totalData[index] = 0;
        tempData[index] = 0;
      }

      for (let cs = 0; cs < this.language.caseStudies.length; cs++) {
        for (let entity = 0; entity < this.language.entites.length; entity++) {
          tempData[entity] = this.language.caseStudies[
            cs
          ].caseStudyAnalysis.modellingEntities[entity];
          totalData[entity] += tempData[entity];
        }
        returnData[cs] = {
          name: this.language.caseStudies[cs].name,
          data: tempData
        };
        console.log(tempData);
        for (let index = 0; index < this.language.entites.length; index++) {
          tempData[index] = 0;
        }
      }

      returnData[this.language.caseStudies.length] = {
        name: "All Case Studies",
        data: totalData
      };
      console.log(returnData);
      return returnData;
    }
  },

  methods: {
    GoEvaluation() {
      if (this.caseStudySelect != null) {
        this.$router.push({
          name: "Evaluate",
          params: { id: this.language.id, caseStudy: this.caseStudySelect }
        });
      } else {
        if (this.caseStudySelect == null)
          this.validation.caseStudy = "You must select a case study";
      }
    },
    surveySeries(index) {
      var normValue;
      if (index == 100) {
        normValue = "Functional";
      } else if (index == 200) {
        normValue = "Usability";
      } else if (index == 300) {
        normValue = "Reliability";
      } else if (index == 400) {
        normValue = "Expressiveness";
      } else if (index == 500) {
        normValue = "Compatibility";
      } else if (index == 600) {
        normValue = "MAS";
      } else {
        normValue = "n" + index;
      }

      var data = [];
      for (let index = 0; index < this.language.caseStudies.length; index++) {
        data[index] = {
          name: this.language.caseStudies[index].name,
          data: this.language.caseStudies[index].surveyResults[normValue]
        };
      }
      console.log(data.toString);
      return data;
    },

    surveyQueChartOptions(index) {
      var activeCategories = [];
      if (index == 100) {
        activeCategories = ["1", "2"];
      } else if (index == 200) {
        activeCategories = ["3", "4", "5", "6", "7", "8", "9"];
      } else if (index == 300) {
        activeCategories = ["10", "11"];
      } else if (index == 400) {
        activeCategories = ["12", "13", "14", "15", "16", "17"];
      } else if (index == 500) {
        activeCategories = ["18", "19"];
      } else if (index == 600) {
        activeCategories = ["20", "21", "22", "23", "24"];
      }

      return {
        chart: {
          stacked: false,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        title: {
          text: "Sub Characteristic Perspective",
          align: "left"
        },
        annotations: {
          yaxis: [
            {
              y: this.surveyQueChartAverage(index),
              borderColor: "#FF4560",
              label: {
                borderColor: "#FF4560",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#FF4560"
                },
                text:
                  "Average Points : " +
                  this.surveyQueChartAverage(index).toString()
              }
            }
          ]
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },

        xaxis: {
          type: "string",
          categories: activeCategories,
          title: {
            text: "Sub Characteristic"
          }
        },
        yaxis: {
          title: {
            text: "Average Score"
          }
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      };
    },

    surveyQueChartSeries(index) {
      var loop;
      var position;
      if (index == 100) {
        loop = 2;
        position = 1;
      } else if (index == 200) {
        loop = 7;
        position = 3;
      } else if (index == 300) {
        loop = 2;
        position = 10;
      } else if (index == 400) {
        loop = 6;
        position = 12;
      } else if (index == 500) {
        loop = 2;
        position = 18;
      } else if (index == 600) {
        loop = 5;
        position = 20;
      }

      var average = [];
      var totalAverage = [];
      for (let loopIndex = 0; loopIndex < loop; loopIndex++) {
        totalAverage[loopIndex] = 0;
      }

      var data = [];
      var temp = position;
      for (let k = 0; k < this.language.caseStudies.length; k++) {
        for (var i = 1; i <= loop; i++) {
          var normValue = "n" + temp;
          average[i - 1] = this.calculateAverageForNorm(k, normValue);
          totalAverage[i - 1] +=
            average[i - 1] / this.language.caseStudies.length;
          temp++;
        }
        temp = position;
        data[k] = {
          name: this.language.caseStudies[k].name,
          data: average
        };
        data[this.language.caseStudies.length] = {
          name: "All Case Studies",
          data: totalAverage
        };
        average = [];
      }
      return data;
    },

    calculateAverageForNorm(caseStudy, normValue) {
      console.log(this.language.caseStudies[caseStudy].surveyResults);
      var average = 0;
      var results = this.language.caseStudies[caseStudy].surveyResults[
        normValue
      ];

      if (results == null) return 0;
      console.log(
        this.language.caseStudies[caseStudy].name +
          "  " +
          results +
          "  " +
          normValue
      );
      for (var i = 0; i < 5; i++) {
        average = average + results[i] * (i + 1);
      }
      return (
        average /
        this.language.caseStudies[caseStudy].developmentTimes.userCount
      ).toFixed(2);
    },

    surveyQueChartAverage(index) {
      var averageScore;
      if (index == 100) {
        averageScore = this.language.surveyAverageScores[1];
      } else if (index == 200) {
        averageScore = this.language.surveyAverageScores[2];
      } else if (index == 300) {
        averageScore = this.language.surveyAverageScores[3];
      } else if (index == 400) {
        averageScore = this.language.surveyAverageScores[4];
      } else if (index == 500) {
        averageScore = this.language.surveyAverageScores[5];
      } else if (index == 600) {
        averageScore = this.language.surveyAverageScores[6];
      }
      return averageScore.toFixed(2);
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
