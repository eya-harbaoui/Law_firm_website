const bodyParser = require("body-parser");

const express = require("express");
const root7 = express.Router();


const cors = require("cors");
const pool = require("../db")
    //ajout

root7.post("/emplacementdossier", async(req, res) => {
    try {
        const { libelle } = req.body;


        const newTodo2 = await pool.query(" INSERT INTO public.emplacementdossier (libelle) VALUES ($1) ", [libelle]);
        res.json(newTodo2);


    } catch (err) {
        console.error(err.message);
    }
});
//modif 
root7.post("/emplacementdossier/modif", async(req, res) => {
    try {
        const { id, libelle } = req.body;


        const newTodo2 = await pool.query("UPDATE emplacementdossier SET libelle=$2 WHERE id=$1", [id, libelle]);
        res.json(newTodo2);


    } catch (err) {
        console.error(err.message);
    }
});
//select
root7.get("/emplacementdossier", async(req, res) => {
    try {



        const newTodo = await pool.query(" SELECT * FROM emplacementdossier ORDER by id asc")
        res.json(newTodo.rows);


    } catch (err) {
        console.error(err.message);
    }
});
// pour la suppression
root7.post("/emplacementdossier/delete", async(req, res) => {
    try {
        const { id } = req.body;
        const newTodo1 = await pool.query("DELETE FROM emplacementdossier WHERE id=$1", [id]);
        res.json(newTodo1);
        res.json("emplacement was deleted");


    } catch (err) {
        console.error(err.message);
    }
});


module.exports = root7;