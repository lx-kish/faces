const AWS = require('aws-sdk');
// const express = require('express');
// const fileUpload = require('express-fileupload');
// const app = express();

// app.use(fileUpload());

AWS.config.loadFromPath('./credentials.json');
AWS.config.update({ region: 'us-west-2' });

var rekognition = new AWS.Rekognition();

var params = {
     CollectionId: "youtubers",
     DetectionAttributes: [
     ],
     ExternalImageId: "youtubers",
     Image: {
          S3Object: {
               Bucket: "lx-facesphotosrekognition",
               Name: "Shroud_cropped.jpg"
          }
     }
};
// rekognition.indexFaces(params, function (err, data) {
//      if (err) console.log(err, err.stack); // an error occurred
//      else console.log(data);           // successful response
// });

app.use(express.static('public'));

app.post('/upload', function (req, res) {
     if (Object.keys(req.files).length == 0) {
          return res.status(400).send('No files were uploaded.');
     }

     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
     let sampleFile = req.files.sampleFile;

     // Use the mv() method to place the file somewhere on your server
     sampleFile.mv('/somewhere/on/your/server/filename.jpg', function (err) {
          if (err)
               return res.status(500).send(err);

          res.send('File uploaded!');
     });
});