const bodyParser = require("body-parser");

const express = require("express");
const root4 = express.Router();


const cors = require("cors");
const pool = require("../db")
//ajout
root4.post("/transport", async (req, res) => {
    try {
        const {montanttransportparjours} = req.body;
       

        const newTodo2 = await pool.query("INSERT INTO public.transport (montanttransportparjours) VALUES ($1)  ",
            [montanttransportparjours]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }})
//modif 
root4.post("/transport/modif", async (req, res) => {
    try {
        const {  montanttransportparjours  } = req.body;
       

        const newTodo2 = await pool.query("UPDATE transport SET montanttransportparjours= $1",
            [  montanttransportparjours  ]);
        res.json(newTodo2);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
root4.get("/transport", async (req, res) => {
    try {
        
        const newTodo = await pool.query("SELECT * FROM transport")
        res.json(newTodo.rows);
        

    }
    catch (err) {
        console.error(err.message);
    }
});
module.exports=root4;
