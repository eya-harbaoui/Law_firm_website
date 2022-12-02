const bodyParser = require("body-parser");
const express = require("express");
const root11 = express.Router();
const cors = require("cors");
const pool = require("../db");

//mid_dossierdleware

//routes//
//create dossier
/*root11.post("/recherchedossieradd", async (req, res) => {
  try {
    const newdossiers = await pool.query(
      "INSERT INTO recherchedossier(client) SELECT raison FROM gestionclient "
      //res.json("succes"),
    );
    res.json(newdossiers.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});*/
//ajouter les données du client du dossier concernant  
root11.post("/clientdossieradd", async (req, res) => {
  try {
    const {raison,num} =
      req.body;

    const newdossiers = await pool.query(
      "INSERT INTO recherchedossier (client,tel) VALUES($1,$2) RETURNING id_dossier",
      [raison, num]
    );
    console.log(newdossiers.rows[0])
    res.json(newdossiers.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
//"UPDATE  recherchedossier SET (num_affaire,emplacement,mission,code_dossier,annee,lieu,service,observation,date_creation,type_dossier) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) WHERE id_dossier=$11",
//ajouter les donnée du dossier
root11.post("/donneedossieradd", async (req, res) => {
  try {
    const {typedossier,
    codedossier,
    annee,
    mission,
    emplacement,
    numaffaire,
    lieu,
    service,
    observation,
    date_creation,
    id_dossier} = req.body;

    const newdossiers = await pool.query(
      
      "UPDATE recherchedossier SET num_affaire=$1,emplacement=$2,mission=$3,code_dossier=$4,annee=$5,lieu=$6,service=$7,observation=$8,date_creation=$9,type_dossier=$10 WHERE id_dossier=$11",
      [numaffaire,emplacement,mission,codedossier,annee,lieu,service,observation,date_creation,typedossier,id_dossier]
     
    );
    res.json(newdossiers.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get all dossiers
root11.get("/recherchedossier", async (req, res) => {
  try {
    const alldossiers = await pool.query(
      "SELECT * FROM recherchedossier ORDER by id_dossier asc"
    );
    res.json(alldossiers.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a dossier
root11.get("/recherchedossier/:id_dossier", async (req, res) => {
  try {
    const { id_dossier } = req.params;
    const dossier = await pool.query(
      "SELECT * FROM recherchedossier WHERE id_dossier=$1",
      [id_dossier]
    );
    res.json(dossier.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update a dossier
root11.post("/recherchedossier/update", async (req, res) => {
  try {
    const { id_dossier } = req.body;
    const {
      num_affaire,
      emplacement,
      client,
      tel,
      mission,
      adversaire,
      reste,
    } = req.body;
    const updatedossier = await pool.query(
      "UPDATE recherchedossier SET num_affaire=$1,emplacement=$2,client=$3,tel=$4,mission=$5,adversaire=$6,reste=$7 WHERE id_dossier=$8",
      [
        num_affaire,
        emplacement,
        client,
        tel,
        mission,
        adversaire,
        reste,
        id_dossier,
      ]
    );
    res.json("dossier updated");
  } catch (err) {
    console.error(err.message);
  }
});
//delete a dossier
root11.post("/recherchedossiereff", async (req, res) => {
  try {
    const { id_dossier } = req.body;
    const deletedossier = await pool.query(
      "DELETE FROM recherchedossier WHERE id_dossier=$1",
      [id_dossier]
    );
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = root11;
