const express = require('express');
const app = express();
const PORT = process.env.port || 3001;

app.use(express.static("public"))

app.use(express.json());
application.use(express.urlencoded({extended: true}));

const allRoutes = require("./controllers");
app.use(allRoutes)

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);