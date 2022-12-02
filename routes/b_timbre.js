const bodyParser = require("body-parser");

const express = require("express");
const root3 = express.Router();


const cors = require("cors");
const pool = require("../db")




//RouTES
//ajout
root3.post("/timbre", async (req, res) => {
    try {
        const {libelle,montant} = req.body;
       

        const newTodo2 = await pool.query("INSERT INTO public.timbre (libelle,montant) VALUES ($1, $2)  ",
            [libelle,montant]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
//pour la modification 
root3.post("/timbre/modif", async (req, res) => {
    try {
        const { id,libelle,montant } = req.body;
       

        const newTodo1 = await pool.query("UPDATE public.timbre SET libelle=$2,montant=$3 WHERE id=$1",
            [id,libelle,montant]);
        res.json(newTodo1);
        

    }
    catch (err) {
        console.error('aaaaaabb',err.message);
    }
});

root3.get("/timbre", async (req, res) => {
    try {

        const newTodo = await pool.query("SELECT * FROM timbre")
        res.json(newTodo.rows);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
//suppression
root3.post("/timbre/delete", async (req, res) => {
    try {
        const { id } = req.body;
       const newTodo1 = await pool.query("DELETE FROM public.timbre WHERE id=$1",
            [id]);
        res.json(newTodo1);
        res.json("timbre was deleted");
        

    }
    catch (err) {
        console.error(err.message);
    }
});

module.exports=root3;