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
export default class AjouterPc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPC: [],
      selectedItems: [],
      isOpen: false,
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
    this.getPCNonAjoute();
  }
  //////////////////////////////////////////:
  getPCNonAjoute = () => {
    fetch("http://localhost:5000/pc/getListPcNonAjoute", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ listPC: responseJson });
        this.setState({ SearchedList: responseJson }, () =>
          console.log(this.state.SearchedList)
        );
      });
  };
  ///////////////////////////////////////////////

  /////////////////////////////////////////

  add = (pc) => {
    console.log(pc);
    fetch("http://localhost:5000/pc/ajouterPc/web", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tete: pc.tete,
        groupe: pc.groupe,
        amorce: pc.amorce,
        latitude: pc.latitude,
        longitude: pc.longitude,
        pair: pc.pair,
        nbrPairMax: pc.nbrPairMax,
        nbrPairOccupe: pc.nbrPairOccupe,
        compte: pc.compte,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.message);
      });

    /******************* */
    fetch("http://localhost:5000/pc/supprimerPcNonAjoute/web/" + pc._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.getPCNonAjoute();
        alert(responseJson.message);
      });
  };
  ///////////////////////////////////
  addSelect = () => {
    var i;
    for (i = 0; i < this.state.SearchedList.length; i++) {
      if (this.state.checkedItems[i]) {
        this.add(this.state.SearchedList[i]);
      }
    }
  };

  //////////////////////////////
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
                //this.search()
                console.log("hgvhgggfc");
              }
            }}
          />

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
                  for (i = 0; i < this.state.listPC.length; i++) {
                    a[i] = this.state.checkedAll;
                  }
                  this.setState({ checkedItems: a }, () =>
                    console.log(this.state.checkedItems)
                  );
                });
              }}
            />
            <p style={Pstyle}>Constitution</p>
            <p style={Pstyle}>Nombre max de pairs</p>
            <p style={Pstyle}>Nombre de pairs occupés</p>
            <p style={Pstyle}>Equipe</p>
            <FontAwesomeIcon
              icon={faEllipsisV}
              size="2.5x"
              style={IconHeaderStyle}
              onClick={() => this.setState({ isOpen: true })}
            />
            <div style={{ position: "relative", marginLeft: 820 }}>
              <ControlledMenu
                isOpen={this.state.isOpen}
                onClose={() => this.setState({ isOpen: false })}
              >
                <MenuItem onClick={this.addSelect}>Ajouter</MenuItem>
              </ControlledMenu>
            </div>
          </div>
          <div style={listeContainer}>
            {this.state.SearchedList.map((pc, key) => {
              key = { key };
              return (
                <div>
                  <input
                    type="checkbox"
                    style={checkBoxStyle}
                    checked={
                      this.state.checkedItems[
                        this.state.SearchedList.indexOf(pc)
                      ] || this.state.checkedAll
                    }
                    onClick={() => {
                      let a = [...this.state.checkedItems];
                      console.log(a);
                      a[this.state.SearchedList.indexOf(pc)] = !a[
                        this.state.SearchedList.indexOf(pc)
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

                  <div style={ConstELTStyle}>
                    <p>
                      {pc.tete}-{pc.groupe}-{pc.amorce}
                    </p>
                  </div>
                  <div style={maxELTStyle}>
                    <p>{pc.nbrPairMax}</p>
                  </div>
                  <div style={OccELTStyle}>
                    <p>{pc.nbrPairOccupe}</p>
                  </div>
                  <div style={compteELTStyle}>
                    <p>{pc.compte}</p>
                  </div>
                  <button
                    style={buttonELTStyle}
                    onClick={() => {
                      this.add(pc);
                    }}
                  >
                    Ajouter
                  </button>
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
  marginLeft: 60,
  color: "#54545A",
};
const space = {
  backgroundColor: "#E1DADA",
  height: 1,
};
const IconHeaderStyle = {
  marginLeft: 200,
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
const ConstELTStyle = {
  display: "inline-block",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 70,
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
  width: 100,
};
const maxELTStyle = {
  display: "inline-block",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 100,
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
  width: 80,
};
const OccELTStyle = {
  display: "inline-block",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 155,
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
  width: 80,
};
const compteELTStyle = {
  display: "inline-block",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 80,
  fontFamily: "roboto",
  color: "#54545A",
  fontSize: 14,
  width: 80,
};

const buttonELTStyle = {
  display: "inline-block",
  background: "#27B8B8",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: 10,
  cursor: "pointer",
  marginLeft: 80,
  outline: "none",
  width: 100,
};
