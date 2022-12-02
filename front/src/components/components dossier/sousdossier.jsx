import { Cascader, Input, Radio, Button, InputNumber } from "antd";
import React, { useState } from "react";
import "../components dossier/dossier.css";
import { Marginer } from "../marginer/marginfile";
import { DatePicker, Space } from "antd";
import Selection from "./selectioninput";
import Selectdossier from "./selectemplacement";
import TabDossier from "./tabdossier";
import Searchi from "./searchinput";
import {RiFoldersFill} from "react-icons/ri"
const options = [
  {
    value: "emplacement",
    label: "emplacement",
    children: [
      {
        value: "child",
        label: "child",
        children: [
          {
            value: "childd1",
            label: "childd1",
          },
          {
            value: "child2",
            label: "child2",
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: "emplacement1",
    label: "emplacement 1",
    children: [
      {
        value: "emplacement 2",
        label: "emplacement2",
        children: [
          {
            value: "child1",
            label: "child1",
          },
        ],
      },
    ],
  },
];

const SousDossier = () => {
  const [value, setValue] = useState(1);
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const onChangedate = (date, dateString) => {
    console.log(date, dateString);
  };

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="container">
      <h1
        style={{
          fontSize: "1.3rem",
          color: "#0583f2",
        }}
      >
        Sous Dossier
      </h1>
      <RiFoldersFill className="addclientdem"></RiFoldersFill>
      <div className="sousdoss1">
        <div className="div">
          <label htmlFor="code">Code Dossier :</label>

          <Searchi placeholder="Code Dossier" />
        </div>
        <div className="div ">
          <label>Date Création :</label>

          <DatePicker className="input" bordered={true} placeholder="" />
        </div>
      </div>
      <div className="sousdoss2">
        <div className="div">
          <label>Mission :</label>

          <Input type="text" classname="mission" />
        </div>
        <div className="div">
          <label htmlFor="emplacement"> Emplacement :</label>

          <Selectdossier className="input" placeholder="Emplacement Dossier" />
        </div>
      </div>
      <div className="sousdoss3">
        <div className="div">
          <label> Num Affaire :</label>

          <Input
            type="number"
            className="inputraison"
            placeholder="Numéro Affaire"
          />
        </div>
        <div className="div">
          <label>Observation(s) : </label>

          <Input type="text" className="mission" />
        </div>
      </div>
    </div>
  );
};
export default SousDossier;
