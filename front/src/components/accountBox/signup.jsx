import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer/marginfile";
import { AccountContext } from "./accountContext";
axios.defaults.withCredentials = true;
export function Signup(props) {
  const { Switchtologin } = useContext(AccountContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let validate = true;

  const Send = async () => {
    if (!email || !password || !username) {
      toast.error(" il faut remplir tous les champs!");
      validate = false;
      //fama toast w toast.warning w toast.success w toast.error
    } else {
      if (password.length < 6) {
        toast.warning("mot de passe courte");
        validate = false;
      } else {
        if (password.search(/\d/) == -1) {
          toast.warning(
            "votre mot de passe doit contenir des caracteres alphanumerique !"
          );
          validate = false;
        }
        if (password.search(/[a-zA-Z]/) == -1) {
          toast.warning(
            "votre mot de passe doit contenir des caracteres alphanumerique !"
          );
          validate = false;
        }
        if (password.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) == -1) {
          toast.warning("votre mot de passe doit contenir des symboles !");
          validate = false;
        }
      }
    }
    if (validate == true) {
      try {
        const resp = await axios.post("/register", {
          username: username,
          password: password,
          email: email,
        });
        console.log(resp.data);
        if (resp.data.error) {
          toast.warning("ce compte exite deja !");
        }
        else{
          Switchtologin();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        {/*<Marginer direction="vertical" margin={50} />
        <label>
          <strong>Nom Complet</strong>
        </label>
  <Input type="text" placeholder="Nom Complet" />*/}
        <label>
          <strong>Nom d'utilisateur</strong>
        </label>
        <Input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            console.log(username);
          }}
        />
        <Marginer direction="vertical" margin={20} />
        <label>
          <strong>E-mail</strong>
        </label>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(email);
          }}
        />
        <Marginer direction="vertical" margin={10} />
        <label>
          <strong>Tapez votre Mot de Passe</strong>
        </label>
        <Input
          type="password"
          placeholder="Mot de Passe"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(password);
          }}
        />
        {/*<Marginer direction="vertical" margin={10} />
        <label>
          <strong>Retapez votre Mot de Passe</strong>
        </label>
        <Input type="password" placeholder="Mot de Passe" />*/}
      </FormContainer>
      <Marginer direction="vertical" margin="5em" />
      <SubmitButton
        type="button"
        onClick={() => {
          Send();
        }}
      >
        Confirmer
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="/login#" onClick={Switchtologin}>
        <BoldLink>Connectez-vous Si vous avez un compte !</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
