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
  .onCreate((snap, context) => {
    // Get the language document
    const language = snap.data();

    language.id = snap.id;
    language.famlComparison = {
        averagePer : 40,
        designTimePer : 50,
        runTimePer : 60,
        designTimeConcepts : ["N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A"],
        runTimeConcepts : ["N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A"],
    };
    language.entites = ["N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A"];

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
  });