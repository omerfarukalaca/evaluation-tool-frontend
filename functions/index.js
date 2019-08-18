const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");

admin.initializeApp(functions.config().firebase);

const fs = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.onLanguageCreated = functions.firestore
  .document("languages/{languageId}")
  .onCreate((async snap => {
    // Get the language document
    const language = snap.data();

    language.id = snap.id;

    fs.collection("languages")
      .where("name", "==", language.name)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          fs.collection("languages")
            .doc(doc.id)
            .update(language);
        });
      });
    return true;
  }));

exports.onDevelopmentDataCreated = functions.firestore
  .document("development_datas/{Id}")
  .onCreate((async snap => {
    // Get the language document
    const development_data = snap.data();
    var results = development_data.results.split(',');

    const languageRef = fs.collection("languages").doc(development_data.evaluate_language);
    const languageSnap = await languageRef.get();
    var languageData = await languageSnap.data();

    var flag;
    for (let index = 0; index < languageData.caseStudies.length; index++) {
      if (languageData.caseStudies[index].name == development_data.caseStudy)
        flag = index
    }

    for (let index = 1; index <= 24; index++) {
      var norm = "n" + index;
      languageData.caseStudies[flag].surveyResults[norm][results[index] - 1] = languageData.caseStudies[flag].surveyResults[norm][results[index] - 1] + 1;
      switch (index) {
        case 1: case 2:
          languageData.caseStudies[flag].surveyResults["Functional"][results[index] - 1] = languageData.caseStudies[flag].surveyResults["Functional"][results[index] - 1] + 1;
          break;
        case 3: case 4: case 5: case 6: case 7: case 8: case 9:
          languageData.caseStudies[flag].surveyResults["Usability"][results[index] - 1] = languageData.caseStudies[flag].surveyResults["Usability"][results[index] - 1] + 1;
          break;
        case 10: case 11:
          languageData.caseStudies[flag].surveyResults["Reliability"][results[index] - 1] = languageData.caseStudies[flag].surveyResults["Reliability"][results[index] - 1] + 1;
          break;
        case 12: case 13: case 14: case 15: case 16: case 17:
          languageData.caseStudies[flag].surveyResults["Expressiveness"][results[index] - 1] = languageData.caseStudies[flag].surveyResults["Expressiveness"][results[index] - 1] + 1;
          break;
        case 18: case 19:
          languageData.caseStudies[flag].surveyResults["Compatibility"][results[index] - 1] = languageData.caseStudies[flag].surveyResults["Compatibility"][results[index] - 1] + 1;
          break;
        case 20: case 21: case 22: case 23: case 24:
          languageData.caseStudies[flag].surveyResults["MAS"][results[index] - 1] = languageData.caseStudies[flag].surveyResults["MAS"][results[index] - 1] + 1;
          break;
      }
    }

    var myListofArrays = [];
    var charArray = ["", "Functional", "Usability", "Reliability", "Expressiveness", "Compatibility", "MAS"]
    var divideArray = [0, 2, 7, 2, 6, 2, 5]

    for (let k = 1; k < charArray.length; k++) {
      for (let j = 0; j < languageData.caseStudies.length; j++) {
        myListofArrays[j] = languageData.caseStudies[j].surveyResults[charArray[k]]
      }
      languageData.surveyAverageScores[k] = calculateAverageForChar(myListofArrays, divideArray[k]);
      myListofArrays = [];
    }

    var sum = 0;
    for (var i = 1; i < languageData.surveyAverageScores.length; i++) {
      sum = sum + languageData.surveyAverageScores[i];
    }
    languageData.surveyAverageScores[0] = sum / 6;

    var userCount = languageData.caseStudies[flag].developmentTimes.userCount + 1;
    var errorDetection = ((languageData.caseStudies[flag].developmentTimes.times.errorDetection * (languageData.caseStudies[flag].developmentTimes.userCount)) + development_data.developmentTimes.errorTesting) / userCount;
    var implementation = ((languageData.caseStudies[flag].developmentTimes.times.implementation * (languageData.caseStudies[flag].developmentTimes.userCount)) + development_data.developmentTimes.implementation) / userCount;
    var modelling = ((languageData.caseStudies[flag].developmentTimes.times.modelling * (languageData.caseStudies[flag].developmentTimes.userCount)) + development_data.developmentTimes.modellingDesign) / userCount;
    var problemAnalysis = ((languageData.caseStudies[flag].developmentTimes.times.problemAnalysis * (languageData.caseStudies[flag].developmentTimes.userCount)) + development_data.developmentTimes.problemAnalysis) / userCount;

    console.log(languageData.caseStudies[flag].developmentTimes)

    languageData.caseStudies[flag].developmentTimes.userCount = userCount;
    languageData.caseStudies[flag].developmentTimes.times.errorDetection = errorDetection;
    languageData.caseStudies[flag].developmentTimes.times.implementation = implementation;
    languageData.caseStudies[flag].developmentTimes.times.modelling = modelling;
    languageData.caseStudies[flag].developmentTimes.times.problemAnalysis = problemAnalysis;


    fs.collection("languages")
      .where("id", "==", development_data.evaluate_language)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          fs.collection("languages")
            .doc(doc.id)
            .update(languageData);
        });
      });
    return true;
  }));


function calculateAverageForChar(array, divide) {
  var sum = 0;
  var average = 0;
  var count = 0;

  console.log("Array Uzunluğu: " + array.length)
  console.log("Array: " + array)
  console.log("Divide: " + divide)
  for (let index = 0; index < array.length; index++) {

    let values = array[index]
    console.log("Array[index]: " + array[index])
    for (var i = 0; i < 5; i++) {
      if (values[i] != 0) {
        sum = sum + values[i] * (i + 1);
        count += values[i];
      }
    }
  }
  if (sum != 0) {
    average = sum / count;
    console.log("Average: " + average)

  }
  console.log("Count: " + count)
  return average;
}