import React, { Component } from "react";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Dropdown from "react-dropdown";
import { MenuItem, Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "react-dropdown/style.css";
import "../assets/styles.css";
import axios from "axios";
import logo from "../assets/image/logo.png";
export default class InfoDerPb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: "Acceuil",
          icon: <HomeIcon />,
          link: "/ListeAttente",
        },
        {
          title: "Ajouter dérangement",
          icon: <AddBoxIcon />,
          link: "/AjouterDer",
        },

        {
          title: "Liste des PCs",
          icon: <ListIcon />,
          link: "/EtatPc",
        },

        {
          title: "Ajouter PC",
          icon: <AddBoxIcon />,
          link: "AjouterPc",
        },
        {
          title: "Déconnecter",
          icon: <ExitToAppIcon />,
          link: "/",
        },
      ],
      /////////////////
      id: "",
      titre: "complaint1320",
      dateSigna: "2020-11-01T00:00:00.000Z",
      dateLimit: "2020-11-01T00:00:00.000Z",
      nomClient: "Saidi alae",
      numClient: "0549000879",
      addressClient: "Babez",
      constitutionTete: "H05",
      constitutionGroupe: 6,
      constitutionAmorce: 7,
      nomMsan: "MSN4",
      pair: 15,
      typeDerang: "pas de tonalité",
      numFixClient: "02367564",
      lic: 45,
      referenceEqui: 46487909,
      nomTech: "C7_BEZ",
      nbVisite: 0,
      compte: "",
      comptes: [],
      service: "",
      destination: "",
      visible: true,
    };
  }
  /////////////////////////////
  /*------------les fonctions----------- */

  ////////////////////:
  envoyerDer = (destination) => {
    if (this.props.location.state.service === "maintenance urbain") {
      fetch("http://localhost:5000/derangement/EnvoiePbMain/web", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre: this.state.titre,
          destination: destination,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push("/ListeProbléme", {
            service: this.props.location.state.service,
          });
        });
    } else {
      fetch("http://localhost:5000/derangement/EnvoiePbQua/web", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre: this.state.titre,
          destination: destination,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push("/ListeProbléme", {
            service: this.props.location.state.service,
          });
          console.log(responseJson);
        });
    }

    //////////////////////////////////
  };

  ///////////////////////////
  ///////////////////////////////
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/derangement/getDerPb/web/" +
          this.props.location.state.titre
      )

      .then((response) => {
        console.log(response.data[0]);

        this.setState((prevState) => ({
          id: response.data[0]._id,
          titre: response.data[0].titre,
          dateSigna: response.data[0].dateSignal,
          dateLimit: response.data[0].dateLimit,
          nomClient: response.data[0].nomClient,
          numClient: response.data[0].numClient,
          addressClient: response.data[0].addressClient,
          constitutionTete: response.data[0].constitutionTete,
          constitutionGroupe: response.data[0].constitutionGroupe,
          constitutionAmorce: response.data[0].constitutionAmorce,
          nomMsan: response.data[0].nomMsan,
          pair: response.data[0].pair,
          typeDerang: response.data[0].typeDerang,
          numFixClient: response.data[0].numFixClient,
          lic: response.data[0].lic,
          referenceEqui: response.data[0].referenceEqui,
          nomTech: response.data[0].nomTech,
          nbVisite: response.data[0].nbVisite,
        }));
      })
      .catch((error) => {
        console.log(error);
      });

    if (this.props.location.state.service === "maintenance urbain") {
      this.setState({
        comptes: ["équipement", "gestion de qualité de service", "T1_BEZ"],
      });
    } else {
      this.setState({
        comptes: ["équipement", "maintenance urbain", "C7_BEZ", "C8_BEZ"],
      });
    }
  }

  ////////////////////////////////////
  render() {
    return (
      <div className="container">
        <img
          src={logo}
          id="img"
          style={{ marginTop: 10, marginLeft: 20, height: 60, width: 120 }}
        />
        <div className="sidebar">
          <ul className="sidebarList">
            {this.state.data.map((val, key) => {
              return (
                <li
                  className="row"
                  key={key}
                  onClick={() => {
                    this.props.history.push(val.link, {
                      service: this.props.location.state.service,
                    });
                  }}
                >
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="form">
          <div style={{ height: 5 }}></div>
          <div className="group">
            <h1>Les informations du dérangement</h1>
          </div>
          <div className="group1">
            <h2>Titre:</h2>
            <h3 id="info">{this.state.titre}</h3>
            <h2>Addresse de client:</h2>
            <h3 id="info">{this.state.addressClient}</h3>
            <h2>Date de signalisation:</h2>
            <h3 id="info">{this.state.dateSigna}</h3>

            <h2>Constitution:</h2>
            <h3 id="info">
              {this.state.constitutionTete}-{this.state.constitutionGroupe}-P
              {this.state.pair}
            </h3>

            <h2>Date limite:</h2>
            <h3 id="info">{this.state.dateLimit}</h3>

            <h2>Nom équipement (NE):</h2>
            <h3 id="info">
              {this.state.nomMsan}
              {this.state.referenceEqui}
              {this.state.lic}
            </h3>
          </div>

          <div className="group2">
            <h2>Nom client:</h2>
            <h3 id="info"> {this.state.nomClient}</h3>

            <h2>Type de dérangement:</h2>

            <h3 id="info">{this.state.typeDerang}</h3>

            <h2>Numero de contact de client:</h2>
            <h3 id="info">{this.state.numClient}</h3>

            <h2>Nom de l'équipe des techniciens:</h2>
            <h3 id="info">{this.state.nomTech}</h3>

            <h2>Numero Fix:</h2>
            <h3 id="info">{this.state.numFixClient}</h3>
            <h2>Nombre de visite du client :</h2>
            <h3 id="info">{this.state.nbVisite}</h3>
          </div>
          <div>
            <Menu
              direction="bottom"
              menuButton={<button style={buttonELTStyle}>Envoyer</button>}
            >
              {this.state.comptes.map((item) => {
                return (
                  <MenuItem
                    style={{ fontFamily: "roboto" }}
                    onClick={() => {
                      this.envoyerDer(item);
                    }}
                  >
                    {item}
                  </MenuItem>
                );
              })}
            </Menu>

            <div id="espace"></div>
          </div>
        </div>
      </div>
    );
  }
}

const buttonELTStyle = {
  background: "#27B8B8",
  color: "white",
  height: 40,
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  marginTop: "10%",
  cursor: "pointer",
  marginLeft: " 38%",
  outline: "none",
  width: "23%",
};
