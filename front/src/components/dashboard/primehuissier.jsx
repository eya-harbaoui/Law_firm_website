import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { toast } from "react-toastify";
const PrimeHuissier = () => {
  //declaration necessaires
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingprime, setEdditingprime] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingprime, setAddingprime] = useState({
    libelle: "",
    montant: "",
    dessociable: "",
    impot: "",
    mensuel: "",
  });
  const column = [
    { key: "1", title: "ID", dataIndex: "id" },
    { key: "2", title: "libelle", dataIndex: "libelle" },
    { key: "3", title: "montant", dataIndex: "montant" },
    { key: "4", title: "dessociable", dataIndex: "dessociable" },
    { key: "5", title: "impot", dataIndex: "impot" },
    { key: "6", title: "mensuel", dataIndex: "mensuel" },
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
                  editprime(record);
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
                  deleteprime(record);
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

  //select primehuissier
  const getprimerequest = async () => {
    try {
      const response = await axios.get("/primehuissier");
      setlisteservice(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getprimerequest();
  });
  console.log(listeservice);

  //supprimer primehuissier
  const deleteprime = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce prime huissier?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (prime) => prime.id !== record.id
        );
        setlisteservice(newlisteservice);
        deleteprimerequest(record.id);
        toast.success("prime huissier supprimé avec succès");
      },
    });
  };
  const deleteprimerequest = async (id) => {
    try {
      const deleted = await axios.post("/primehuissiereff", {
        id: id,
      });
      console.log("prime supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un primehuissier
  const editprime = (record) => {
    setIsEdit(true);
    setEdditingprime({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingprime(null);
  };
  //ajouter primehuissier
  const addprime = async () => {
    try {
      const resp = await axios.post("/primehuissieradd", addingprime);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Prime huissier</h1>
        <FaUserTie className="dashbicons"></FaUserTie>
        <button
          className="btnadd"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          Ajouter Primehuissier
        </button>
        <div className="tab">
          <Table
            columns={column}
            dataSource={listeservice}
            size="medium"
            bordered={true}
          ></Table>
        </div>

        <Modal
          title="modifier prime huissier"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={async () => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((prime) => {
              if (prime.id == edditingprime.id) {
                return edditingprime;
              } else {
                return prime;
              }
            });
            try {
              const addprime = await axios.post(
                "/primehuissier/update",
                edditingprime
              );
            } catch (error) {
              console.log("error");
            }
            setlisteservice(newlisteservice);
            resetEditing();
            toast.success("primehuissier modifié avec succès");
          }}
        >
          <Input
            placeholder="Tapez le libelle"
            value={edditingprime?.libelle}
            onChange={(e) => {
              setEdditingprime({
                ...edditingprime,
                libelle: e.target.value,
              });
            }}
          ></Input>
          {/*edditingprime? s'il n'est pas null*/}
          <Input
            placeholder="Tapez le Montant"
            value={edditingprime?.montant}
            onChange={(e) => {
              setEdditingprime({ ...edditingprime, montant: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="Confirmez le dessociable ?"
            value={edditingprime?.dessociable}
            onChange={(e) => {
              setEdditingprime({
                ...edditingprime,
                dessociable: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Confimez l'impot ?"
            value={edditingprime?.impot}
            onChange={(e) => {
              setEdditingprime({ ...edditingprime, impot: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="Confirmez le Mensuel"
            value={edditingprime?.mensuel}
            onChange={(e) => {
              setEdditingprime({ ...edditingprime, mensuel: e.target.value });
            }}
          ></Input>
        </Modal>
        <Modal
          title="ajouter prime huissier"
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          destroyOnClose={true}
          onCancel={() => {
            setIsAdd(false);
            setAddingprime({
              libelle: "",
              montant: "",
              dessociable: "",
              impot: "",
              mensuel: "",
            });
          }}
          onOk={() => {
            addprime();
            setIsAdd(false);
            toast.success("Primehuissier ajoutée avec succès");
            setAddingprime({
              libelle: "",
              montant: "",
              dessociable: "",
              impot: "",
              mensuel: "",
            });
          }}
        >
          <Input
            placeholder="tapez le libellé"
            value={addingprime.libelle}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                libelle: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Tapez le Montant"
            value={addingprime.montant}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                montant: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Confirmez le dessociable ? Tapez Oui ou Non"
            value={addingprime.dessociable}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                dessociable: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Confirmez l'impot ?  Tapez Oui ou Non"
            value={addingprime.impot}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                impot: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Confirmez le Mensuel ? Tapez Oui ou Non"
            value={addingprime.mensuel}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                mensuel: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};

export default PrimeHuissier;
