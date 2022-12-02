/* This example requires Tailwind CSS v2.0+ */
//pour modifier le
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { PhotographIcon } from "@heroicons/react/outline";
const Timbre = () => {
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingTimbre, setEdditingTimbre] = useState(null);
  const [addingTimbre, setAddingTimbre] = useState({
    libelle: "",

    montant: 0,
  });

  const columns = [
    
    { key: "2", title: "Libelle", dataIndex: "libelle" },

    { key: "3", title: "Montant", dataIndex: "montant" },
    {
      key: "4",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editTimbre(record);
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
                  deleteTimbre(record);
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

  //select Timbre
  const getTimbrerequest = async () => {
    try {
      const response = await axios.get("/timbre");
      setlisteservice(response.data); // aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTimbrerequest();
  }, [listeservice]);
 

  //supprimer une Timbre
  const deleteTimbre = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce timbre ?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (Timbre) => Timbre.id !== record.id
        );
        setlisteservice(newlisteservice);
        deleteTimbrerequest(record.id);
        toast.success("Timbre supprimé avec succès");
      },
    });
  };
  const deleteTimbrerequest = async (id) => {
    try {
      const deleted = await axios.post("/timbre/delete", {
        id:id,
      });
      console.log("Timbre supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////
  //modifier une Timbre
  const editTimbre = (record) => {
    setIsEdit(true);
    setEdditingTimbre({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingTimbre(null);
  };
  //lien aveclback pour la modif
  const editTimbrerequest = async (edditingTimbre) => {
    try {
      console.log(edditingTimbre)
      const modified = await axios.post("/timbre/modif", edditingTimbre);
      console.log("Timbre modifié");
    } catch (error) {
      console.log('aaaaaaaaaaaaaaaaggg',error);
    }
  };
  ///////////////////// Ajout
  //lien aveclback pour l'ajout
  const [isAdd, setIsAdd] = useState(false);

  const addTimbre = async () => {
    try {
      const resp = await axios.post("/timbre", addingTimbre);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
      <h1>Timbres</h1> 
      <PhotographIcon className="dashbicons"></PhotographIcon>
        <button className="btnadd"  onClick={() => {
            setIsAdd(true);
          }}
        >
          {" "}
          Ajouter
        </button>
        <div classname="tab">
          <Table
            columns={columns}
            dataSource={listeservice}
            style={{ with: 15 }}
            bordered={true}
          />
        </div>
        {/*MODIFICATION*/}
        <Modal
          title="modifier Timbre"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Timbre) => {
              if (Timbre.id === edditingTimbre.id) {
                return edditingTimbre;
              } else {
                return Timbre;
              }
            });
            setlisteservice(newlisteservice);
            editTimbrerequest(edditingTimbre);
            resetEditing();
            toast.success("Timbre modifie avec succée");
          }}
        >
          <Input
            placeholder="libelle"
            value={edditingTimbre?.libelle}
            onChange={(e) => {
              setEdditingTimbre({
                ...edditingTimbre,
                libelle: e.target.value,
              });
            }}
          ></Input>

          <Input
            placeholder="Montant"
            value={edditingTimbre?.montant}
            onChange={(e) => {
              setEdditingTimbre({ ...edditingTimbre, montant: e.target.value });
              console.log('aaaaaaaa',edditingTimbre)}}
            
          ></Input>

          {/*AJOUT*/}
        </Modal>
        <Modal
          title="ajouter "
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            addTimbre();
            setIsAdd(false);
            toast.success("Timbre ajouté avec succès");
          }}
        >
          <Input
            placeholder="libelle"
            value={addingTimbre.libelle}
            onChange={(e) => {
              setAddingTimbre({
                ...addingTimbre,
                libelle: e.target.value,
              });
            }}
          ></Input>

          <Input
            placeholder="montant"
            value={addingTimbre.montant}
            onChange={(e) => {
              setAddingTimbre({
                ...addingTimbre,
                montant: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};
export default Timbre;
