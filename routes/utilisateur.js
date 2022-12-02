const bodyParser = require("body-parser");
const express = require("express");
const root9 = express.Router();
const cors = require("cors");
const pool = require("../db");

//middleware

//routes//
//create utilisateur
//req heya requete client res heya res li bch ymchi lclient
//async taati wa9t lel data bch tekhdem les fctions teeha
root9.post("/utilisateuradd", async(req, res) => {
    try {
        const { login, mdp, domaine } = req.body;
        const newutilisateurs = await pool.query(
            "INSERT INTO utilisateur (login,mdp,domaine) VALUES($1,$2,$3)", [login, mdp, domaine]
            //res.json("succes"),
        );
        res.json(newutilisateurs.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//get all utilisateurs
root9.get("/utilisateur", async(req, res) => {
    try {
        const allutilisateurs = await pool.query("SELECT * FROM utilisateur");
        res.json(allutilisateurs.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get  utilisateur
root9.get("/utilisateur/:id", async(req, res) => {
    try {
        const { login } = req.params;
        const utilisateur = await pool.query("SELECT * FROM utilisateur WHERE login=$1", [
            login
        ]);
        res.json(utilisateur.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//update a utilisateur
root9.post("/utilisateur/update", async(req, res) => {
    try {
        const { login, mdp, domaine } = req.body;
        const updateutilisateur = await pool.query(
            "UPDATE utilisateur SET mdp=$2,domaine=$3 WHERE login=$1", [login, mdp, domaine]
        );
        res.json("utilisateur updated");
    } catch (err) {
        console.error(err.message);
    }
});
//delete a utilisateur
root9.post("/utilisateureff", async(req, res) => {
    try {
        const { login } = req.body;
        const deleteutilisateur = await pool.query(
            "DELETE FROM utilisateur WHERE login=$1", [login]
        );
        res.json("deleted");
    } catch (err) {
        console.error(err.message);
    }
});
module.exports = root9;