import React from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import Navbar from "./navhome";
import "./nav.css";
import image from "./backgroundavocat.jpg";
import image1 from "./avocatimage1.png";
import image2 from "./avocatimage2.png";
import image3 from "./avocatimage3.png";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

import { FcFinePrint, FcBusinessman, FcSalesPerformance } from "react-icons/fc";
let firstRender = true;
axios.defaults.withCredentials = true;

function Home() {
  const { loggedIn } = useContext(AuthContext);
  const gridStyle = {
    width: "200",
    height: "1000",

    textAlign: "center",
  };
  let navigate = useNavigate();
  /* const sendLogout = async() =>{
    const res = await axios.post("/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("unable to logout");

  }
  const handleLogout = ()=>{
    sendLogout();
    

  }*/

  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar></Navbar>
      <div className="divcontainerhome">
        <div className="divhome">
          <div className="imgbackground">
            <img src={image} alt="image" />
          </div>
          <div className="hellotext">
            <h1>Bienvenue dans notre site web !</h1>
            <p>Le meilleur espace pour gérer votre cabinet d'avocat</p>
          </div>
        </div>
        <div className="titrecards">
          <h1>Gérer votre activité d'une manière efficace</h1>
          <p></p>
        </div>
        <div className="divcards">
          <div className="site-card-wrapper" id="about">
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false} hoverable={true} className="cardclass">
                  <div className="cardcontainer">
                    <h1>Gestion des clients</h1>
                    <FcBusinessman className="logocard"></FcBusinessman>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} hoverable={true} className="cardclass">
                  <div className="cardcontainer">
                    <h1>Gestion des dossiers</h1>
                    <FcFinePrint className="logocard"></FcFinePrint>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} hoverable={true} className="cardclass">
                  <div className="cardcontainer">
                    <h1>Facturation</h1>
                    <FcSalesPerformance className="logocard"></FcSalesPerformance>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <div className="divphotos">
          <div className="divhome1">
            <div className="imgbackground3">
              <img src={image3} alt="image3" />
            </div>
            <div className="hellotext3">
              <h1>Gestion des clients</h1>
              <p>
                Une manière simple pour organiser et protéger les donnnées de
                vos clients
              </p>
            </div>
          </div>
          <div className="divhome1">
            <div className="imgbackground2">
              <img src={image2} alt="image2" />
            </div>
            <div className="hellotext2">
              <h1>Gestion des dossiers</h1>
              <p>Archiver,Ajouter et Modifier vos dossiers </p>
            </div>
          </div>
          <div className="divhome1">
            <div className="imgbackground1">
              <img src={image1} alt="image1" />
            </div>
            <div className="hellotext1" id="login">
              <h1>Pour commencer !</h1>
              <p>
                veuillez vous inscrire ou vous connectez si vous avez déjà un
                compte
              </p>
              <button
                className="loginfromhome"
                onClick={() => {
                  if (loggedIn === true) {
                    navigate("/home");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Se Connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
