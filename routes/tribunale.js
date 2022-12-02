const express = require("express");
const route = express.Router();

const pool = require("../db");
const bodyParser = require("body-parser");
const { validateToken } = require("../middlewares/AuthMiddleWare");
route.post("/ajouterTribunale", (req, res) => {
  const { lieu } = req.body;
  pool.query(
    "INSERT INTO tribunaletable (lieu) VALUES($1)",
    [lieu],
    (error, result) => {
      if (error) {
        console.log(error.message);
      } else {
        res.send("success");
      }
    }
  );
});

route.post("/deleteTribunale", (req, res) => {
  const { id } = req.body;
  pool.query(
    "DELETE FROM tribunaletable WHERE id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.json("tribunale supprimée");
      }
    }
  );
});

route.post("/modifierTribunale", (req, res) => {
  const { id, lieu } = req.body;
  pool.query(
    "UPDATE tribunaletable SET lieu=$1 WHERE id=$2",
    [lieu, id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.json("tribunale modifiée");
      }
    }
  );
});

route.get("/tribunale", (req, res) => {
  pool.query("SELECT * FROM tribunaletable ORDER BY id", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.json(result.rows);
    }
  });
});

//services
route.get("/service", (req, res) => {
  pool.query(
    "SELECT * FROM servicetable ORDER by service_id asc",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.json(result.rows);
      }
    }
  );
});
route.post("/serviceadd", (req, res) => {
  const { nom, tribunale_id, lundi, mardi, mercredi, jeudi, vendredi, samedi } =
    req.body;
  pool.query(
    "INSERT INTO servicetable (nom,tribunale_id,lundi,mardi,mercredi,jeudi,vendredi,samedi) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
    [nom, tribunale_id, lundi, mardi, mercredi, jeudi, vendredi, samedi],
    (error, result) => {
      if (error) {
        console.log(error.message);
      } else {
        res.send("success");
      }
    }
  );
});

route.post("/serviceeff", (req, res) => {
  const { id } = req.body;
  pool.query(
    "DELETE FROM servicetable WHERE service_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.json("service supprimée");
      }
    }
  );
});

route.post("/updateservice", (req, res) => {
  const {
    service_id,
    tribunale_id,
    nom,
    lundi,
    mardi,
    mercredi,
    jeudi,
    vendredi,
    samedi,
  } = req.body;
  pool.query(
    "UPDATE servicetable SET nom=$1,lundi=$2,mardi=$3,mercredi=$4,jeudi=$5,vendredi=$6,samedi=$7,tribunale_id=$8 WHERE service_id=$9 ",
    [
      nom,
      lundi,
      mardi,
      mercredi,
      jeudi,
      vendredi,
      samedi,
      tribunale_id,
      service_id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.json("service modifiée");
      }
    }
  );
});

route.get("/tribunale", (req, res) => {
  pool.query(
    "SELECT * FROM tribunaletable ORDER by id asc",
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
