import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Pagination } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FcAcceptDatabase } from "react-icons/fc";
import styled from "styled-components";
import { MdPersonSearch } from "react-icons/md";
import { GoDiffAdded } from "react-icons/go";
axios.defaults.withCredentials = true;

const AjoutCollabo = () => {
  const [liste, setliste] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [addingCollab, setAddingCollab] = useState({
    username: "",
    cin: "",
    ville: "",
    rue: "",
    num: 0,
    codepostal: "",
    activite: "",
    tel: "",
    fax: "",
    email: "",
    matricule: "",
    methodepaiment: "",
    montant: 0,
    nbredossier: 0,
  });

  //select collaborateur
  const getCollabrequest = async () => {
    try {
      const response = await axios.get("/collab", {
        withCredentials: true,
      });

      if (response.data.error) {
        console.log("non connecté");
      } else {
        console.log(response);
        setliste(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCollabrequest();
  }, [liste]);
  //ajouter un collaborateur
  const addCollab = async () => {
    try {
      const resp = await axios.post("/collab", addingCollab);
      if (resp.data.error) {
        toast.error(resp.data.error);
      } else {
        console.log(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //notre page et son contenu
  return (
    <div className="back">
      <header className="App-header">
        <button
          className="ajouter"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          {" "}
          <div className="ajoutertrib">
            <GoDiffAdded className="addingtrib"></GoDiffAdded>
          </div>
        </button>

        <Modal
          title="Ajouter un collaborateur"
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            addCollab();
            setIsAdd(false);
            toast.success("collaborateur ajouté avec succès");
          }}
        >
          <Input
            placeholder="nom"
            value={addingCollab.username}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                username: e.target.value,
              });
            }}
          ></Input>
          {/*edditingCollab? s'il n'est pas null*/}
          <Input
            placeholder="cin"
            value={addingCollab.cin}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                cin: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="ville"
            value={addingCollab.ville}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                ville: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="rue"
            value={addingCollab.rue}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                rue: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="codepostal"
            value={addingCollab.codepostal}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                codepostal: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="activite"
            value={addingCollab.activite}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                activite: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="tel"
            value={addingCollab.tel}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                tel: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="fax"
            value={addingCollab.fax}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                fax: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="email"
            value={addingCollab.email}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                email: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="matricule"
            value={addingCollab.matricule}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                matricule: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="methode_paiment"
            value={addingCollab.methodepaiment}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                methodepaiment: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="montant"
            value={addingCollab.montant}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                montant: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="nombre_dossier"
            value={addingCollab.nbredossier}
            onChange={(e) => {
              setAddingCollab({
                ...addingCollab,
                nbredossier: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};
export default AjoutCollabo;
