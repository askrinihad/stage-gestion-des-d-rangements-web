import React, { Component } from "react";
import logo from "../assets/image/logo.png";
import axios from "axios";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }
  //////////////////////////
  /*----------les fonctions---------------- */
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  /////////////////////////
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  ///////////////////
  login = () => {
    if (this.state.username === "" || this.state.password === "") {
      alert("veuillez remplir tous les champs");
    } else {
      console.log(this.state.username + this.state.password);
      /* fetch("http://localhost:5000/compte/login/web", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      }) */
      axios
        .post("http://localhost:5000/compte/login/web", {
          username: this.state.username,
          password: this.state.password,
        })

        .then((response) => {
          if (response.data.service === "") {
            alert(response.data.message);
          } else {
            console.log(response.data.service);
            this.props.history.push("/ListeAttente", {
              service: response.data.service,
            });
          }
        });
    }
  };
  //////////////////////////////////////////////
  render() {
    return (
      <div style={container}>
        <div style={box}>
          <div style={interBox}>
            <p style={Bstyle}>Bienvenu</p>
          </div>
          <div style={loginBox}>
            <p style={loginP}>Login</p>
            <input
              type="text"
              placeholder="Nom d'utilisateur..."
              style={input}
              onChange={this.onChangeUsername}
            />
            <input
              type="password"
              placeholder="Mot de passe..."
              style={input}
              secureTextEntry={true}
              onChange={this.onChangePassword}
            />
            <button style={btn} type="submit" onClick={this.login}>
              Se connecter
            </button>
            <img
              src={logo}
              id="img"
              style={{
                marginTop: "10%",
                height: 60,
                width: 120,
              }}
            />
          </div>
        </div>

        {/*  <button
          onClick={() =>
            this.props.history.push("/ListeAjouté", {
              service: "gestion de qualité de service",
              //to read in the other component {this.props.location.state.compte}
            })
          }
        >
          click
        </button> */}
      </div>
    );
  }
}
const container = {
  backgroundColor: "#F8F8F8",

  height: "100vh",
  width: "100%",
  position: "fixed",
};
const box = {
  backgroundColor: "#FFFFFF",
  marginLeft: "20%",
  marginRight: "20%",
  marginTop: "5%",
  height: "80vh",
  width: "60%",
  position: "fixed",
  boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
  borderRadius: "15px 15px 15px 15px",
};
const interBox = {
  backgroundColor: "#27B8B8",
  height: "80vh",
  width: "30%",
  position: "fixed",
  boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
  borderRadius: "15px 0px 0px 15px",
};
const loginBox = {
  marginLeft: "70%",
  marginTop: "5%",
  color: "#27B8B8",
  weight: "Bold",
  fontSize: 30,
  alignItems: "center",
  justifyContent: "center",
};
const input = {
  borderWidth: 3,
  outline: "none",
  marginTop: "10%",
  borderColor: "transparent",
  height: 40,
  marginLeft: "-35%",
  width: 250,
  borderBottomColor: "#27B8B8",
};
const btn = {
  backgroundColor: "#27B8B8",
  color: "white",
  outline: "none",
  cursor: " pointer",
  boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
  height: 30,
  marginLeft: "-10%",
  width: "50%",
  borderRadius: 5,
  border: "none",
  marginTop: "25%",
};
const Bstyle = {
  color: "white",
  fontSize: 40,
  marginLeft: "27%",
  marginTop: "50%",
};
const loginP = {
  marginTop: "30%",
};
