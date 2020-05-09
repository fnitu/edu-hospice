// FROM: https://medium.com/better-programming/how-to-deploy-your-angular-9-app-to-heroku-in-minutes-51d171c2f0d

// https://stackoverflow.com/questions/35736053/referenceerror-app-is-not-definied-in-node-js-steamwebapi
var express = require('express');
var app = express();


// Serve our static files.
app.use(express.static('./dist/edu-hospice'));

//  Wait for a request to any path and redirect all of the requests to index.html.
app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: 'dist/edu-hospice'}
  );
});

//  Listen for requests at the PORT specified by env variables or the default Heroku port, which is 8080.
app.listen(process.env.PORT || 8080);
