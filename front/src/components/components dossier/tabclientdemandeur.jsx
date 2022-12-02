import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Modal, Input, Button } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
const TabClient = () => {
  //declaration necessaires
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingclient, setEdditingclient] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingclient, setAddingclient] = useState({
    nom: "",
    cin: "",
    adresse: "",
    adressedesigne: "",
    tel: "",
    fax: "",
    email: "",
    id_dossier: 0,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const column = [
    { key: "1", title: "id_demandeur", dataIndex: "id_demandeur" },
    { key: "2", title: "id_dossier", dataIndex: "id_doss" },
    { key: "3", title: "nom", dataIndex: "nom" },
    { key: "4", title: "cin", dataIndex: "cin" },
    { key: "5", title: "adresse", dataIndex: "adresse" },
    { key: "6", title: "Adresse Désignée", dataIndex: "adressedesigne" },
    { key: "7", title: "tel", dataIndex: "tel" },
    { key: "8", title: "fax", dataIndex: "fax" },
    { key: "9", title: "email", dataIndex: "email" },
    {
      key: "10",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editclient(record);
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
                  deleteclient(record);
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

  //select client
  const getclientrequest = async () => {
    try {
      const response = await axios.get("/client");
      setlisteservice(response.data);
      console.log(response.data, "demandeur");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const id = localStorage.getItem("id_dossier");
    console.log(id, "ena el id eli bch netbaath");
    setAddingclient({ ...addingclient, id_dossier: id });
    getclientrequest();
  }, [listeservice, addingclient.id_dossier]);
  console.log(listeservice);

  //supclientr client
  const deleteclient = (record) => {
    Modal.confirm({
      title: "Vous etes sure de supprimer ce client?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (client) => client.id_demandeur !== record.id_demandeur
        );
        setlisteservice(newlisteservice);
        deleteclientrequest(record.id_demandeur);
        toast.success("demandeur supprimé avec succès");
      },
    });
  };
  const deleteclientrequest = async (id) => {
    try {
      const deleted = await axios.post("/clienteff", {
        id: id,
      });
      console.log("client supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un client
  const editclient = (record) => {
    setIsEdit(true);
    setEdditingclient({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingclient(null);
  };
  //ajouter client
  const addclient = async () => {
    try {
      const resp = await axios.post("/clientadd", addingclient);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="back">
      <header className="App-header">
        <div className="boutonet">
          <Button
            className="bouton"
            type="primary"
            block
            onClick={() => {
              setIsAdd(true);
            }}
          >
            Ajouter Demandeur
          </Button>
        </div>
        <Table
          columns={column}
          dataSource={listeservice}
          size="meduim"
          bordered={true}
          style={{ display: "flex", flex: 1 }}
          scroll={{ x: "max-content" }}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        ></Table>

        <Modal
          title="modifier client"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={async () => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((client) => {
              if (client.id_demandeur == edditingclient.id_demandeur) {
                return edditingclient;
              } else {
                return client;
              }
            });
            try {
              const addclient = await axios.post(
                "/client/update",
                edditingclient
              );
            } catch (error) {
              console.log("error");
            }
            setlisteservice(newlisteservice);
            resetEditing();
            toast.success("demandeur modifié avec succès");
          }}
        >
          <Input
            placeholder="nom du Client"
            value={edditingclient?.nom}
            onChange={(e) => {
              setEdditingclient({
                ...edditingclient,
                nom: e.target.value,
              });
            }}
          ></Input>
          {/*edditingclient? s'il n'est pas null*/}
          <Input
            placeholder="Tapez le cin"
            value={edditingclient?.cin}
            onChange={(e) => {
              setEdditingclient({ ...edditingclient, cin: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="Adresse "
            value={edditingclient?.adresse}
            onChange={(e) => {
              setEdditingclient({
                ...edditingclient,
                adresse: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Adresse Désignée"
            value={edditingclient?.adressedesigne}
            onChange={(e) => {
              setEdditingclient({
                ...edditingclient,
                adressedesigne: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Numéro de téléphone"
            value={edditingclient?.tel}
            onChange={(e) => {
              setEdditingclient({ ...edditingclient, tel: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="fax"
            value={edditingclient?.fax}
            onChange={(e) => {
              setEdditingclient({ ...edditingclient, fax: e.target.value });
            }}
          ></Input>
          <Input
            placeholder="email"
            value={edditingclient?.email}
            onChange={(e) => {
              setEdditingclient({ ...edditingclient, email: e.target.value });
            }}
          ></Input>
        </Modal>
        <Modal
          title="ajouter demandeur"
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          destroyOnClose
          onCancel={() => {
            setIsAdd(false);
            setAddingclient({
              nom: "",
              cin: "",
              adresse: "",
              adressedesigne: "",
              tel: "",
              fax: "",
              email: "",
              id_dossier: 0,
            });
          }}
          onOk={() => {
            addclient();
            setIsAdd(false);
            toast.success("demandeur ajouté avec succès");
            setAddingclient({
              nom: "",
              cin: "",
              adresse: "",
              adressedesigne: "",
              tel: "",
              fax: "",
              email: "",
              id_dossier: 0,
            });
          }}
        >
          <Input
            placeholder="nom du client"
            value={addingclient.nom}
            onChange={(e) => {
              setAddingclient({
                ...addingclient,
                nom: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Tapez le cin"
            value={addingclient.cin}
            onChange={(e) => {
              setAddingclient({
                ...addingclient,
                cin: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Adresse "
            value={addingclient.adresse}
            onChange={(e) => {
              setAddingclient({
                ...addingclient,
                adresse: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Adresse Désignée "
            value={addingclient.adressedesigne}
            onChange={(e) => {
              setAddingclient({
                ...addingclient,
                adressedesigne: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Numéro de téléphone"
            value={addingclient.tel}
            onChange={(e) => {
              setAddingclient({
                ...addingclient,
                tel: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="fax"
            value={addingclient.fax}
            onChange={(e) => {
              setAddingclient({
                ...addingclient,
                fax: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="E-mail"
            value={addingclient.email}
            onChange={(e) => {
              setAddingclient({
                ...addingclient,
                email: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};

export default TabClient;
