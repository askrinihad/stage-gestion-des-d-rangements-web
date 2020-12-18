import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "../assets/image/logo.png";
import "../assets/stylesList.css";
export default class ListDerangementTraite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDer: [],
      SearchedValue: "",
      SearchedList: [],
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
          link: "/AjouterPc",
        },
        {
          title: "Déconnecter",
          icon: <ExitToAppIcon />,
          link: "/",
        },
      ],
    };
  }
  componentDidMount() {
    this.getTraite();
  }
  //////////////////////////////////////////:
  getTraite = () => {
    fetch(
      "http://localhost:5000/derangement/afficherTraite/web/" +
        this.props.location.state.service,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ listDer: responseJson }, () =>
          console.log(this.state.listDer)
        );
        this.setState({ SearchedList: responseJson }, () =>
          console.log(this.state.SearchedList)
        );
      });
  };
  //////////////////////////////////////////::
  search = () => {
    if (this.state.SearchedValue === "") {
      this.setState({ SearchedList: this.state.listDer });
    } else {
      var i;
      var a = [];
      for (i = 0; i < this.state.listDer.length; i++) {
        if (
          this.state.listDer[i].titre === this.state.SearchedValue ||
          this.state.listDer[i].nomClient === this.state.SearchedValue ||
          this.state.listDer[i].typeDerang === this.state.SearchedValue ||
          this.state.listDer[i].nomTech === this.state.SearchedValue ||
          this.state.listDer[i].numFixClient === this.state.SearchedValue ||
          this.state.listDer[i].addressClient === this.state.SearchedValue
        ) {
          a.push(this.state.listDer[i]);
        }
      }
      this.setState({ SearchedList: a });
    }
  };

  ///////////////////////////////////////////////
  render() {
    return (
      <div>
        <img
          src={logo}
          alt="img"
          style={{
            marginTop: 10,
            marginLeft: 20,
            height: 60,
            width: 120,
            position: "fixed",
          }}
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

        <div style={container}>
          <div style={{ display: "inline-block" }}>
            <div style={SearchIconContainer}>
              <FontAwesomeIcon icon={faSearch} size="2.5x" style={IconStyle} />
            </div>
          </div>
          <input
            type="text"
            placeholder=" chercher..."
            style={searchInput}
            onChange={(event) => {
              this.setState({ SearchedValue: event.target.value });
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                this.search();
              }
            }}
          />

          <div style={{ position: "relative", top: 50, left: 250 }}>
            <button
              style={btnStyle}
              onClick={() =>
                this.props.history.push("/ListeAjouté", {
                  service: this.props.location.state.service,
                })
              }
            >
              {" "}
              Ajouté{" "}
            </button>
            <button
              style={btnStyle}
              onClick={() =>
                this.props.history.push("/ListeAttente", {
                  service: this.props.location.state.service,
                })
              }
            >
              {" "}
              En attente{" "}
            </button>
            <button style={btnStyleP}> Traité </button>
            <button
              style={btnStyle}
              onClick={() =>
                this.props.history.push("/ListeAbsent", {
                  service: this.props.location.state.service,
                })
              }
            >
              {" "}
              Client absent{" "}
            </button>
            <button
              style={btnStyle}
              onClick={() =>
                this.props.history.push("/ListeProbléme", {
                  service: this.props.location.state.service,
                })
              }
            >
              {" "}
              Probléme{" "}
            </button>
          </div>
          <div style={HeaderList}>
            <p style={Pstyle}>Titre</p>
            <p style={DSstyle}>Date de signalisation</p>
            <p style={Pstyle}>Nom de l'équipe technicien</p>
            <p style={DTstyle}>Date de traitement</p>
          </div>
          <div style={listeContainer}>
            {this.state.SearchedList.map((der) => {
              return (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.props.history.push("/InfoDerTraite", {
                      titre: der.titre,
                      id: der._id,
                      service: this.props.location.state.service,
                    })
                  }
                >
                  <div style={textELTStyle}>
                    <p>{der.titre}</p>
                  </div>
                  <div style={dateELTStyle}>
                    <p>{der.dateSignal}</p>
                  </div>
                  <div style={textELTStyle}>
                    <p> {der.nomTech}</p>
                  </div>
                  <div style={dateELTStyle}>
                    <p>{der.dateTraitement}</p>
                  </div>
                  <div style={space}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
const container = {
  left: "20%",
  backgroundColor: "#F8F8F8",
  height: "100vh",
  width: "80%",
  position: "fixed",
};
const searchInput = {
  position: "relative",
  border: "none",
  borderWidth: 0.5,
  borderRadius: "0px 15px 15px 0px",
  height: 29,
  width: 220,
  top: 54.9,
  left: 160,
  outline: "none",
  backgroundColor: "white",
};
const SearchIconContainer = {
  position: "relative",
  height: 30,
  width: 280,
  left: 390,
  top: 50,
  backgroundColor: "white",
  boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
  borderRadius: "15px 15px 15px 15px",
};
const IconStyle = {
  color: "#455956",
  position: "relative",
  left: 25,
  top: 7,
};
const btnStyleP = {
  background: "#27B8B8",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: 10,
  cursor: "pointer",
  boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
  marginLeft: 20,
  outline: "none",
  width: 100,
};
const btnStyle = {
  background: "white",
  color: "#27B8B8",
  border: "none",
  padding: "5px 10px",
  borderRadius: 10,
  cursor: "pointer",
  boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
  marginLeft: 20,
  outline: "none",
  width: 100,
  marginTop: 30,
};
const HeaderList = {
  display: "inline-block",
  flexDirection: "row",
  backgroundColor: "#E1DADA",
  position: "relative",
  top: 100,
  left: 50,
  width: "90%",
  borderRadius: 10,
  boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
};
const Pstyle = {
  display: "inline-block",
  fontFamily: "roboto",
  marginLeft: 90,
  color: "#54545A",
};
const DSstyle = {
  display: "inline-block",
  fontFamily: "roboto",
  marginLeft: 130,
  color: "#54545A",
};
const DTstyle = {
  display: "inline-block",
  fontFamily: "roboto",
  marginLeft: 60,
  color: "#54545A",
};
const listeContainer = {
  display: "inline-block",
  flexDirection: "row",
  backgroundColor: "white",
  position: "relative",
  top: 100,
  left: 50,
  height: 400,
  width: "90%",
  borderRadius: 10,
  boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
  overflowY: "auto",
};
const space = {
  backgroundColor: "#E1DADA",
  height: 1,
};
const textELTStyle = {
  display: "inline-block",
  marginLeft: 70,
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
  width: 100,
};
const dateELTStyle = {
  display: "inline-block",
  marginLeft: 70,
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
  width: 250,
};
