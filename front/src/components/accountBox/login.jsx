import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import {Marginer} from "../marginer/marginfile";
import {AccountBox} from ".";
import {AccountContext} from "./accountContext";
import AuthContext from "../../context/AuthContext";
axios.defaults.withCredentials = true;
export function Login(props) {
  const {Switchtosignup} = useContext(AccountContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const {loggedIn, getLoggedIn} = useContext(AuthContext);

  async function log() {
    await axios.get("/loggedIn");
    await getLoggedIn();
    navigate("/home");
  }
  const Send = async () => {
    try {
      const resp = await axios.post(
        "/login",
        {
          username: username,

          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (resp.data.error) {
        toast.error(resp.data.error);
      } //khater ki naamlou login saye maach ykoun mawjoud asslan el response.data.error
      else {
        log();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Marginer direction="vertical" margin={50} />
        <label>
          <strong>Nom d'utilisateur</strong>
        </label>
        <Input
          type="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Marginer direction="vertical" margin={20} />
        <label>
          <strong>Mot de Passe</strong>
        </label>
        <Input
          type="password"
          placeholder="Mot de Passe"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={7} />
      <MutedLink href="#">Mot de passe oublié ?</MutedLink>
      <Marginer direction="vertical" margin="5em" />
      <SubmitButton
        type="button"
        onClick={() => {
          Send();
        }}>
        Connexion
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="/login#" onClick={Switchtosignup}>
        <BoldLink href="/login#" onClick={Switchtosignup}>
          Vous n'avez pas de compte ? Enregistrez-vous
        </BoldLink>{" "}
      </MutedLink>
    </BoxContainer>
  );
}
