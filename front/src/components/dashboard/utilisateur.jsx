import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { BiUserPin } from "react-icons/bi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Utilisateur = () => {
  //declaration necessaires
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingutilisateur, setEdditingutilisateur] = useState({
    login: "",
    mdp: "",
    domaine: "",
  });
  const [isAdd, setIsAdd] = useState(false);
  const [addingutilisateur, setAddingutilisateur] = useState({
    login: "",
    mdp: "",
    domaine: "",
  });
  const column = [
    { key: "1", title: "login", dataIndex: "login" },
    { key: "2", title: "mdp", dataIndex: "mdp" },
    { key: "3", title: "domaine", dataIndex: "domaine" },
    {
      key: "16",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editutilisateur(record);
                }}></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deleteutilisateur(record);
                }}></MdDeleteForever>
              <pre>
                <p>supprimer</p>
              </pre>
            </div>
          </div>
        );
      },
    },
  ];

  //select utilisateur
  const getutilisateurrequest = async () => {
    try {
      const response = await axios.get("/utilisateur");
      setlisteservice(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getutilisateurrequest();
  });
  console.log(listeservice);

  //suprimer utilisateur
  const deleteutilisateur = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer cet utilisateur ?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (utilisateur) => utilisateur.login !== record.login
        );
        setlisteservice(newlisteservice);
        deleteutilisateurrequest(record.login);
        toast.success("utilisateur supprimé avec succès");
      },
    });
  };
  const deleteutilisateurrequest = async (login) => {
    try {
      const deleted = await axios.post("/utilisateureff", {
        login: login,
      });
      console.log("utlisateur supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un utilisateur
  const editutilisateur = (record) => {
    setIsEdit(true);
    setEdditingutilisateur({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingutilisateur(null);
  };
  //ajouter utilisateur
  const addutilisateur = async () => {
    try {
      const resp = await axios.post("/utilisateuradd", addingutilisateur);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1> Utilisateurs</h1>
        <BiUserPin className="dashbicons"></BiUserPin>
        <button
          className="btnadd"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          Ajouter Utilisateur
        </button>
        <div className="tab">
          <Table
            columns={column}
            dataSource={listeservice}
            size="small"
            bordered={true}
          ></Table>
        </div>

        <Modal
          title="modifier utilisateur"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={async () => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((utilisateur) => {
              if (utilisateur.login === edditingutilisateur.login) {
                return edditingutilisateur;
              } else {
                return utilisateur;
              }
            });
            try {
              const addutilisateur = await axios.post(
                "/utilisateur/update",
                edditingutilisateur
              );
            } catch (error) {
              console.log("error");
            }
            setlisteservice(newlisteservice);
            resetEditing();
            toast.success("utilisateur modifié avec succès");
          }}
        >
          <Input
            placeholder="Tapez le Nom d'utilisateur"
            value={edditingutilisateur?.login}
            onChange={(e) => {
              setEdditingutilisateur({
                ...edditingutilisateur,
                login: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Tapez le Mot de passe de l'utilisateur ajouté"
            value={edditingutilisateur?.mdp}
            onChange={(e) => {
              setEdditingutilisateur({
                ...edditingutilisateur,
                mdp: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="tapez le domaine d'utilisation"
            value={edditingutilisateur?.domaine}
            onChange={(e) => {
              setEdditingutilisateur({
                ...edditingutilisateur,
                domaine: e.target.value,
              });
            }}
          ></Input>
        </Modal>
        <Modal
          title="ajouter utilisateur"
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            addutilisateur();
            setIsAdd(false);
            toast.success("utilisateur ajoutée avec succès");
          }}
        >
          <Input
            placeholder="tapez le nom d'utilisateur"
            value={addingutilisateur.login}
            onChange={(e) => {
              setAddingutilisateur({
                ...addingutilisateur,
                login: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Tapez le Mot de passe"
            value={addingutilisateur.mdp}
            onChange={(e) => {
              setAddingutilisateur({
                ...addingutilisateur,
                mdp: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Tapez le domaine d'utilisation de l'utilisateur "
            value={addingutilisateur.domaine}
            onChange={(e) => {
              setAddingutilisateur({
                ...addingutilisateur,
                domaine: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};

export default Utilisateur;
