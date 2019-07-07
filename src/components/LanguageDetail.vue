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
                        <a>{{data.url}}</a>
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
                  <div class="col s6">
                    <div class="con-select-example">
                      <vs-select class="selectExample" label="Case Study" v-model="caseStudySelect">
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
                      <vs-button color="primary" type="border">
                        <router-link
                          :to="{name: 'Evaluate', params: {id: language.id}} "
                        >Start Evaluation</router-link>
                      </vs-button>
                    </div>
                  </div>
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
                        <b>3.21 / 5</b>
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
      caseStudySelect: null,
      id: this.$route.params.id,
      language: null,
      faml: null,
      norms: null,
      caseStudiesOptions: [
        { text: "Garbage Collector", value: "Garbage Collector" },
        { text: "Hotel Reservation System", value: "Hotel Reservation System" }
      ],
      benchmarkingOptions: {
        labels: ["Supported", "Not Supported"]
      },
      generationOptions: {
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
          categories: [
            "Garbage Collector System",
            "Hotel Reservation System",
            "All Case Studies"
          ],
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

      modelChartOptions: {
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
            "Actor",
            "Action",
            "Percept",
            "Role",
            "Data",
            "Goal",
            "Scenario",
            "Agent",
            "Message",
            "Capability",
            "Plan"
          ],
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
      },

      radarSeries: [
        {
          name: "Average Point",
          data: [3.5, 3.13, 3.13, 3.14, 3.28, 3.06]
        }
      ],
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
            text: "Person"
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
    benchmarkingSeries() {
      return [
        this.language.famlComparison.averagePer,
        100 - this.language.famlComparison.averagePer
      ];
    },
    developmentSeries() {
      return [
        {
          name: this.language.caseStudies[0].name,
          data: [
            this.language.caseStudies[0].developmentTimes.times.problemAnalysis,
            this.language.caseStudies[0].developmentTimes.times.modelling,
            this.language.caseStudies[0].developmentTimes.times.implementation,
            this.language.caseStudies[0].developmentTimes.times.errorDetection
          ]
        },
        {
          name: this.language.caseStudies[1].name,
          data: [
            this.language.caseStudies[1].developmentTimes.times.problemAnalysis,
            this.language.caseStudies[1].developmentTimes.times.modelling,
            this.language.caseStudies[1].developmentTimes.times.implementation,
            this.language.caseStudies[1].developmentTimes.times.errorDetection
          ]
        },
        {
          name: "All Case Studies",
          data: [
            (this.language.caseStudies[0].developmentTimes.times
              .problemAnalysis +
              this.language.caseStudies[1].developmentTimes.times
                .problemAnalysis) /
              2,
            (this.language.caseStudies[0].developmentTimes.times.modelling +
              this.language.caseStudies[1].developmentTimes.times.modelling) /
              2,
            (this.language.caseStudies[0].developmentTimes.times
              .implementation +
              this.language.caseStudies[1].developmentTimes.times
                .implementation) /
              2,
            (this.language.caseStudies[0].developmentTimes.times
              .errorDetection +
              this.language.caseStudies[1].developmentTimes.times
                .errorDetection) /
              2
          ]
        }
      ];
    },
    generationSeries() {
      const totalgenerated =
        this.language.caseStudies[0].caseStudyAnalysis.LoC.generated +
        this.language.caseStudies[1].caseStudyAnalysis.LoC.generated;
      const totalhardCoded =
        this.language.caseStudies[0].caseStudyAnalysis.LoC.hardCoded +
        this.language.caseStudies[1].caseStudyAnalysis.LoC.hardCoded;
      return [
        {
          name: "Generated Code",
          data: [
            this.language.caseStudies[0].caseStudyAnalysis.LoC.generated,
            this.language.caseStudies[1].caseStudyAnalysis.LoC.generated,
            totalgenerated / 2
          ]
        },
        {
          name: "Hard Coded by Developer",
          data: [
            this.language.caseStudies[0].caseStudyAnalysis.LoC.hardCoded,
            this.language.caseStudies[1].caseStudyAnalysis.LoC.hardCoded,
            totalhardCoded / 2
          ]
        }
      ];
    },
    modelSeries() {
      return [
        {
          name: this.language.caseStudies[0].name,
          data: [
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[0],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[1],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[2],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[3],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[4],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[5],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[6],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[7],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[8],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[9],
            this.language.caseStudies[0].caseStudyAnalysis.modellingEntities[10]
          ]
        },
        {
          name: this.language.caseStudies[1].name,
          data: [
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[0],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[1],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[2],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[3],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[4],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[5],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[6],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[7],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[8],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[9],
            this.language.caseStudies[1].caseStudyAnalysis.modellingEntities[10]
          ]
        },
        {
          name: "All Case Studies",
          data: [
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[0] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[0],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[1] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[1],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[2] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[2],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[3] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[3],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[4] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[4],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[5] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[5],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[6] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[6],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[7] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[7],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[8] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[8],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[9] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[9],
            this.language.caseStudies[0].caseStudyAnalysis
              .modellingEntities[10] +
              this.language.caseStudies[1].caseStudyAnalysis
                .modellingEntities[10]
          ]
        }
      ];
    }
  },

  methods: {
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

      var data = [
        {
          name: "Hotel Reservation Project",
          data: this.language.caseStudies[1].surveyResults[normValue]
        },
        {
          name: "Garbage Collector Project",
          data: this.language.caseStudies[0].surveyResults[normValue]
        }
      ];

      return data;
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
