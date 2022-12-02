const express = require("express");
const route = express.Router();
const pool = require("../db");
const bodyParser = require("body-parser");
route.post("/collab", (req, res) => {
    const {
        username,
        cin,
        ville,
        rue,
        num,
        codepostal,
        activite,
        tel,
        fax,
        email,
        matricule,
        methodepaiment,
        montant,
        nbredossier,
    } = req.body;
    pool.query(
        "INSERT INTO collaboratortable(username,cin,ville,rue,num,codepostal,activite,tel,fax,email,matricule,methodepaiment,montant,nbredossier) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)", [
            username,
            cin,
            ville,
            rue,
            num,
            codepostal,
            activite,
            tel,
            fax,
            email,
            matricule,
            methodepaiment,
            montant,
            nbredossier,
        ],
        (error, result) => {
            if (error) {
                console.log(error.message);
            } else {
                res.send("success");
            }
        }
    );
});

route.post("/delete", (req, res) => {
    const { id } = req.body;
    pool.query(
        "DELETE FROM collaboratortable WHERE id=$1", [id],
        (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json("collaborator was deleted");
            }
        }
    );
});

route.post("/modif", (req, res) => {
    const {
        id,
        username,
        cin,
        ville,
        rue,
        num,
        codepostal,
        activite,
        tel,
        fax,
        email,
        matricule,
        methodepaiment,
        montant,
        nbredossier,
    } = req.body;
    pool.query(
        "UPDATE collaboratortable SET username=$2,cin=$3,ville=$4,rue=$5,num=$6,codepostal=$7,activite=$8,tel=$9,fax=$10,email=$11,matricule=$12,methodepaiment=$13,montant=$14,nbredossier=$15 WHERE id=$1", [
            id,
            username,
            cin,
            ville,
            rue,
            num,
            codepostal,
            activite,
            tel,
            fax,
            email,
            matricule,
            methodepaiment,
            montant,
            nbredossier,
        ],
        (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.json("collaborator modified");
            }
        }
    );
});

route.get("/collab", (req, res) => {
    pool.query(
      "SELECT * FROM collaboratortable ORDER by id asc",
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.json(result.rows);
        }
      }
    );
});

module.exports = route;