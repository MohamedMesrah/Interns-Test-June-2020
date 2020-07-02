import React from "react";
import * as classes from "./style.module.css";

const Table = ({ data }) => {
  return (
    <div className={classes.table}>
      <table>
        <thead>
          <tr>
            <th>Client Deal ID</th>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Deal ID</th>
            <th>Deal Name</th>
            <th>Date</th>
            <th>Accepted</th>
            <th>Refused</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i + Date.now()}>
              <td>{i + 1}</td>
              <td>{row[0].split("@")[1]}</td>
              <td>{row[0].split("@")[0]}</td>
              <td>{row[1].split("#")[1]}</td>
              <td>{row[1].split("#")[0]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
