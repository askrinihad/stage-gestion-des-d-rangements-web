import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSearch,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { MenuItem, MenuDivider, ControlledMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "../assets/image/logo.png";
import "../assets/stylesList.css";
export default class ListDerangementAbsent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDer: [],
      SearchedValue: "",
      SearchedList: [],
      checkedAll: false,
      checkedItems: [],
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
    this.getAbsent();
  }
  //////////////////////////////////////////:
  getAbsent = () => {
    fetch(
      "http://localhost:5000/derangement/afficherAbsent/web/" +
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
        var i;
        var a = [];
        for (i = 0; i < this.state.listDer.length; i++) {
          a[i] = false;
        }
        this.setState({ checkedItems: a }, () =>
          console.log(this.state.checkedItems)
        );
      });
  };

  ////////////////////////////////
  delete = (id) => {
    console.log(id);
    fetch("http://localhost:5000/derangement/supprimerAbsent/web/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.getAbsent();
      });
  };
  ////////////////////////////////////////////
  send = (id) => {
    fetch("http://localhost:5000/derangement/envoyerAbsentTech/web/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.getAbsent();
      });
  };
  ///////////////////////////////////////////////
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
  ///////////////////////////////////
  sendSelect = () => {
    console.log("select");
    var i;
    for (i = 0; i < this.state.SearchedList.length; i++) {
      if (this.state.checkedItems[i]) {
        this.send(this.state.SearchedList[i]._id);
      }
    }
  };
  //////////////////////////////////
  deleteSelect = () => {
    var i;
    for (i = 0; i < this.state.SearchedList.length; i++) {
      if (this.state.checkedItems[i]) {
        this.delete(this.state.SearchedList[i]._id);
      }
    }
  };
  ///////////////////////////////////
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
            <button
              style={btnStyle}
              onClick={() =>
                this.props.history.push("/ListeTraite", {
                  service: this.props.location.state.service,
                })
              }
            >
              {" "}
              Traité{" "}
            </button>
            <button style={btnStyleP}> Client absent </button>
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
            <input
              type="checkbox"
              style={checkBoxStyle}
              checked={this.state.checkedAll}
              onClick={() => {
                this.setState({ checkedAll: !this.state.checkedAll }, () => {
                  console.log(this.state.checkedAll);
                  var i;
                  var a = [];
                  for (i = 0; i < this.state.listDer.length; i++) {
                    a[i] = this.state.checkedAll;
                  }
                  this.setState({ checkedItems: a }, () =>
                    console.log(this.state.checkedItems)
                  );
                });
              }}
            />
            <p style={Pstyle}>Titre</p>
            <p style={Dstyle}>Date de signalisation</p>
            <FontAwesomeIcon
              icon={faEllipsisV}
              size="2.5x"
              style={IconHeaderStyle}
              onClick={() => this.setState({ isOpen: true })}
            />
            <div style={{ position: "relative", marginLeft: 820 }}>
              <ControlledMenu
                isOpen={this.state.isOpen}
                style={{ fontFamily: "roboto" }}
                onClose={() => this.setState({ isOpen: false })}
              >
                <MenuItem onClick={this.sendSelect}>Envoyer</MenuItem>
                <MenuDivider />
                <MenuItem onClick={this.deleteSelect}>Supprimer</MenuItem>
              </ControlledMenu>
            </div>
          </div>
          <div style={listeContainer}>
            {this.state.SearchedList.map((der) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    style={checkBoxStyle}
                    checked={
                      this.state.checkedItems[
                        this.state.SearchedList.indexOf(der)
                      ] || this.state.checkedAll
                    }
                    onClick={() => {
                      let a = [...this.state.checkedItems];
                      console.log(a);
                      a[this.state.SearchedList.indexOf(der)] = !a[
                        this.state.SearchedList.indexOf(der)
                      ];
                      this.setState({ checkedItems: a }, () => {
                        console.log(this.state.checkedItems);
                        var f = true;
                        for (
                          var i = 0;
                          i < this.state.SearchedList.length;
                          i++
                        ) {
                          if (!this.state.checkedItems[i]) {
                            f = false;
                          }
                        }
                        console.log("f " + f);
                        if (f) {
                          this.setState({ checkedAll: true });
                        }
                      });
                    }}
                  />
                  <div
                    style={titreELTStyle}
                    onClick={() =>
                      this.props.history.push("/InfoDer", {
                        titre: der.titre,
                        derangement: "absent",
                        id: der._id,
                        service: this.props.location.state.service,
                      })
                    }
                  >
                    <p>{der.titre}</p>
                  </div>
                  <div
                    style={dateELTStyle}
                    onClick={() =>
                      this.props.history.push("/InfoDer", {
                        titre: der.titre,
                        derangement: "absent",
                        id: der._id,
                        service: this.props.location.state.service,
                      })
                    }
                  >
                    <p>{der.dateSignal}</p>
                  </div>
                  <button
                    style={buttonELTStyle}
                    onClick={() => {
                      this.send(der._id);
                    }}
                  >
                    Envoyer
                  </button>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="2.5x"
                    style={iconELTStyle}
                    onClick={() => {
                      this.delete(der._id);
                    }}
                  />
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
const space = {
  backgroundColor: "#E1DADA",
  height: 1,
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
const checkBoxStyle = {
  height: 15,
  width: 15,
  display: "inline-block",
  marginLeft: 20,
};
const Pstyle = {
  display: "inline-block",
  fontFamily: "roboto",
  marginLeft: 160,
  color: "#54545A",
};
const Dstyle = {
  display: "inline-block",
  fontFamily: "roboto",
  marginLeft: 210,
  color: "#54545A",
};
const IconHeaderStyle = {
  marginLeft: 350,
  color: "#54545A",
  cursor: "pointer",
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
const titreELTStyle = {
  display: "inline-block",
  marginLeft: 120,
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
  cursor: "pointer",
  width: 100,
};
const dateELTStyle = {
  display: "inline-block",
  marginLeft: 170,
  fontFamily: "roboto",
  color: "#54545A",
  cursor: "pointer",
  fontSize: 14,
  width: 250,
};
const buttonELTStyle = {
  display: "inline-block",
  background: "#27B8B8",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: 10,
  cursor: "pointer",
  marginLeft: 150,
  outline: "none",
  width: 100,
};
const iconELTStyle = {
  display: "inline-block",
  marginLeft: 10,
  cursor: "pointer",
};
