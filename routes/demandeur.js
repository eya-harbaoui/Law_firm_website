const bodyParser = require("body-parser");
const express = require("express");
const root14 = express.Router();
const cors = require("cors");
const pool = require("../db");
const auth = require("../middlewares/AuthMiddleWare");

//middleware

//routes//
//create adversaire
//req heya requete client res heya res li bch ymchi lclient
//async taati wa9t lel data bch tekhdem les fctions teeha
root14.post("/clientadd", async (req, res) => {
  try {
    const { nom, cin, adresse, adressedesigne, tel, fax, email, id_dossier } =
      req.body;
    const newadversaires = await pool.query(
      "INSERT INTO demandeur (nom,cin,adresse,adressedesigne,tel,fax,email,id_doss) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id_doss",
      [nom, cin, adresse, adressedesigne, tel, fax, email, id_dossier]
      //res.json("succes"),
    );
    const id_doss = newadversaires.rows[0].id_doss;
    const addadversaire = await pool.query(
      "UPDATE recherchedossier SET demandeur=$1 WHERE id_dossier=$2",
      [nom, id_doss]
      //res.json("succes"),
    );
    res.json(newadversaires.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get all adversaires
root14.get("/client", async (req, res) => {
  try {
    const alladversaires = await pool.query(
      "SELECT * FROM demandeur ORDER by id_demandeur asc"
    );
    res.json(alladversaires.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a adversaire
root14.get("/client/:id_demandeur", async (req, res) => {
  try {
    const { id_demandeur } = req.params;
    const adversaire = await pool.query(
      "SELECT * FROM demandeur WHERE id_demandeur=$1",
      [id_demandeur]
    );
    res.json(adversaire.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update a adversaire
root14.post("/client/update", async (req, res) => {
  try {
    const { id_demandeur } = req.body;
    const { nom, cin, adresse, adressedesigne, tel, fax, email } = req.body;
    const updatePrime = await pool.query(
      "UPDATE demandeur SET nom=$1,cin=$2,adresse=$3,adressedesigne=$4,tel=$5,fax=$6,email=$7 WHERE id_demandeur=$8",
      [nom, cin, adresse, adressedesigne, tel, fax, email, id_demandeur]
    );
    res.json("adversaire updated");
  } catch (err) {
    console.error(err.message);
  }
});
//delete  adversaire
root14.post("/clienteff", async (req, res) => {
  try {
    const { id } = req.body;
    const deletePrime = await pool.query(
      "DELETE FROM demandeur WHERE id_demandeur=$1",
      [id]
    );
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = root14;
