const bodyParser = require("body-parser");

const express = require("express");
const root4 = express.Router();


const cors = require("cors");
const pool = require("../db")
//ajout
root4.post("/photocopie", async (req, res) => {
    try {
        const {prixphotocopie} = req.body;
       

        const newTodo2 = await pool.query("INSERT INTO public.photocopie (prixphotocopie) VALUES ($1)  ",
            [prixphotocopie]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }});
//modif 
root4.post("/photocopie/modif", async (req, res) => {
    try {
        const { prixphotocopie } = req.body;
       

        const newTodo2 = await pool.query("UPDATE photocopie SET prixphotocopie=$1",
            [ prixphotocopie ]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
root4.get("/photocopie", async (req, res) => {
    try {
        
       

        const newTodo = await pool.query(" SELECT * FROM photocopie")
        res.json(newTodo.rows);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
module.exports=root4;
