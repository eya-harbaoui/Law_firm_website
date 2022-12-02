const bodyParser = require("body-parser");

const express = require("express");
const root7 = express.Router();

const cors = require("cors");
const pool = require("../db");
//ajout

root7.post("/typedossier", async (req, res) => {
  try {
    const { type_dossier } = req.body;

    const newTodo2 = await pool.query(
      " INSERT INTO public.typedossier (type_dossier) VALUES ($1) ",
      [type_dossier]
    );
    res.json(newTodo2);
  } catch (err) {
    console.error(err.message);
  }
});
//modif
root7.post("/typedossier/modif", async (req, res) => {
  try {
    const { id, type_dossier } = req.body;

    const newTodo2 = await pool.query(
      "UPDATE typedossier SET type_dossier=$2 WHERE id=$1",
      [id, type_dossier]
    );
    res.json(newTodo2);
  } catch (err) {
    console.error(err.message);
  }
});
//select
root7.get("/typedossier", async (req, res) => {
  try {
    const newTodo = await pool.query(
      " SELECT * FROM typedossier ORDER by id asc"
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// pour la suppression
root7.post("/typedossier/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const newTodo1 = await pool.query(
      "DELETE FROM public.typedossier WHERE id=$1",
      [id]
    );
    res.json(newTodo1);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = root7;
