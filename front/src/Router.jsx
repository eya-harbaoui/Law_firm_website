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
import Typedossier from "./components/dashboard/typedossier";
import About from "./components/welcome/about";
import Error from "./components/dashboard/error";
import Underconstruction from "./components/dashboard/underconstruction";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

axios.defaults.withCredentials = true;

function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/">
          <Route index element={<Home></Home>}></Route>
          {loggedIn === false && (
            <>
              <Route path="login" element={<AccountBox />}></Route>

              <Route path="register" element={<RegisterBox />} />
            </>
          )}
          {loggedIn === true && (
            <>
              <Route path="home" element={<Sharedlayout />}>
                <Route path="primehuissier" element={<PrimeHuissier />} />
                <Route path="utilisateur" element={<Utilisateur />} />
                <Route path="Parametreglobale" element={<Parametreglobale />} />
                <Route path="honoraireenextra" element={<Honoraireenextra />} />
                <Route path="timbre" element={<Timbre />} />
                <Route path="photocopie" element={<Photocopie />} />
                <Route path="transport" element={<Transport />} />
                <Route path="recettedufinance" element={<Recettedufinance />} />
                <Route
                  path="typedossier"
                  element={<Typedossier />}
                />
                <Route
                  path="emplacementdossier"
                  element={<Emplacementdossier />}
                />
                <Route path="gestionclient" element={<Gestionclient />} />
                <Route
                  path="collaborateurs"
                  element={<Collabo></Collabo>}></Route>
                <Route
                  path="Tribunaux_et_administrations"
                  element={<Tribunale />}
                />
                <Route path="welcome" element={<Welcome></Welcome>}></Route>
                <Route
                  path="recherchedossier"
                  element={<RechercheDossier />}></Route>
                <Route
                  path="creationdossier"
                  element={<CreationDossier />}></Route>
                <Route path="dossiers" element={<Dossiers />}></Route>
                <Route
                  path="underconstruction"
                  element={<Underconstruction></Underconstruction>}></Route>
              </Route>
            </>
          )}

          {loggedIn == true && (
            <Route path="*" element={<Error></Error>}></Route>
          )}
        </Route>
      </Routes>

      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>
  );
}

export default Router;
