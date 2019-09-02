const PORT = process.env.PORT || 3000;

const AWS = require('aws-sdk');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

AWS.config.loadFromPath('./credentials.json');
AWS.config.update({ region: 'us-west-2' });

var rekognition = new AWS.Rekognition();

function searchByImage(image) {
     var params = {
          CollectionId: "youtubers",
          Image: {
               Bytes: image.data.buffer
          }
          // DetectionAttributes: [
          // ],
          // ExternalImageId: "youtubers",
          // Image: {
          //      S3Object: {
          //           Bucket: "lx-facesphotosrekognition",
          //           Name: "Shroud_cropped.jpg"
          //      }
          // }
     };
     rekognition.searchFacesByImage(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else console.log(data);           // successful response
     });
}

app.use(express.static('public'));

app.post('/upload', function (req, res) {

     // console.log(req.files);

     if (!req.files) 
         return res.status(400).send('No files were uploaded');
     // if (Object.keys(req.files).length == 0) {
     //      return res.status(400).send('No files were uploaded.');
     // }

     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
     let uploadedImage = req.files.faceToSerach;

     searchByImage(uploadedImage);

});

app.listen(PORT, function (err) {
     if (err) {
       throw err
     }
   
     console.log('Server started on port ' + PORT);
   });