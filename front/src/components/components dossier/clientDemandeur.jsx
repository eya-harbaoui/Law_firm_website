import { Cascader, Input, Radio, Button, Popover } from "antd";
import React, { useState, useMemo } from "react";
import "./dossier.css";
import { Marginer } from "../marginer/marginfile";
import TabClient from "./tabclientdemandeur";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const ClientDemandeur = () => {
  const [value, setValue] = useState(1);
  const [listeClient, setListeClient] = useState([]);
  const [id_dossier, setId_dossier] = useState(0);
  const [liste, setListe] = useState([]);
  const [donnee, setDonnee] = useState({
    matricule: "",
    raison: "",
    num: "",
    activité: "",
    categorie: "",
    situation_fiscale: "",
    checkassuj: false,
    checknonassuj: false,
    checkexono: false,
  });

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  const getclientrequest = async () => {
    try {
      const response = await axios.get("/gestionclient");
      console.log(response.data);

      setListeClient(response.data);
      const newliste = listeClient.map((client) => ({
        value: client.id,
        label: client.codeclient,
      }));
      setListe(newliste);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getclientrequest();
    if (id_dossier !== 0) {
      localStorage.setItem("id_dossier", id_dossier);
    }
    console.log("ena check", donnee);
  });

  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    listeClient.map((ser) => {
      if (ser.codeclient === selectedOptions[0].label) {
        setDonnee({
          matricule: ser.matricule,
          raison: ser.raison,
          categorie: ser.categorie,
          num: ser.num,
          activité: ser.activite,
          situation_fiscale: ser.situation_fiscale,
          checkassuj:
            ser.situation_fiscale === "Asujetti" ||
            ser.situation_fiscale === "assujeti"
              ? true
              : false,
          checknonassuj:
            ser.situation_fiscale === "non Assujetti" ? true : false,
          checkexono: ser.situation_fiscale === "Exonoré" ? true : false,
        });
      }
    });

    console.log("donnee", donnee);
    console.log("hellooo", donnee.situation_fiscale);

    /*if(donnee.situation_fiscale == "Assujetti" ){
      setIschecked(true,false,false);
    }
     if (donnee.situation_fiscale == "non Assujetti") {
         setIschecked(false, true, false);
         console.log("checkedassuj")
       }
    if (donnee.situation_fiscale == "Exonoré") {
      setIschecked(false, false, true);
    }
          console.log(ischecked,"checkbox")*/
  };

  const addclientdossier = async () => {
    try {
      const resp = await axios.post("/clientdossieradd", donnee);
      //console.log(resp, "dataaaaaaaa");
      if (resp.data.error) {
        toast.error(resp.data.error);
      } else {
        setId_dossier(resp.data.id_dossier);
        toast.success("Données du client validées avec succés");
      }

      //console.log("ena id", typeof id_dossier, id_dossier);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: "1.3rem", color: "#0583f2" }}>
        Client et Demandeur
      </h1>
      <Popover
        placement="bottom"
        content={
          <div>
            <Link to="/home/collaborateurs">
              <h1 style={{ fontSize: "15px", color: "#f25e5e" }}>
                Voulez vous ajouter un client qui n'existe pas ?
              </h1>
            </Link>
          </div>
        }
        trigger="hover"
      >
        <FaUserPlus
          className="addclientdem"
          style={{ cursor: "crosshair" }}
        ></FaUserPlus>
      </Popover>
      <div className="reglementdiv1">
        <div className="div">
          <label>Code client :</label>

          <Cascader
            className="cascader1"
            options={liste}
            onChange={onChange}
            placeholder="selectionner code client"
            showSearch={{
              filter,
            }}
            onSearch={(value) => {
              console.log(value);
            }}
            changeOnSelect={true}
          />
        </div>

        <div className="div">
          <label htmlFor="cin">Matricule Fiscale/CIN :</label>

          <Input
            type="text"
            className="input"
            placeholder="CIN"
            value={donnee.matricule}
          />
        </div>
      </div>
      <div className="reglementdiv2">
        <div className="div">
          <label htmlFor="raisonsociale">Raison Sociale/Nom :</label>

          <Input
            type="text"
            placeholder="Raison Sociale"
            value={donnee.raison}
          />
        </div>

        <div className="div">
          <label>Situation Fiscale :</label>
          <div className="radioet">
            <Radio checked={donnee.checkassuj} value="1">
              Assujetie
            </Radio>
            <Radio checked={donnee.checknonassuj} value="2">
              Non Assujetie
            </Radio>
            <Radio checked={donnee.checkexono} value="3">
              exonoré
            </Radio>
          </div>
        </div>
      </div>
      <div className="reglementdiv3">
        <div className="div">
          <label>Activité Contribuale : </label>

          <Input
            type="text"
            placeholder="Activité Contribuale"
            value={donnee.activité}
          />
        </div>

        <div className="div">
          <label htmlFor="typeclient"> Type Client :</label>

          <Input
            type="text"
            placeholder="type client"
            value={donnee.categorie}
          />
        </div>
      </div>
      <div className="reglementdiv4">
        <div className="div">
          <label>Tel :</label>
          <Input
            type="number"
            className="inputraison"
            placeholder="Numéro de tel"
            value={donnee.num}
          />
        </div>
      </div>

      <Marginer direction="vertical" margin={20} />

      <button className="buttonvalidate" onClick={addclientdossier}>
        Valider Dossier
      </button>
      <TabClient />
    </div>
  );
};

export default ClientDemandeur;
