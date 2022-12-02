import React, {useState, useMemo, useEffect} from "react";
import "./dossier.css";
import {Marginer} from "../marginer/marginfile";
import {Input, Button, Table, Radio, Cascader, Select} from "antd";
import axios from "axios";
import AjoutCollabo from "./ajoutcollabo";
import {FcCollaboration} from "react-icons/fc"
//import {Table, Button, Modal, Input, Pagination} from "antd";
import "antd/dist/antd.min.css";

function Collaborateur() {
  const [listeCollab, setListeCollab] = useState([]);
  //const [matricule, setMatricule] = useState("");
  const [newlistcollab, setNewlistcollab] = useState( [] );
  const [donnee, setDonnee] = useState({
    username: "",
    montant: "",
    cin: "",
    ville: "",
    rue: "",
    num: "",
    codepostal: "",
    activite: "",
    tel: "",
  });

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  const getcollabrequest = async () => {
    try {
      const response = await axios.get("/collab");
      console.log(response.data);

      setListeCollab(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const liste = useMemo(() => {
    getcollabrequest();
    return listeCollab.map((collab) => ({
      value: collab.id,
      label: collab.id + ":" + collab.username,
    }));
  }, [listeCollab] );
  console.log("heyyyee",listeCollab)

  const onChange = (value, selectedOptions) => {
    console.log(value, "lefriki", selectedOptions);
     listeCollab.map((ser) => {
       if (ser.id == selectedOptions[0].value) {
        setDonnee({
          username: ser.username,
          montant: ser.montant,
          cin: ser.cin,
          ville: ser.ville,
          rue: ser.rue,
          num: ser.num,
          codepostal: ser.codepostal,
          activite: ser.activite,
          tel: ser.tel,
        });
       }
     });

    console.log(newlistcollab, "KING");
   // setNewcollab(newlistcollab);
    //setMatricule(newcollab[0].matricule);

   
  };
  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [value, setValue] = useState(1);
  return (
    <div className="container">
      <h1
        style={{
          fontSize: "1.3rem",
          color: "#0583f2",
        }}
      >
        Collaborateur
      </h1>
      <FcCollaboration className="addclientdem"></FcCollaboration>
      <div className="divcollab1">
        <div className="inputcoll">
          <AjoutCollabo />
          <label>Code Collaborateur :</label>

          <Cascader
            placeholder="code collaborateur"
            options={liste}
            onChange={onChange}
            showSearch={{
              filter,
            }}
          ></Cascader>
        </div>
        <div className="inputcoll">
          <label>Mode Réglement :</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio} value={value}>
              <Radio value={1}>Mensuel</Radio>
              <Radio value={2}>Sur Dossier</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="inputcoll">
          <label>Nom et Prénom :</label>
          <Input
            type="text"
            placeholder="Nom et Prénom"
            value={donnee.username}
          ></Input>
        </div>
        <div className="inputcoll">
          <label>Part Collaborateur :</label>
          <Input
            type="text"
            placeholder="part collaborateur"
            value={donnee.montant}
          ></Input>
        </div>
        <div className="inputcoll">
          <label>CIN :</label>
          <Input type="text" placeholder="cin" value={donnee.cin}></Input>
        </div>
        <div className="inputcoll">
          <label>Type Réglement :</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio} value={value}>
              <Radio value={3}>Pourcentage</Radio>
              <Radio value={4}>Forfait</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className="divcollab2">
        <div className="divcollab22">
          <label>Adresse :</label>
          <div className="inputcoll">
            <label>Ville :</label>
            <Input type="text" placeholder="ville" value={donnee.ville}></Input>
          </div>
          <div className="inputcoll">
            <label>Rue :</label>
            <Input type="text" placeholder="rue" value={donnee.rue}></Input>
          </div>
          <div className="inputcoll">
            <label>Numéro :</label>
            <Input type="text" placeholder="numéro" value={donnee.num}></Input>
          </div>
          <div className="inputcoll">
            <label>Code Postal :</label>
            <Input
              type="text"
              placeholder="code postal"
              value={donnee.codepostal}
            ></Input>
          </div>
        </div>
        <div className="divcollab23">
          <div className="inputcoll">
            <label>Activité Contribuale :</label>
            <Input
              type="text"
              placeholder="Activité Contribuale"
              value={donnee.activite}
            ></Input>
          </div>
          <div className="inputcoll">
            <label>Tel :</label>
            <Input type="text" placeholder="Tel" value={donnee.tel}></Input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborateur;
