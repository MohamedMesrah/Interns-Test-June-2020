import React from "react";
import * as classes from "./style.module.css";

const Alert = ({ type, text }) => {
  let classesNames = [classes.alert];
  type === "error" && classesNames.push(classes.error);
  type === "success" && classesNames.push(classes.success);

  return <div className={classesNames.join(" ", ",")}> {text}</div>;
};

export default Alert;
