const bodyParser = require("body-parser");

const express = require("express");
const root1 = express.Router();

const cors = require("cors");
const pool = require("../db");

//middleware

//RouTES
//create a todo
root1.post("/parametreglobale", async (req, res) => {
  try {
    const { timbrefiscale, tauxtva } = req.body;

    const newTodo1 = await pool.query(
      "INSERT INTO public.parametreglobale ( timbrefiscale,tauxtva ) VALUES($1,$2)",
      [timbrefiscale, tauxtva]
    );
    res.json(newTodo1);
  } catch (err) {
    console.error(err.message);
  }
});
//select
root1.get("/parametreglobale", async (req, res) => {
  try {
    const newTodo = await pool.query(
      "SELECT * FROM parametreglobale  ORDER by id asc "
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//pour la modification
root1.post("/parametreglobale/modif", async (req, res) => {
  try {
    const { timbrefiscale, tauxtva, id } = req.body;

    const newTodo2 = await pool.query(
      "UPDATE parametreglobale SET timbrefiscale=$1,tauxtva=$2 where id=$3",
      [timbrefiscale, tauxtva, id]
    );
    res.json(newTodo2);
  } catch (err) {
    console.error(err.message);
  }
});
root1.post("/Parametreenextra/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const deleteParametre = await pool.query(
      "DELETE FROM parametreglobale WHERE id=$1",
      [id]
    );
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = root1;
