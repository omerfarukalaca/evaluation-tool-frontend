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
                <b>%{{(language.designTimePer+language.runTimePer)/2}}</b> matching was observed with the concepts in FAML metamodel.
                More detailed information on design time and runtime is given below.
              </div>
            </div>
          </div>
          <vs-collapse>
            <vs-collapse-item>
              <div slot="header">
                <h6>
                  Design Time Concepts Matching -
                  <b>%{{language.designTimePer}}</b>
                </h6>
              </div>
              <div>
                <p
                  style="font-size:15px;"
                >Açıklamalar dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmed</p>
                <br />
              </div>
              <vs-table hoverFlat="false" :data="faml.designtimeconcepts">
                <template slot="thead">
                  <vs-th>FAML Concept</vs-th>
                  <vs-th>{{language.name}} Concept</vs-th>
                </template>
                <template>
                  <vs-tr
                    :state="language.designTimeMatch[indextr] != '-' ?'success':language.designTimeMatch[indextr] == '-'?'danger':null"
                    :key="indextr"
                    v-for="(tr, indextr) in faml.designtimeconcepts"
                  >
                    <vs-td
                      style="font-size:15px;"
                      :data="faml.designtimeconcepts[indextr].concept"
                    >{{faml.designtimeconcepts[indextr].concept}}</vs-td>
                    <vs-td
                      style="font-size:15px;"
                      :data="language.designTimeMatch[indextr]"
                    >{{language.designTimeMatch[indextr]}}</vs-td>
                    <template style="font-size:15px;" class="expand-user" slot="expand">
                      <div style="font-size:15px;">{{faml.designtimeconcepts[indextr].definition}}</div>
                    </template>
                  </vs-tr>
                </template>
              </vs-table>
            </vs-collapse-item>
            <vs-collapse-item>
              <div slot="header">
                <h6>
                  Run Time Concepts Matching -
                  <b>%{{language.runTimePer}}</b>
                </h6>
              </div>
              <div>
                <p
                  style="font-size:15px;"
                >Açıklamalar dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmed</p>
                <br />
              </div>
              <vs-table hoverFlat="false" :data="faml.designtimeconcepts">
                <template slot="thead">
                  <vs-th>FAML Concept</vs-th>
                  <vs-th>{{language.name}} Concept</vs-th>
                </template>
                <template>
                  <vs-tr
                    :state="language.designTimeMatch[indextr] != '-' ?'success':language.designTimeMatch[indextr] == '-'?'danger':null"
                    :key="indextr"
                    v-for="(tr, indextr) in faml.designtimeconcepts"
                  >
                    <vs-td
                      style="font-size:15px;"
                      :data="faml.designtimeconcepts[indextr].concept"
                    >{{faml.designtimeconcepts[indextr].concept}}</vs-td>
                    <vs-td
                      style="font-size:15px;"
                      :data="language.designTimeMatch[indextr]"
                    >{{language.designTimeMatch[indextr]}}</vs-td>
                    <template class="expand-user" slot="expand">
                      <div style="font-size:15px;">{{faml.designtimeconcepts[indextr].definition}}</div>
                    </template>
                  </vs-tr>
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
                <p>Açıklamalar dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmed</p>
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
            <div class="col s12">
              <div class="field averageSurvey">
                <apexchart type="radar" height="400" :options="radarOptions" :series="radarSeries" />
              </div>
            </div>
            <div class="col s12">
              <div class="field surveyDesc">
                Comparison with FAML metamodel was performed in two different categories. These are in terms of
                <b>design time concepts</b> and
                <b>runtime concepts</b>. According to this evaluation,
                <b>%{{(language.designTimePer+language.runTimePer)/2}}</b> matching was observed with the concepts in FAML metamodel.
                More detailed information on design time and runtime is given below.
              </div>
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
                        :series="functionalSuitabilitySeries"
                      />
                    </div>
                  </vs-tab>
                  <vs-tab label="Usability">
                    <div class="con-tab-ejemplo">Usability</div>
                  </vs-tab>
                  <vs-tab label="Reliability">
                    <div class="con-tab-ejemplo">Reliability</div>
                  </vs-tab>
                  <vs-tab label="Expressiveness">
                    <div class="con-tab-ejemplo">Expressiveness</div>
                  </vs-tab>
                  <vs-tab label="Compatibility">
                    <div class="con-tab-ejemplo">Compatibility</div>
                  </vs-tab>
                  <vs-tab label="MAS Development">
                    <div class="con-tab-ejemplo">MAS Development</div>
                  </vs-tab>
                </vs-tabs>
              </div>
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
      id: this.$route.params.id,
      language: null,
      faml: null,
      benchmarkingOptions: {
        labels: ["Supported", "Not Supported"],
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
          categories: ["Garbage Collector System", "Hotel Reservation System", "All Case Studies"],
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
            "Error Testing",
            "Average Time"
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
  },
  computed: {
    benchmarkingSeries() {
      const totalPer =
        (this.language.designTimePer + this.language.runTimePer) / 2;
      return [totalPer, 100 - totalPer];
    },
    functionalSuitabilitySeries() {
      //const functionalSuitabilitySeries = this.language.test;
      return [
        {
          name: "Hotel Reservation Project",
          data: this.language.test
        },
        {
          name: "Garbage Collector Project",
          data: this.language.test
        }
      ];
    },
    developmentSeries() {
      //const functionalSuitabilitySeries = this.language.test;
      const totalForZero =
        this.language.caseStudies[0].problemAnalysis +
        this.language.caseStudies[0].modelling +
        this.language.caseStudies[0].implementation +
        this.language.caseStudies[0].error;
      const totalForOne =
        this.language.caseStudies[1].problemAnalysis +
        this.language.caseStudies[1].modelling +
        this.language.caseStudies[1].implementation +
        this.language.caseStudies[1].error;
      return [
        {
          name: this.language.caseStudies[0].name,
          data: [
            this.language.caseStudies[0].problemAnalysis,
            this.language.caseStudies[0].modelling,
            this.language.caseStudies[0].implementation,
            this.language.caseStudies[0].error,
            totalForZero / 4
          ]
        },
        {
          name: this.language.caseStudies[1].name,
          data: [
            this.language.caseStudies[1].problemAnalysis,
            this.language.caseStudies[1].modelling,
            this.language.caseStudies[1].implementation,
            this.language.caseStudies[1].error,
            totalForOne / 4
          ]
        },
        {
          name: "All Case Studies",
          data: [
            this.language.caseStudies[0].problemAnalysis +
              this.language.caseStudies[1].problemAnalysis,
            this.language.caseStudies[0].modelling +
              this.language.caseStudies[1].modelling,
            this.language.caseStudies[0].implementation +
              this.language.caseStudies[1].implementation,
            this.language.caseStudies[0].error +
              this.language.caseStudies[1].error,
            totalForOne / 4 + totalForZero / 4
          ]
        }
      ];
    },
    generationSeries() {
      const totalgenerated = this.language.caseStudies[0].generatedCode + this.language.caseStudies[1].generatedCode;
      const totalhardCoded = this.language.caseStudies[0].hardCoded + this.language.caseStudies[1].hardCoded;
      return [
        {
          name: "Generated Code",
          data: [
            this.language.caseStudies[0].generatedCode,
            this.language.caseStudies[1].generatedCode,
            totalgenerated,
          ]
        },
        {
          name: "Hard Coded by Developer",
          data: [
            this.language.caseStudies[0].hardCoded,
            this.language.caseStudies[1].hardCoded,
            totalhardCoded,
          ]
        },
      ];
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
