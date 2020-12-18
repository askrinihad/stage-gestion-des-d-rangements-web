import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSearch,
  faEllipsisV,
  faCheckSquare,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "../assets/image/logo.png";
import "../assets/stylesList.css";
////////////////////////////////////////////
export default class EtatPc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPc: [
        {
          pc: {},
          icon: (
            <FontAwesomeIcon
              icon={faCheckSquare}
              size="2.5x"
              style={{ color: "0DA235" }}
            />
          ),
          etat: "",
        },
      ],
      list: [],
      SearchedValue: "",
      SearchedList: [
        {
          pc: {},
          icon: (
            <FontAwesomeIcon
              icon={faCheckSquare}
              size="2.5x"
              style={{ color: "0DA235" }}
            />
          ),
        },
      ],
      ////////////////////
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
          link: "/EtatPC",
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
  /*----les fonctions--------------- */
  search = () => {
    if (this.state.SearchedValue === "") {
      this.setState({ SearchedList: this.state.listPc });
    } else {
      var i;
      var a = [];
      if (
        this.state.SearchedValue === "non saturé" ||
        this.state.SearchedValue === "non sature"
      ) {
        this.state.listPc.map((pc) => {
          if (pc.pc.nbrPairMax != pc.pc.nbrPairOccupe) {
            a.push(pc);
          }
        });
      } else {
        if (
          this.state.SearchedValue === "saturé" ||
          this.state.SearchedValue === "sature"
        ) {
          this.state.listPc.map((pc) => {
            if (pc.pc.nbrPairMax === pc.pc.nbrPairOccupe) {
              a.push(pc);
            }
          });
        } else {
          for (i = 0; i < this.state.listPc.length; i++) {
            if (
              this.state.listPc[i].pc.nbrPairMax === this.state.SearchedValue ||
              this.state.listPc[i].pc.nbrPairOccupe ===
                this.state.SearchedValue ||
              this.state.listPc[i].pc.tete +
                "-" +
                this.state.listPc[i].pc.groupe +
                "-" +
                this.state.listPc[i].pc.amorce ===
                this.state.SearchedValue
            ) {
              a.push(this.state.listPc[i]);
            }
          }
        }
      }

      this.setState({ SearchedList: [...a] });
    }
  };
  ////////////////////////////
  componentDidMount() {
    fetch("http://localhost:5000/pc/getListPc", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ list: responseJson });
        let inter = [...this.state.listPc];
        responseJson.map((pc, key) => {
          inter[key] = { ...inter[key], pc: pc };

          if (pc.nbrPairMax === pc.nbrPairOccupe) {
            inter[key] = { ...inter[key], etat: "PC Saturé" };
            inter[key] = {
              ...inter[key],
              icon: (
                <FontAwesomeIcon
                  icon={faWindowClose}
                  size="2.5x"
                  style={{ color: "FF0012" }}
                />
              ),
            };
          } else {
            inter[key] = { ...inter[key], etat: "PC non Saturé" };
            inter[key] = {
              ...inter[key],
              icon: (
                <FontAwesomeIcon
                  icon={faCheckSquare}
                  size="2.5x"
                  style={{ color: "0DA235" }}
                />
              ),
            };
          }
        });
        this.setState({ listPc: inter, SearchedList: inter });
        console.log(inter);
      });
  }
  /////////////////////////////

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
        <div style={body}>
          <div style={{ display: "inline-block" }}>
            <div style={SearchIconContainer}>
              <FontAwesomeIcon icon={faSearch} size="2.5x" style={IconStyle} />
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
          </div>
          <div style={HeaderList}>
            <p style={Pstyle}>Constitution</p>
            <p style={Dstyle}>Etat</p>
            <p style={libreStyle}>Nombre de paires libres</p>
            <p style={Pstyle}>Nombre de paires occupées</p>
          </div>
          <div style={listeContainer}>
            {this.state.SearchedList.map((pc) => {
              return (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.props.history.push("/InfoPc", {
                      id: pc._id,
                      service: this.props.location.state.service,
                    })
                  }
                >
                  <div style={constitution}>
                    <p>
                      {pc.pc.tete}-{pc.pc.groupe}-{pc.pc.amorce}
                    </p>
                  </div>
                  <div style={dateELTStyle}>
                    <p>
                      {" "}
                      {pc.icon} {pc.etat}{" "}
                    </p>
                  </div>
                  <div style={textELTStyle}>
                    <p>
                      {" "}
                      {parseFloat(pc.pc.nbrPairMax) -
                        parseFloat(pc.pc.nbrPairOccupe)}
                    </p>
                  </div>
                  <div style={textELTStyle}>
                    <p> {pc.pc.nbrPairOccupe}</p>
                  </div>

                  <div style={space}></div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ height: "15%" }}></div>
      </div>
    );
  }

  //////////////////////////////
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
  height: 30,
  width: 220,
  left: 440,
  top: 40,
  outline: "none",
  backgroundColor: "white",
};
const SearchIconContainer = {
  position: "relative",
  height: 32,
  width: 280,
  left: 390,
  top: 72,
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
const space = {
  backgroundColor: "#E1DADA",
  height: 1,
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
  marginLeft: 50,
  color: "#54545A",
};
const libreStyle = {
  display: "inline-block",
  fontFamily: "roboto",
  marginLeft: 160,
  color: "#54545A",
};
const Dstyle = {
  display: "inline-block",
  fontFamily: "roboto",
  marginLeft: 160,
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
const textELTStyle = {
  display: "inline-block",
  marginLeft: "13%",
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
  width: 110,
};
const constitution = {
  display: "inline-block",
  marginLeft: "7%",
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
  width: 110,
};
const body = {
  left: "20%",
  backgroundColor: "#F8F8F8",
  height: "100vh",
  width: "80%",
  position: "fixed",
};
const dateELTStyle = {
  display: "inline-block",
  marginLeft: 100,
  width: 150,
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
};
