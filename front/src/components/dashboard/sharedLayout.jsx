import React from "react";
import {Outlet} from "react-router-dom";
import Example from "./Example";
export const Sharedlayout = () => {
  return (
    <>
      <Example></Example>
      <Outlet></Outlet>
    </>
  );
};