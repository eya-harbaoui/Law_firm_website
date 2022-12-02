import React, {useState} from "react";
import styled from "styled-components";

import { motion } from "framer-motion";
import { Login } from "./login";
import { AccountContext } from "./accountContext";
import { Signup } from "./signup";

const BoxContainer = styled.div`
  width: 400px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
  margin:0 auto;
  margin-top : 100px;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
  margin-left:10%;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -310px;
  left: -70px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    50deg,
    rgba(27, 46, 53, 21) 0%,
    rgba(0, 102, 213, 84) 50%,
    rgba(5, 131, 242, 95) 70%,
    rgba(34, 136, 255, 95) 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  line-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h3`
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  z-index: 10;
  margin: 0;
  margin-top: 30px;
  margin-left:20px;

`;
const InnerContainer = styled.div`
width:100%;
display:flex;
flex-direction:column;
`;
const backdropVariants = {
  expanded: {
    width: "240%",
    height: "1150px",
    borderRadius: "15%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "60%",
    transform: "rotate(60deg)",
  },
};
const expandingTransition = {
  type: "spring",
  duration: 2.3,//edheya bl seconde donc nadhreb *1000 f settimeout bch twali bel ms
  stiffness:30,//haja kima rapidité mtaa expanding
}
export function AccountBox( props ) {
  const [isExpanded, setExpanded] = useState( false );
  const [active, setActive] = useState( "login" );
  const playExpandingAnimation = () => {
    setExpanded( true );
    setTimeout( () => {
      setExpanded( false );
    }, expandingTransition.duration*1000-1000 )
  };
  const Switchtosignup = () => {
    playExpandingAnimation();
    setTimeout( () => {
      setActive( "signup" );
    }, 400 )
  };
    const Switchtologin = () => {
      playExpandingAnimation();
      setTimeout(() => {
        setActive("login");
      }, 400);
  };
       //initial khdhet false 5ater akeka twali ay refresh l'animation tmchi whdha toul
  const ContextValue = { Switchtosignup, Switchtologin };
  return (
    <AccountContext.Provider value={ContextValue}>
 
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "login" && (
            <HeaderContainer>
              <HeaderText>Bienvenue</HeaderText>
              <SmallText>Veuillez vous enregistrer pour continuer!</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Creation de Compte</HeaderText>
              <SmallText>Veuillez vous connecter pour continuer!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active == "login" && <Login />}
          {active == "signup" && <Signup />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
export function RegisterBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signup");
  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1000);
  };
  const Switchtosignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };
  const Switchtologin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("login");
    }, 400);
  };
  //initial khdhet false 5ater akeka twali ay refresh l'animation tmchi whdha toul
  const ContextValue = {Switchtosignup, Switchtologin};
  return (
    <AccountContext.Provider value={ContextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "login" && (
            <HeaderContainer>
              <HeaderText>Bienvenue</HeaderText>
              <SmallText>Veuillez vous enregistrer pour continuer!</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Creation de Compte</HeaderText>
              <SmallText>Veuillez vous connecter pour continuer!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "login" && <Login />}
          {active === "signup" && <Signup />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
