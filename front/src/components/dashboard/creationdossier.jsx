import React , {useState} from 'react'
import { Tabs,Radio } from 'antd';
import ClientDemandeur from '../components dossier/clientDemandeur';
import DonneeDossier from "../components dossier/donneedossier";
import Taches from "../components dossier/taches"
import Reglement from '../components dossier/reglement';
import Collaborateur from '../components dossier/collaborateur';
import SousDossier from '../components dossier/sousdossier';
import "../components dossier/dossier.css";
const { TabPane } = Tabs;
export default function CreationDossier() {
  return (
    <div className="dosscontainer">
      
      <Tabs type="card">
        <TabPane tab="Client & Demandeur" key="1">
         <ClientDemandeur/>
        </TabPane>
        <TabPane tab="Données Dossier" key="2">
          <DonneeDossier/>
        </TabPane>
        <TabPane tab="Tâche(s)" key="3">
          <Taches></Taches>
        </TabPane>
        <TabPane tab="Réglement" key="4">
          <Reglement></Reglement>
        </TabPane>
        <TabPane tab="Collaborateur" key="5">
          <Collaborateur></Collaborateur>
        </TabPane>
        <TabPane tab="Sous Dossier" key="6">
          <SousDossier/>
        </TabPane>
      </Tabs>
    </div>
  );

}
