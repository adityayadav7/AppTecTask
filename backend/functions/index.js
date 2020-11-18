const functions = require('firebase-functions');

const express = require('express');

const app = express();
const {addData,getData,deleteData}=require('./controllers/controller')
const cors = require('cors')
app.use(cors());

app.post('/add',addData);
app.get('/getData',getData);
app.delete('/delete/data/:id',deleteData);

exports.api = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
