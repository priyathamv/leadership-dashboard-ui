var express    = require('express');

const app = express();
const PORT = 8080;

app.get('/', function(req, res){
  res.json({ message: 'Leadership Dashboard!' });
});

app.get('/health', function(req, res){
  res.json({ message: 'Leadership Dashboard UI working!' });
});

app.listen(PORT, function(){
  console.log("Listening on port: " + PORT);
});
