import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
//import Axios from 'axios';
import Parametreglobale from "./components/dashboard/Parametreglobale";
import PrimeHuissier from "./components/dashboard/primehuissier.jsx";
import { Sharedlayout } from "./components/dashboard/sharedLayout.jsx";
import { AccountBox, RegisterBox } from "./components/accountBox/index.jsx";
import { ToastContainer } from "react-toastify";
import Gestionclient from "./components/dashboard/Gestionclient.jsx";
import "react-toastify/dist/ReactToastify.css";
import Honoraireenextra from "./components/dashboard/honoraireenextra.jsx";
import Timbre from "./components/dashboard/timbre.jsx";
import Photocopie from "./components/dashboard/photocopie.jsx";
import Transport from "./components/dashboard/transport.jsx";
import Recettedufinance from "./components/dashboard/recettedufinance.jsx";
import Emplacementdossier from "./components/dashboard/emplacementdossier.jsx";
import Utilisateur from "./components/dashboard/utilisateur";
import Tribunale from "./components/dashboard/tribinaux_administrations/tribunale";
import Welcome from "./components/welcome/welcome";
import RechercheDossier from "./components/dashboard/recherchedossier";
import Home from "./components/welcome/Home";
import { Collabo } from "./components/dashboard/collaborateurs/collabo";
import CreationDossier from "./components/dashboard/creationdossier";
import Footer from "./components/FOOTER/footer";
import Dossiers from "./components/dashboard/Dossiers";
import About from "./components/welcome/about";
import Error from "./components/dashboard/error";
import Underconstruction from "./components/dashboard/underconstruction";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import { useContext } from "react";
import Router from "./Router";
//axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
