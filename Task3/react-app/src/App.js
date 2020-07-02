import React from "react";
import axios from "axios";
import "./App.css";
import Alert from "./components/Alert/Alert";
import Table from "./components/Table/Table";
import DatabaseConnection from "./components/DatabaseConnection/DatabaseConnection";

class App extends React.Component {
  state = {
    username: "",
    password: "",
    dataCsv: [],
    importedData: [],
    uploaded: false,
    initialized: false,
    imported: false,
  };

  handleChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
  };

  handleFiles = (files) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ dataCsv: reader.result, uploaded: true });

      // convert csv to an array
      let arr = [];
      let cursore = 0;
      for (let i = 0; i < reader.result.length; i++) {
        const ch = reader.result[i];
        if (ch === "," || ch === "\n") {
          let word = reader.result.substring(cursore, i);
          arr.push(word);
          cursore = i + 1;
        }
      }

      let arr2dimentional = [];
      let cursore2 = 5;
      for (let i = 10; i <= arr.length; i += 5) {
        let temp = [];
        temp.push(...arr.slice(cursore2, i));
        cursore2 = i;
        arr2dimentional.push(temp);
      }
      console.log(arr2dimentional);

      axios
        .post("http://localhost:5000/csv", arr2dimentional)
        .then(() => setTimeout(() => this.setState({ uploaded: false }), 5000))
        .catch((err) => console.log(err));
    };
    reader.readAsText(files[0]);
  };

  handleInitialize = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post("http://localhost:5000/auth", { username, password })
      .then((res) => {
        res && alert("You can now import from database");
        this.setState({ initialized: true });
      })
      .catch((err) => console.log(err));
  };

  handleImport = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/import")
      .then(({ data }) => {
        this.setState({ importedData: data, imported: true });
      })
      .catch((err) => console.log(err));
  };

  handleReset = (e) => {
    e.preventDefault();
    this.setState({ importedData: [] });
    axios
      .delete("http://localhost:5000/import")
      .then(({ data }) => {
        // this.setState({ importedData: data, imported: true });
        console.log("deleted");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      username,
      password,
      uploaded,
      initialized,
      imported,
      importedData,
    } = this.state;
    return (
      <div className="App">
        {uploaded && (
          <Alert
            type="success"
            text="File uploaded successfully and sent to the server"
          />
        )}
        <DatabaseConnection
          onFileChange={this.handleFile}
          onChange={this.handleChange}
          handleFiles={this.handleFiles}
          onInitialize={this.handleInitialize}
          onImport={this.handleImport}
          onReset={this.handleReset}
          disabled={username.length === 0 || password.length === 0}
          initialized={initialized}
          imported={imported}
        />
        <Table data={importedData} />
      </div>
    );
  }
}

export default App;
