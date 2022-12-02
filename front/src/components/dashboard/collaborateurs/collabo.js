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
import { HiUserGroup } from "react-icons/hi";

axios.defaults.withCredentials = true;

export const Collabo = () => {
  //declaration necessaires
  /*const refreshToken = async () => {
    try {
      const res = await axios.get("http:///refresh", {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };*/
  const [liste, setliste] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [edditingCollab, setEdditingCollab] = useState({
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
  const [isAdd, setIsAdd] = useState(false);
  /*const StyledTable = styled((props) => <Table {...props} />)`
    && tbody > tr:hover > td {
      background: rgb(200, 182, 226,0.2);
    }
  `;*/
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

  const column = [
    { key: "1", title: "ID", dataIndex: "id" },
    {
      key: "2",
      title: "nom",
      dataIndex: "username",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <React.Fragment>
            <Input
              autoFocus
              placeholder="chercher un collaborateur"
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              value={selectedKeys[0]}
            ></Input>
            <div className="searchdiv">
              <button
                onClick={() => {
                  confirm();
                }}
                className="btnsearch"
              >
                chercher
              </button>
              <button
                onClick={() => {
                  clearFilters();
                }}
                className="btnsearch"
              >
                réinitialiser
              </button>
            </div>
          </React.Fragment>
        );
      },
      filterIcon: () => {
        return <MdPersonSearch className="searchicon"></MdPersonSearch>;
      },
      onFilter: (value, record) => {
        return record.username.toLowerCase().includes(value.toLowerCase()); //La méthode includes() détermine si une chaîne de caractères est contenue dans une autre et renvoie true ou false selon le cas de figure
      },
    },
    { key: "3", title: "cin", dataIndex: "cin" },
    { key: "4", title: "ville", dataIndex: "ville" },
    { key: "5", title: "rue", dataIndex: "rue" },
    { key: "6", title: "num", dataIndex: "num" },
    { key: "7", title: "code_postal", dataIndex: "codepostal" },
    { key: "8", title: "activité", dataIndex: "activite" },
    { key: "9", title: "tel", dataIndex: "tel" },
    { key: "10", title: "fax", dataIndex: "fax" },
    { key: "11", title: "email", dataIndex: "email" },
    { key: "12", title: "matricule", dataIndex: "matricule" },
    { key: "13", title: "methode_paiment", dataIndex: "methodepaiment" },
    { key: "14", title: "montant", dataIndex: "montant" },
    { key: "15", title: "nombre_dossier", dataIndex: "nbredossier" },
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
                  editCollab(record);
                }}
              ></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deleteCollab(record);
                }}
              ></MdDeleteForever>

              <pre>
                <p>supprimer</p>
              </pre>
            </div>
          </div>
        );
      },
    },
  ];

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

  //supprimer collaborateur
  const deleteCollab = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce collaborateur?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newliste = liste.filter((collab) => collab.id !== record.id);
        setliste(newliste);
        deleteCollabrequest(record.id);
      },
    });
  };
  const deleteCollabrequest = async (id) => {
    try {
      const deleted = await axios.post("/delete", {
        id: id,
      });

      if (deleted.data.error) {
        toast.error(deleted.data.error);
      } else {
        console.log("collaborateur supprimé");
        toast.success("collaborateur supprimé avec succès");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un collaborateur

  const editCollab = (record) => {
    setIsEdit(true);
    setEdditingCollab({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingCollab(null);
  };
  //ajouter un collaborateur
  const addCollab = async () => {
    try {
      const resp = await axios.post(
        "/collab",
        addingCollab
      );
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
        <h1>Collaborateurs</h1>
        <HiUserGroup className="dashbicons"></HiUserGroup>
        <button
          className="btnadd"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          Ajouter un Collaborateur
        </button>

        <Table
          columns={column}
          dataSource={liste}
          //scroll={{ x:10}}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          size="middle"
          bordered={true}
          scroll={{ x: "max-content" }}
        ></Table>

        <Modal
          title="modifier collaborateur"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onRequestClose={() => {
            setIsEdit(false);
          }}
          onOk={async () => {
            setIsEdit(false);

            const newliste = liste.map((collab) => {
              if (collab.id == edditingCollab.id) {
                return edditingCollab;
              } else {
                return collab;
              }
            });
            try {
              const resp = await axios.post("/modif", edditingCollab);
            } catch (error) {
              console.log(error);
            }

            setliste(newliste);

            resetEditing();

            toast.success("collaborateur modifie avec succee");
          }}
        >
          <Input
            placeholder="changer le nom"
            value={edditingCollab?.username}
            onChange={(e) => {
              setEdditingCollab({
                ...edditingCollab,
                username: e.target.value,
              });
            }}
          ></Input>
          {/*edditingCollab? s'il n'est pas null*/}
          <Input
            placeholder="changer le cin"
            value={edditingCollab?.cin}
            onChange={(e) => {
              setEdditingCollab({ ...edditingCollab, cin: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="changer la ville"
            value={edditingCollab?.ville}
            onChange={(e) => {
              setEdditingCollab({ ...edditingCollab, ville: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="changer la rue"
            value={edditingCollab?.rue}
            onChange={(e) => {
              setEdditingCollab({ ...edditingCollab, rue: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="changer le num"
            value={edditingCollab?.num}
            onChange={(e) => {
              setEdditingCollab({ ...edditingCollab, num: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="changer le codepostal"
            value={edditingCollab?.codepostal}
            onChange={(e) => {
              setEdditingCollab({
                ...edditingCollab,
                codepostal: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="changer l'activité"
            value={edditingCollab?.activite}
            onChange={(e) => {
              setEdditingCollab({
                ...edditingCollab,
                activite: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="changer le tel"
            value={edditingCollab?.tel}
            onChange={(e) => {
              setEdditingCollab({ ...edditingCollab, tel: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="changer le fax"
            value={edditingCollab?.fax}
            onChange={(e) => {
              setEdditingCollab({ ...edditingCollab, fax: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="changer l'email"
            value={edditingCollab?.email}
            onChange={(e) => {
              setEdditingCollab({ ...edditingCollab, email: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="changer la matricule"
            value={edditingCollab?.matricule}
            onChange={(e) => {
              setEdditingCollab({
                ...edditingCollab,
                matricule: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="changer la methode de paiement"
            value={edditingCollab?.methodepaiment}
            onChange={(e) => {
              setEdditingCollab({
                ...edditingCollab,
                methodepaiment: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="changer le montant"
            value={edditingCollab?.montant}
            onChange={(e) => {
              setEdditingCollab({
                ...edditingCollab,
                montant: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="changer le nombre de dossier"
            value={edditingCollab?.nbredossier}
            onChange={(e) => {
              setEdditingCollab({
                ...edditingCollab,
                nbredossier: e.target.value,
              });
            }}
          ></Input>
        </Modal>
        <Modal
          title="ajouter un collaborateur"
          visible={isAdd}
          okText="Enregistrer"
          destroyOnClose={true}
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
            setAddingCollab({
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
          }}
          onOk={() => {
            addCollab();
            setIsAdd(false);
            toast.success("collaborateur ajouté avec succès");
            setAddingCollab({
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
