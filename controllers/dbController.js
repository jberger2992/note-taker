const express = require('express');
const router = express.Router();
const db = require("../db/db.json");
const fs = require("fs");
const uuid = require('uuid');

// /api/notes
router.get("/notes", (req,res) =>{
    res.json(db)
})

router.post('/notes', (req,res)=>{
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } else {
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

module.exports = router;