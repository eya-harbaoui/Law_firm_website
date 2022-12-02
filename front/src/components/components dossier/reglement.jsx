import React,{useState} from "react";
import { Input,Button,Table} from "antd";
import {AiFillCreditCard} from "react-icons/ai"
function Reglement() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [isAdd, setIsAdd] = useState(false);
    const column = [
      { key: "1", title: "Tâche", dataIndex: "tache" },

      { key: "2", title: "Date Critique", dataIndex: "date_critique" },
      { key: "3", title: "Date Rappel", dataIndex: "date_rappel" },
      { key: "4", title: "Date_audience", dataIndex: "date_audience" },
      { key: "5", title: "Date_Déchéance", dataIndex: "date_decheance" },
      { key: "6", title: "Personne_Chargé", dataIndex: "collaborateur" },
      { key: "7", title: "Greffier", dataIndex: "greffier" },
      { key: "8", title: "Course", dataIndex: "course" },
      { key: "9", title: "Lieux", dataIndex: "fax" },
      { key: "10", title: "Service", dataIndex: "service" },
      { key: "11", title: "Résolu", dataIndex: "resolu" },
    ];
  return (
    <div className="container">
      <h1
        style={{
          fontSize: "1.3rem",
          color: "#0583f2",
        }}
      >
        Réglement
      </h1>
      <AiFillCreditCard className="addclientdem"></AiFillCreditCard>
      <div className="reglementdiv1">
        <div className="inputreg">
          <label>Honoraire Avocat :</label>
          <Input placeholder="Honoraire Avocat" type="number"></Input>
        </div>
        <div className="inputreg">
          <label>Net à payer :</label>
          <Input placeholder="Net à payer" type="number"></Input>
        </div>
      </div>
      <div className="reglementdiv2">
        <Button className="boutonreg" type="primary" block>
          Ajouter Réglement
        </Button>
        <Button className="boutonreg" type="primary" block>
          Retirer Réglement
        </Button>
      </div>
      <Table
        columns={column}
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
        style={{ display: "flex", flex: 1 }}
        scroll={{ x: "max-content" }}
      ></Table>
      <div className="reglementdiv3">
        <div className="inputreg">
          <label>Total payé:</label>
          <Input placeholder="Total payé" type="number"></Input>
        </div>
        <div className="inputreg">
          <label>Reste à payer :</label>
          <Input placeholder="Reste à payer" type="number"></Input>
        </div>
      </div>
    </div>
  );
}

export default Reglement;
