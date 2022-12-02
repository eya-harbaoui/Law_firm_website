import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./footerStyles";

const Footer = () => {
  return (
    <Box>
      {/*<h1 style={{ color: "green", textAlign: "center", marginTop: "-50px" }}>
         Le meilleur espace pour gérer votre cabinet d'avocat !
  </h1>*/}
      <Container>
        <Row>
          <Column>
            <Heading>Paramètre</Heading>
            <FooterLink href="Parametreglobale">Paramètre Globale</FooterLink>
            <FooterLink href="honoraireenextra">Honoraire en extra</FooterLink>
            <FooterLink href="emplacementdossier">
              Emplacement dossier
            </FooterLink>
            <FooterLink href="Tribunaux_et_administrations">
              Tribunaux et Administrations
            </FooterLink>
            <FooterLink href="#">Type dossier</FooterLink>
            <FooterLink href="utilisateur">Utilisateur</FooterLink>
            <FooterLink href="#">Huissier</FooterLink>
            <FooterLink href="collaborateurs">Collaborateur</FooterLink>
            <FooterLink href="primehuissier">Primeorateur</FooterLink>
            <FooterLink href="#">Greffier</FooterLink>
            <FooterLink href="#">Prime Greffier</FooterLink>
          </Column>
          <Column>
            <Heading>Debours</Heading>
            <FooterLink href="timbre">timbre</FooterLink>
            <FooterLink href="photocopie">photocopie</FooterLink>
            <FooterLink href="transport">transport</FooterLink>
            <FooterLink href="recettedufinance">recette de finance</FooterLink>
          </Column>
          <Column>
            <Heading>Clients</Heading>
            <FooterLink href="gestionclient">Gestion Client</FooterLink>
            <FooterLink href="#">Fiche Signalitique</FooterLink>
          </Column>
          <Column>
            <Heading>Dossiers</Heading>
            <FooterLink href="recherchedossier"> Recherche</FooterLink>
            <FooterLink href="#">Emplacement Dossier</FooterLink>
            <FooterLink href="creationdossier">Creation</FooterLink>
            <FooterLink href="#">Gestion Archive</FooterLink>
          </Column>
          <Column>
            <Heading>Rappel</Heading>
            <FooterLink href="#"> Tâche</FooterLink>
            <FooterLink href="#">Huissier</FooterLink>
            <FooterLink href="#">Echéance</FooterLink>
            <FooterLink href="#">Recouvrement</FooterLink>
            <FooterLink href="#">Expert</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

export default Footer;
