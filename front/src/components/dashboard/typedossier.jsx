import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { BiFolderOpen } from "react-icons/bi";

const Typedossier = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingTypedossier, setEdditingTypedossier] =
    useState(null);
  const [addingTypedossier, setAddingTypedossier] = useState({
    type_dossier: "",
  });

  const columns = [
    {
      key: "1",
      title: "id",
      dataIndex: "id",
      //sorter:(record1,record2)=>
      //{ return record1.id<record2.id}
    },
    { key: "2", title: "type_dossier", dataIndex:"type_dossier" },

    {
      key: "3",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editTypedossier(record);
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
                  deleteTypedossier(record);
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

  //select Typedossier
  const getTypedossierrequest = async () => {
    try {
      const response = await axios.get("/typedossier");
      setlisteservice(response.data); // aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTypedossierrequest();
  }, [listeservice]);
  console.log(listeservice);

  //supprimer une Typedossier
  const deleteTypedossier = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce type dossier?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (Typedossier) => Typedossier.id !== record.id
        );
        setlisteservice(newlisteservice);
        deleteTypedossierrequest(record.id);
        toast.success("Type dossier supprimé avec succès");
      },
    });
  };
  const deleteTypedossierrequest = async (id) => {
    try {
      const deleted = await axios.post("/typedossier/delete", {
        id: id,
      });
      console.log("Type_dossier supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////
  //modifier une Typedossier
  const editTypedossier = (record) => {
    setIsEdit(true);
    setEdditingTypedossier({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingTypedossier(null);
  };
  //lien aveclback pour la modif
  const editTypedossierrequest = async (id, type_dossier) => {
    try {
      const modified = await axios.post("/Typedossier/modif", {
        id: id,
        type_dossier: type_dossier,
      });
      console.log("Type_dossier_modifié", id, type_dossier);
    } catch (error) {
      console.log(error);
    }
  }; ///////////////////// Ajout
  //lien aveclback pour l'ajout

  const [isAdd, setIsAdd] = useState(false);

  const addTypedossier = async () => {
    try {
      const resp = await axios.post(
        "/Typedossier",
        addingTypedossier
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Type dossier</h1>
        <BiFolderOpen className="dashbicons"></BiFolderOpen>
        {
          <button
            className="btnadd"
            onClick={() => {
              setIsAdd(true);
            }}
          >
            {" "}
            Ajouter
          </button>
        }
        <div classname="tab">
          <Table
            columns={columns}
            dataSource={listeservice}
            bordered={true}
            pagination={{
              current: page,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
            scroll={{ x: "max-content" }}
          />
        </div>
        {/*MODIFICATION*/}
        <Modal
          title="modifier type_dossier"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Typedossier) => {
              if (Typedossier.id === edditingTypedossier.id) {
                return edditingTypedossier;
              } else {
                return Typedossier;
              }
            });
            setlisteservice(newlisteservice);
            editTypedossierrequest(
              edditingTypedossier.id,
              edditingTypedossier.type_dossier
            );
            resetEditing();
            toast.success("Type dossier modifié avec succès");
          }}
          destroyOnClose={true}
        >
          <Input
            placeholder="type_dossier"
            value={edditingTypedossier?.type_dossier}
            onChange={(e) => {
              setEdditingTypedossier({
                ...edditingTypedossier,
                type_dossier: e.target.value,
              });
            }}
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
            setAddingTypedossier({ type_dossier: "" });
          }}
          onOk={() => {
            addTypedossier();
            setIsAdd(false);
            toast.success("Type dossier ajouté avec succès");
            setAddingTypedossier({ type_dossier: "" });
          }}
          destroyOnClose={true}
        >
          <Input
            placeholder="type_dossier"
            value={addingTypedossier.type_dossier}
            onChange={(e) => {
              setAddingTypedossier({
                ...addingTypedossier,
                type_dossier: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};
export default Typedossier;
