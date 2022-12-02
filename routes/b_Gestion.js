const bodyParser = require("body-parser");
const express = require("express");
const root10 = express.Router();
const cors = require("cors");
const pool = require("../db");

//RouTES
// pour l'ajout
root10.post("/gestionclient", async(req, res) => {
    try {
        const {
            codecollaborateur,
            codeclient,
            raison,
            matricule,
            ville,
            rue,
            num,
            code_postale,
            activite,
            situation_fiscale,
            categorie,
            fax,
            email,
        } = req.body;

        const newTodo2 = await pool.query(
            "INSERT INTO gestionclient (raison,matricule,ville,rue,num,code_postale,activite,situation_fiscale,categorie,fax,email,codecollaborateur,codeclient) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ", //nahit on conflict khater ken yajouti meme id maykblsh haka wala haka
            [
                raison,
                matricule,
                ville,
                rue,
                num,
                code_postale,
                activite,
                situation_fiscale,
                categorie,
                fax,
                email,
                codecollaborateur,
                codeclient,
            ]
        );
        res.json(newTodo2);
    } catch (err) {
        console.error(err.message);
    }
});
//pour la modification
root10.post("/gestionclient/modif", async(req, res) => {
    try {
        const {
            id,
            raison,
            matricule,
            ville,
            rue,
            num,
            code_postale,
            activite,
            situation_fiscale,
            categorie,
            fax,
            email,
            codecollaborateur,
            codeclient,
        } = req.body;

        const newTodo2 = await pool.query(
            "UPDATE gestionclient SET codecollaborateur=$2,codeclient=$3,raison=$4,matricule=$5,ville=$6,rue=$7,num=$8,code_postale=$9,activite=$10,situation_fiscale=$11,categorie=$12,fax=$13,email=$14   WHERE id=$1  ", [
                id,
                codecollaborateur,
                codeclient,
                raison,
                matricule,
                ville,
                rue,
                num,
                code_postale,
                activite,
                situation_fiscale,
                categorie,
                fax,
                email,
            ]
        );
        res.json(newTodo2);
    } catch (err) {
        console.error(err.message);
    }
});
//selection
root10.get("/gestionclient", async(req, res) => {
    try {
        const newTodo = await pool.query(
            " SELECT * FROM gestionclient ORDER by id asc"
        );
        res.json(newTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
    // pour la suppression
    root10.post("/gestionclient/delete", async(req, res) => {
        try {
            const { id } = req.body;
            const newTodo1 = await pool.query(
                " DELETE FROM gestionclient WHERE id=$1", [id]
            );
            res.json(newTodo1);
        } catch (err) {
            console.error(err.message);
        }
    });
});

module.exports = root10;