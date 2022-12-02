const bodyParser = require("body-parser");
const express = require("express");
const root12 = express.Router();
const cors = require("cors");
const pool = require("../db");
const auth = require("../middlewares/AuthMiddleWare");

//middleware

//routes//
//create adversaire
//req heya requete client res heya res li bch ymchi lclient
//async taati wa9t lel data bch tekhdem les fctions teeha
root12.post("/adversaireadd", auth, async(req, res) => {
    try {
        const { nom, registre, adresse, adressedesigne, avocat, adresseavocat, id_dossier } = req.body;
        const newadversaires = await pool.query(
            "INSERT INTO adversaire (nom, registre, adresse, adressedesigne, avocat,adresseavocat,id_doss) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id_doss", [nom, registre, adresse, adressedesigne, avocat, adresseavocat, id_dossier]
            //res.json("succes"),
        );
        const id_doss = newadversaires.rows[0].id_doss
        const addadversaire = await pool.query(
            "UPDATE recherchedossier SET adversaire=$1 WHERE id_dossier=$2", [
                nom, id_doss
            ]
            //res.json("succes"),
        );
        res.json(newadversaires.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//get all adversaires
root12.get("/adversaire", async(req, res) => {
    try {
        const alladversaires = await pool.query(
          "SELECT * FROM adversaire ORDER by id_adversaire asc"
        );
        res.json(alladversaires.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get a adversaire
root12.get("/adversaire/:id", async(req, res) => {
    try {
        const { id_adversaire } = req.params;
        const adversaire = await pool.query("SELECT * FROM adversaire WHERE id_adversaire=$1", [
            id,
        ]);
        res.json(adversaire.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//update a adversaire
root12.post("/adversaire/update", async(req, res) => {
    try {
        const { id_adversaire } = req.body;
        const { nom, registre, adresse, adressedesigne, avocat, adresseavocat } = req.body;
        const updatePrime = await pool.query(
            "UPDATE adversaire SET nom=$1,registre=$2,adresse=$3,adressedesigne=$4,avocat=$5,adresseavocat=$6 WHERE id_adversaire=$7", [nom, registre, adresse, adressedesigne, avocat, adresseavocat, id_adversaire]
        );
        res.json("adversaire updated");
    } catch (err) {
        console.error(err.message);
    }
});
//delete  adversaire
root12.post("/adversaireeff", async(req, res) => {
    try {
        const { id } = req.body;
        const deletePrime = await pool.query(
            "DELETE FROM adversaire WHERE id_adversaire=$1", [id]
        );
        res.json("deleted");
    } catch (err) {
        console.error(err.message);
    }
});
module.exports = root12;