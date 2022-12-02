const bodyParser = require("body-parser");
const express = require("express");
const root6 = express.Router();

const cors = require("cors");
const pool = require("../db");

root6.post("/recettedufinance", async(req, res) => {
    try {
        const {
            //id
            libelle,
            montant,
        } = req.body;

        const newTodo1 = await pool.query(
            "INSERT INTO public.recettedufinance ( libelle,montant ) VALUES($1,$2)", [
                //id,
                libelle,
                montant,
            ]
        );
        res.json(newTodo1);
    } catch (err) {
        console.error(err.message);
    }
});
//select
root6.get("/recettedufinance", async(req, res) => {
    try {
        const newTodo = await pool.query(
            " SELECT * FROM recettedufinance ORDER by id asc"
        );
        res.json(newTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//pour la modification
root6.post("/recettedufinance/modif", async(req, res) => {
    try {
        const { id, libelle, montant } = req.body;

        const newTodo2 = await pool.query(
            "UPDATE recettedufinance SET libelle=$2,montant=$3 WHERE id=$1 ", [id, libelle, montant]
        );
        res.json(newTodo2);
    } catch (err) {
        console.error(err.message);
    }
});
// pour la suppression
root6.post("/recettedufinance/delete", async(req, res) => {
    try {
        const { id } = req.body;
        const newTodo1 = await pool.query(
            "DELETE FROM recettedufinance WHERE id=$1", [id]
        );
        res.json(newTodo1);
        res.json("honoraire was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = root6;