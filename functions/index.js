const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");

admin.initializeApp(functions.config().firebase);

const fs = admin.firestore();


const mkdirp = require('mkdirp-promise');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
var unlink = require('fs');
var $ = require("jquery")
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


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

    fs.collection("languages")
      .where("name", "==", language.name)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          fs.collection("languages")
            .doc(doc.id)
            .update({
              id: snap.id
            });
        });
      });
    return true;
  }));

exports.onDevelopmentDataCreated = functions.firestore
  .document("development_datas/{Id}")
  .onCreate((async snap => {
    // Get the language document
    const development_data = snap.data();
    const languageRef = fs.collection("languages").doc(development_data.evaluate_language);
    const languageSnap = await languageRef.get();
    var languageData = await languageSnap.data();
    var flag;
    for (let index = 0; index < languageData.caseStudies.length; index++) {
      if (languageData.caseStudies[index].name == development_data.caseStudy)
        flag = index
    }

    if(development_data.flag == 0){

      var results = development_data.results.split(',');
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


      //HC
      var str = languageData.name;
      console.log("Mock :" + str);
      if (str.includes("Clone")) {
        console.log("Randomize :" + str);
        languageData.caseStudies[flag].caseStudyAnalysis.LoC.generated += randomize("g", -1);
        languageData.caseStudies[flag].caseStudyAnalysis.LoC.hardCoded += randomize("h", -1);
        for (let index = 0; index < languageData.entites.length; index++) {
          languageData.caseStudies[flag].caseStudyAnalysis.modellingEntities[index] = randomize("m", index);
          console.log("Rand :" + randomize("m", index));
          console.log("Data :" + languageData.caseStudies[flag].caseStudyAnalysis.modellingEntities[index]);
        }
      }

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

    } else if(development_data.flag == 1){

      var userCount = languageData.caseStudies[flag].withoutDevelopmentTimes.userCount + 1;
      var errorDetection = ((languageData.caseStudies[flag].withoutDevelopmentTimes.times.errorDetection * (languageData.caseStudies[flag].developmentTimes.userCount)) + development_data.developmentTimes.errorTesting) / userCount;
      var implementation = ((languageData.caseStudies[flag].withoutDevelopmentTimes.times.implementation * (languageData.caseStudies[flag].developmentTimes.userCount)) + development_data.developmentTimes.implementation) / userCount;
      var modelling = ((languageData.caseStudies[flag].withoutDevelopmentTimes.times.modelling * (languageData.caseStudies[flag].developmentTimes.userCount)) + development_data.developmentTimes.modellingDesign) / userCount;
      var problemAnalysis = ((languageData.caseStudies[flag].withoutDevelopmentTimes.times.problemAnalysis * (languageData.caseStudies[flag].developmentTimes.userCount)) + development_data.developmentTimes.problemAnalysis) / userCount;
  
      console.log(languageData.caseStudies[flag].developmentTimes)

      languageData.caseStudies[flag].withoutDevelopmentTimes.userCount = userCount;
      languageData.caseStudies[flag].withoutDevelopmentTimes.times.errorDetection = errorDetection;
      languageData.caseStudies[flag].withoutDevelopmentTimes.times.implementation = implementation;
      languageData.caseStudies[flag].withoutDevelopmentTimes.times.modelling = modelling;
      languageData.caseStudies[flag].withoutDevelopmentTimes.times.problemAnalysis = problemAnalysis;
    }

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

function randomize(type, index) {
  var value = 0;
  if (type == "g") {
    value = getRndInteger(200, 400);
    return value;
  }
  if (type == "h") {
    value = getRndInteger(400, 550);
    return value;
  }
  if (type == "m") {
    switch (index) {
      case 0:
        value = getRndInteger(0, 1);
        break;
      case 1:
        value = getRndInteger(2, 5);
        break;
      case 2:
        value = getRndInteger(1, 2);
        break;
      case 3:
        value = getRndInteger(1, 4);
        break;
      case 4:
        value = getRndInteger(1, 4);
        break;
      case 5:
        value = getRndInteger(3, 7);
        break;
      case 6:
        value = getRndInteger(1, 3);
        break;
      case 7:
        value = getRndInteger(2, 5);
        break;
      case 8:
        value = getRndInteger(1, 3);
        break;
      case 9:
        value = getRndInteger(0, 1);
        break;
      case 10:
        value = getRndInteger(1, 3);
        break;
      default:
        value = getRndInteger(3, 6);
        break;

    }
    return value;
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

exports.processStorageFile = functions.storage.object().onFinalize(async (object) => {
  // File and directory paths.
  const filePath = object.name;
  const contentType = object.contentType;
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);

  console.log("filePath: " + filePath);
  console.log("contentType: " + contentType);
  console.log("fileDir: " + fileDir);
  console.log("fileName: " + fileName);
  console.log("tempLocalFile: " + tempLocalFile);
  console.log("tempLocalDir: " + tempLocalDir);

  // Cloud Storage files.
  const bucket = admin.storage().bucket(object.bucket);
  const file = bucket.file(filePath);
  const metadata = {
    contentType: contentType,
    // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
    // 'Cache-Control': 'public,max-age=3600',
  };

  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir)
  // Download file from bucket.
  await file.download({ destination: tempLocalFile });
  console.log('The file has been downloaded to', tempLocalFile);

  // Read Json and write firestore
  // Exit if this is triggered on a file that is not an image.
  if (contentType.startsWith('application/json')) {
    const json = require(tempLocalFile);
    console.log(json); // this will log out the json object
    var entites = [];

    for (let index = 0; index < json.entities.length; index++) {
      entites[index] = json.entities[index].name;
    }

    fs.collection("languages")
      .where("name", "==", json.agentdsmlName)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          fs.collection("languages")
            .doc(doc.id)
            .update({
              entites: entites,
            });
        });
      });
    return console.log('Metamodel processed!');
  }

  // Once the image has been uploaded delete the local files to free up disk space.
  unlink.unlinkSync(tempLocalFile);

})