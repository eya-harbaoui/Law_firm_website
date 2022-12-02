import React, { useState, useEffect, useMemo, useRef } from "react";
import { Marginer } from "../marginer/marginfile";
import {
  DatePicker,
  Space,
  Divider,
  Input,
  Select,
  Button,
  InputNumber,
  Cascader,
} from "antd";
import { dossierdata } from "./dossierdata";

import { toast } from "react-toastify";
import Selectdossier from "./selectemplacement";
import TabDossier from "./tabdossier";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { domMax } from "framer-motion";
import { RiFolderAddFill } from "react-icons/ri";

const { Option } = Select;
let index = 0;

const DonneeDossier = () => {
  /*const [items, setItems] = useState([
    "إداري",
    "أذون",
    "أمر بالدفع",
    "إستشارات",
    "إستعجالي",
    "تجاري",
    "تنبه",
    "جبائي",
    "جزائي",
    "جناحي",
    "شخصي",
    "شغلي",
    "شكايات",
    "ضمان إجتماعي",
    "عقاري",
    "عقل",
    "عقود",
    "مدني",
    "مرور",
    "ملك تجاري",
    "نفقة",
  ]);*/
  const [typedossierliste, setTypedossierliste] = useState([]);
  const [typedossier1, setTypedossier1] = useState([]);

  const [value, setValue] = useState(1);
  const [disabledtrib, setDisabledtrib] = useState(false);
  const [disabledservice, setDisabledservice] = useState(false);
  const [listeTrib, setListeTrib] = useState([]);
  const [listeservice, setListeservice] = useState([]);
  const [listeserviceinput, setListeserviceinput] = useState([]);
  const [listeemplacement, setListeemplacement] = useState([]);
  const [liste, setListe] = useState([]);
  const [vider, setVider] = useState(false);
  const [listeser, setListeser] = useState([]);
  const [valuetrib, setValuetrib] = useState("");
  const [valueservice, setValueservice] = useState("");

  const [add_dossier, setAdd_dossier] = useState({
    typedossier: "",
    codedossier: "",
    annee: "",
    mission: "",
    emplacement: "",
    numaffaire: 0,
    lieu: "",
    service: "",
    observation: "",
    date_creation: "",
    id_dossier: 0,
  });
  const [clear, setClear] = useState(false);
  const onChangeemp = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setAdd_dossier({ ...add_dossier, emplacement: selectedOptions[0].label });
  };
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setValuetrib(selectedOptions[0].label);
    const newlisteser = listeser.filter(
      (ser) =>
        ser.value.substring(0, ser.value.indexOf(":")) ==
        selectedOptions[0].value
    );
    console.log(newlisteser, "hello");
    setListeserviceinput(newlisteser);

    setAdd_dossier({ ...add_dossier, lieu: selectedOptions[0].label });
    setDisabledtrib(true);
    console.log(listeserviceinput, "ena liste service jdida");
  };

  const onChangeservice = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setValueservice(selectedOptions[0].label);
    setAdd_dossier({ ...add_dossier, service: selectedOptions[0].label });
    setDisabledservice(true);
  };
  const onChangedate = (date, dateString) => {
    console.log(date, dateString, "ena date heeey");
    setAdd_dossier({
      ...add_dossier,
      annee: dateString,
    });
  };
  const onChangedate2 = (date, dateString) => {
    console.log(date, dateString, "ena date heeey");
    setAdd_dossier({
      ...add_dossier,
      date_creation: dateString,
    });
  };

  const filterlieu = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onChangetype = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setAdd_dossier({
      ...add_dossier,
      typedossier: selectedOptions[0].label,
    });
  };
  //**********select tribunale********************

  const gettribunalerequest = async () => {
    try {
      const response = await axios.get("/tribunale");
      console.log(response.data, "tribunale");

      setListeTrib(response.data);
      const newliste1 = listeTrib.map((trib) => ({
        value: trib.id,
        label: trib.lieu,
      }));
      setListe(newliste1);

      // console.log("hellolistetrib", listeTrib);
    } catch (error) {
      console.log(error.message);
    }
  };
  //*************select emplacement dossier ******************/
  const getemplacementdossierrequest = async () => {
    try {
      const response = await axios.get("/emplacementdossier");
      //console.log(response.data);

      setListeemplacement(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  /************select services ************/
  const getservicerequest = async () => {
    try {
      const response = await axios.get("/service");
      setListeservice(response.data);
      const newliste = listeservice.map((ser) => ({
        value: ser.tribunale_id + ":" + ser.service_id,
        label: ser.nom,
      }));
      setListeser(newliste);
    } catch (error) {
      console.log(error.message);
    }
  };

  const listeemp = useMemo(() => {
    getemplacementdossierrequest();

    return listeemplacement.map((emp) => ({
      value: emp.id,
      label: emp.libelle,
    }));
  }, [listeemplacement]);

  //************ajouter dossier **************/
  const getTypedossierrequest = async () => {
    try {
      const response = await axios.get("/typedossier");
      setTypedossierliste(response.data);
      const newliste = typedossierliste.map((ser) => ({
        value: ser.id,
        label: ser.type_dossier,
      }));
      setTypedossier1(newliste);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    gettribunalerequest();
    getTypedossierrequest();
    console.log(typedossierliste, "type");
    const id = localStorage.getItem("id_dossier");
    console.log(id, "ena el id eli bch netbaath");
    setAdd_dossier({ ...add_dossier, id_dossier: id });
  }, [liste, typedossierliste, add_dossier.id_dossier]);

  useEffect(() => {
    getservicerequest();
    console.log(listeservice);
    console.log(listeser, "listeserena");
  }, [listeservice]);

  const adddossier = async () => {
    try {
      console.log(add_dossier);
      const resp = await axios.post("/donneedossieradd", add_dossier);

      //console.log(add_dossier, dossierdata, "ena dossier dataaaaaaaaaaaaaaaa");
      toast.success("les données de dossier sont ajoutés avec succès");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1
        style={{
          fontSize: "1.3rem",
          color: "#0583f2",
        }}
      >
        Données Dossier
      </h1>
      <RiFolderAddFill className="addclientdem"></RiFolderAddFill>
      <Marginer direction="vertical" margin={50} />
      <div className="client1">
        <div className="div">
          <label>Type Dossier:</label>

          <Cascader
            className="cascader1"
            options={typedossier1}
            placeholder="Type dossier"
            onChange={onChangetype}
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
          ></Cascader>
        </div>
        <div className="div">
          <label htmlFor="code">Code Dossier :</label>

          <Input
            className="input"
            placeholder="Code Dossier"
            value={add_dossier.codedossier}
            onChange={(e) => {
              setAdd_dossier({
                ...add_dossier,
                codedossier: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="client2">
        <div className="div">
          <label>Année</label>
          <DatePicker
            className="dateinput"
            picker="year"
            placeholder="Année"
            onChange={onChangedate}
          />
        </div>
        <div className="div">
          <label>Mission :</label>

          <Input
            type="text"
            className="mission"
            value={add_dossier.mission}
            onChange={(e) => {
              setAdd_dossier({
                ...add_dossier,
                mission: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <div className="client3">
        <div className="div">
          <label htmlFor="emplacement"> Emplacement :</label>

          <Cascader
            className="cascader1"
            options={listeemp}
            placeholder="emplacements dossiers"
            onChange={onChangeemp}
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
          />
        </div>
        <div className="div">
          <label> Num Affaire :</label>

          <Input
            type="number"
            className="inputraison"
            placeholder="Numéro Affaire"
            value={add_dossier.numaffaire}
            onChange={(e) => {
              setAdd_dossier({
                ...add_dossier,
                numaffaire: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="client4">
        <div className="div">
          <label>lieu :</label>

          <Cascader
            disabled={disabledtrib}
            id="cascadertrib"
            className="cascader1"
            options={liste}
            placeholder="Chercher lieu"
            onChange={onChange}
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
            allowClear={clear}
            value={valuetrib}
          />
        </div>
        <div className="div">
          <label>Service :</label>

          <Cascader
            id="cascaderservice"
            disabled={disabledservice}
            className="cascader1"
            options={listeserviceinput}
            onChange={onChangeservice}
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
            value={valueservice}
          />
        </div>
        <Button
          type="primary"
          style={{ width: 300 }}
          onClick={() => {
            setDisabledtrib(false);
            setDisabledservice(false);
            setValuetrib("");
            setValueservice("");
            const id = localStorage.getItem("id_dossier");
            console.log(id, "ena mel local storage");
          }}
        >
          resélectionner les données du tribunale
        </Button>
      </div>
      <div className="client5">
        <div className="div">
          <label>Observation(s) : </label>
          <Input
            className="mission"
            type="text"
            value={add_dossier.observation}
            onChange={(e) => {
              setAdd_dossier({
                ...add_dossier,
                observation: e.target.value,
              });
            }}
          />
        </div>
        <div className="div">
          <label>Date Création :</label>
          <DatePicker
            className="dateinput"
            bordered={true}
            placeholder="date creation"
            onChange={onChangedate2}
          />
        </div>
      </div>

      <div className="boutonet"></div>
      <TabDossier />
      <div className="boutonvalid">
        <button className="buttonvalidate" onClick={adddossier}>
          Valider Dossier
        </button>
      </div>
    </div>
  );
};
export default DonneeDossier;
