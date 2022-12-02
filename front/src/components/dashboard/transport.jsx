/* This example requires Tailwind CSS v2.0+ */
// delte and add are not an option
import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {Table, Button, Modal, Input} from "antd";
import "antd/dist/antd.min.css";
import {AiFillEdit} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";
import {toast} from "react-toastify";
import {TruckIcon} from "@heroicons/react/outline";

const Transport = () => {
  const [listeservice, setlisteservice] = useState([]);
  const [check, setCheck] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingTransport, setEdditingTransport] = useState(null);
  const [addingParametre, setAddingParametre] = useState({
    montanttransportparjours: 0,
  });

  const columns = [
    {
      key: "1",
      title: " Montant transport par jours",
      dataIndex: "montanttransportparjours",
    },
    {
      key: "2",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editTransport(record);
                }}></AiFillEdit>
              <p>modifier</p>
            </div>
            {/* <div className="divdelete">
          <MdDeleteForever
            className="delete"
            onClick={() => {
              deleteTransport(record);
            }}
          ></MdDeleteForever>

          <p>supprimer</p>
          </div>*/}
          </div>
        );
      },
    },
  ];

  //select Transport
  const getTransportrequest = async () => {
    try {
      const response = await axios.get("/transport");
      setlisteservice(response.data); // aleh listeservice dhaherli khtr tji listeservice [{:}]
      if (response.data.length == 0) setCheck(true);
      else setCheck(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTransportrequest();
  }, [listeservice]);
  console.log(listeservice);

  ////////////
  //modifier une Transport
  const editTransport = (record) => {
    setIsEdit(true);
    setEdditingTransport({...record}); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingTransport(null);
  };
  //lien aveclback pour la modif
  const editTransportrequest = async (montanttransportparjours) => {
    try {
      const modified = await axios.post("/transport/modif", {
        montanttransportparjours: montanttransportparjours,
      });
      console.log(" modifié");
    } catch (error) {
      console.log(error);
    }
  }; ///////////////////// Ajout
  //lien aveclback pour l'ajout
  const [isAdd, setIsAdd] = useState(false);
  const addTransport = async () => {
    try {
      const resp = await axios.post("/transport", addingParametre);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Transport</h1>
        <TruckIcon className="dashbicons"></TruckIcon>

        {check && (
          <button
            className="btnadd"
            onClick={() => {
              setIsAdd(true);
            }}>
            {" "}
            Ajouter
          </button>
        )}
        <div className="tab">
          <Table
            columns={columns}
            dataSource={listeservice}
            style={{with: 15}}
            bordered={true}
          />
        </div>
        {/*MODIFICATION*/}
        <Modal
          title="Modification du  montant de transport par jours"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Transport) => {
              if (
                Transport.montanttransportparjours ===
                edditingTransport.montanttransportparjours
              ) {
                return edditingTransport;
              } else {
                return Transport;
              }
            });
            setlisteservice(newlisteservice);
            editTransportrequest(edditingTransport.montanttransportparjours);
            resetEditing();
            toast.success("Prix du transport modifié avec succès");
          }}>
          <Input
            placeholder=" Montant du Transport par jours"
            value={edditingTransport?.montanttransportparjours}
            onChange={(e) => {
              setEdditingTransport({
                ...edditingTransport,
                montanttransportparjours: e.target.value,
              });
            }}></Input>

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
            addTransport();
            setIsAdd(false);
            toast.success("Timbre ajouté avec succès");
          }}>
          <Input
            placeholder="libelle"
            value={addingParametre.montanttransportparjours}
            onChange={(e) => {
              setAddingParametre({
                ...addingParametre,
                montanttransportparjours: e.target.value,
              });
            }}></Input>
        </Modal>
      </header>
    </div>
  );
};
export default Transport;
