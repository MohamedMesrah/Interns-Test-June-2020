import React from "react";
import ReactFileReader from "react-file-reader";
import * as classes from "./style.module.css";

const DatabaseConnection = ({
  disabled,
  initialized,
  imported,
  onChange,
  handleFiles,
  onInitialize,
  onImport,
  onReset,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.file}>
        <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
          <button className="btn">Upload file</button>
        </ReactFileReader>
        {initialized && <button onClick={onImport}>Import</button>}
        {imported && <button onClick={onReset}>Reset</button>}
      </div>
      <form className={classes.DatabaseConnection}>
        <div>
          <label htmlFor="username">SQL Username : </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">SQL Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={onChange}
          />
        </div>
        <button disabled={disabled} onClick={onInitialize}>
          Initialize
        </button>
      </form>
    </div>
  );
};

export default DatabaseConnection;
