const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const pool = require("../db");
require("dotenv").config();
//bch nasnaa token



var keyaccesstoken = process.env.ACCESS_TOKEN_SECRET;

route.post("/login", (req, res) => {
    const { username, password } = req.body;
    pool.query(
        "SELECT * FROM clienttable WHERE username=$1", [username],
        (err, result) => {
            if (err) {
                throw err;
            }
            if (result.rows.length > 0) {
                console.log(result.rows[0]);

                bcrypt.compare(password, result.rows[0].password, (error, match) => {
                    console.log(match);

                    if (match) {
                        console.log("matching");

                        const accessToken = jwt.sign({
                                id: result.rows[0].id,
                            },
                            keyaccesstoken
                        );
                        console.log("token generated after logging in", accessToken);
                        //payload heya data nheb ena nkhazenha eli heya parametre lowel mtaa el sign

                        res
                            .cookie("token", accessToken, {
                                httpOnly: true,
                                //secure: true,
                                sameSite: "lax",
                            })
                            .send();

                        //res.json({ message: "Successufully logged in", accessToken });
                    } else {
                        res.json({ error: "mot de passe incorrecte" });
                    }
                });
            } else {
                res.json({ error: " cet utilisateur n'existe pas " });
            }
        }
    );
});
route.get("/logout", (req, res) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            //secure: true,
            sameSite: "lax",
        })
        .send();
});

route.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
            return res.json(false);
        }

        jwt.verify(token, keyaccesstoken);

        res.send(true);
    } catch (err) {
        res.json(false);
    }
});



module.exports = route;