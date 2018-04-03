import express from 'express';

const app = express();
const PORT = 8080;

const staticPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../index.html');

app.use("/static", staticPath);

app.get('/health', function(req, res){
  res.json({ message: 'Leadership Dashboard UI working!' });
});

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
