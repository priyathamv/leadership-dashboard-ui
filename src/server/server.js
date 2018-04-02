var express    = require('express');
var path    = require('path');

const app = express();
const PORT = process.env.PORT || 12234;

app.get('/', function(req, res){
  res.json({ message: 'Leadership Dashboard!' });
});

app.listen(PORT, function(){
  console.log(`Listening on port: ${PORT}`);
});
