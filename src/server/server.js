import express from 'express';
import path from 'path';

const app = express();
const PORT = (process.argv.indexOf("-p") == -1) ? 8080 : process.argv[process.argv.indexOf("-p") + 1];

const staticPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../index.html');

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use("/static", staticPath);
// app.use("/favicon.ico", staticPath);

app.get('/health', function(req, res){
  res.json({ message: 'Leadership Dashboard UI working!' });
});

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
