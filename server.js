const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid = require('uuid');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

router.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get("/api/notes", (req,res) =>{
  const db = require("./db/db.json");
  console.log(db);
  fs.readFile("./db/db.json","utf-8",(err,data)=>{
    if(err){
      return res.status(500).json({msg:"error reading db"})
    }
    else{
      res.json(JSON.parse(data))
    }
  })
})

app.post('/api/notes', (req,res)=>{
  fs.readFile("./db/db.json","utf-8",(err,data)=>{
    if(err){
      return res.status(500).json({msg:"error reading db"})
    } 
    else{
      const dataArr = JSON.parse(data);
      const newNote = {
        id:uuid.v4(),
        title:req.body.title,
          text:req.body.text
        }
        console.log(newNote)
      dataArr.push(newNote)
      fs.writeFile("./db/db.json",JSON.stringify(dataArr,null,4),(err)=>{
      if(err){
          return res.status(500).json({msg:"error writing db"})
        } else {
          return res.json(newNote)
        }
      })
    }
  })
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);