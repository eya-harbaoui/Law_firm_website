/* This example requires Tailwind CSS v2.0+ */
// delte and add are not an option
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { PrinterIcon } from "@heroicons/react/outline";

const Parametreenextra = () => {
  const [check, setCheck] = useState(false);
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingParametre, setEdditingParametre] = useState(null);
  const [addingParametre, setAddingParametre] = useState({
    prixphotocopie: 0,
  });


  const columns = [
    { key: "1", title: "Prix photocopie", dataIndex: "prixphotocopie" },

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
                  editParametre(record);
                }}
              ></AiFillEdit>
              <p>modifier</p>
            </div>
            {/* <div className="divdelete">
          <MdDeleteForever
            className="delete"
            onClick={() => {
              deleteParametre(record);
            }}
          ></MdDeleteForever>

          <p>supprimer</p>
          </div>*/}
          </div>
        );
      },
    },
  ];

  //select Parametre
  const getParametrerequest = async () => {
    try {
      const response = await axios.get("/photocopie");
      setlisteservice(response.data);
      if (response.data.length==0)
      setCheck(true); else setCheck(false);
      // aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getParametrerequest();
  }, [listeservice]);
  console.log(listeservice);

  //////////////modifier une Parametre
  const editParametre = (record) => {
    setIsEdit(true);
    setEdditingParametre({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingParametre(null);
  };
  //lien aveclback pour la modif
  const editParametrerequest = async (prixphotocopie) => {
    try {
      const modified = await axios.post("/photocopie/modif", {
        prixphotocopie: prixphotocopie,
      });
      console.log("photocopie modifié");
    } catch (error) {
      console.log(error);
    }
  }; ///////////////////// Ajout
  //lien aveclback pour l'ajout
  const [isAdd, setIsAdd] = useState(false);

  const addPhotocopie = async () => {
    try {
      const resp = await axios.post("/photocopie", addingParametre);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1>Prix de la photocopie</h1>
      <PrinterIcon className="dashbicons"></PrinterIcon>
          {check && <Button className="btnadd"  onClick={() => {
            setIsAdd(true);
          } }> Ajouter</Button>}
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
          title="modifier prix photocopie"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Parametre) => {
              if (
                Parametre.prixphotocopie === edditingParametre.prixphotocopie
              ) {
                return edditingParametre;
              } else {
                return Parametre;
              }
            });
            setlisteservice(newlisteservice);
            editParametrerequest(edditingParametre.prixphotocopie);
            resetEditing();
            toast.success("Le prix de la photocopie a été modifié avec succès");
          }}
        >
          <Input
            placeholder="prix_photocopie"
            value={edditingParametre?.prixphotocopie}
            onChange={(e) => {
              setEdditingParametre({
                ...edditingParametre,
                prixphotocopie: e.target.value,
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
          }}
          onOk={() => {
            addPhotocopie();
            setIsAdd(false);
            toast.success("Timbre ajouté avec succès");
          }}
        >
          <Input
            placeholder="libelle"
            value={addingParametre.prixphotocopie}
            onChange={(e) => {
              setAddingParametre({
                ...addingParametre,
                prixphotocopie: e.target.value,
              });
            }}
          ></Input>
           
           </Modal>
      </header>
    </div>
  );
};
export default Parametreenextra;
