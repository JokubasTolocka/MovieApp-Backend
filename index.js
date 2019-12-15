const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      PORT = 8000 || process.env.PORT;

app.listen(PORT, function(){
    console.log("Server is starting");
})