const bodyParser = require("body-parser");
const express = require("express");
const root8 = express.Router();
const cors = require("cors");
const pool = require("../db");

//middleware

//routes//
//create prime
//req heya requete client res heya res li bch ymchi lclient
//async taati wa9t lel data bch tekhdem les fctions teeha
root8.post("/primehuissieradd", async(req, res) => {
    try {
        const { libelle, montant, dessociable, impot, mensuel } = req.body;
        const newprimes = await pool.query(
            "INSERT INTO primehuissier (libelle, montant, dessociable, impot, mensuel) VALUES($1,$2,$3,$4,$5)", [libelle, montant, dessociable, impot, mensuel]
            //res.json("succes"),
        );
        res.json(newprimes.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//get all primes
root8.get("/primehuissier", async(req, res) => {
    try {
        const allprimes = await pool.query(
          "SELECT * FROM primehuissier ORDER by id asc"
        );
        res.json(allprimes.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get a prime
root8.get("/primehuissier/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const prime = await pool.query("SELECT * FROM primehuissier WHERE id=$1", [
            id,
        ]);
        res.json(prime.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//update a prime
root8.post("/primehuissier/update", async(req, res) => {
    try {
        const { id } = req.body;
        const { libelle, montant, dessociable, impot, mensuel } = req.body;
        const updatePrime = await pool.query(
            "UPDATE primehuissier SET libelle=$1,montant=$2,dessociable=$3,impot=$4,mensuel=$5 WHERE id=$6", [libelle, montant, dessociable, impot, mensuel, id]
        );
        res.json("prime updated");
    } catch (err) {
        console.error(err.message);
    }
});
//delete a prime
root8.post("/primehuissiereff", async(req, res) => {
    try {
        const { id } = req.body;
        const deletePrime = await pool.query(
            "DELETE FROM primehuissier WHERE id=$1", [id]
        );
        res.json("deleted");
    } catch (err) {
        console.error(err.message);
    }
});
module.exports = root8;