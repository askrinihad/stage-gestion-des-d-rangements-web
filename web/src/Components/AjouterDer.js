import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "../assets/styles.css";
import logo from "../assets/image/logo.png";
import { Alert } from "react-alert";
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

/////////////////////////////////////////
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.onChangeAddressClient = this.onChangeAddressClient.bind(this);
    this.onChangeTitre = this.onChangeTitre.bind(this);
    this.onChangeGroupe = this.onChangeGroupe.bind(this);
    this.onChangeTete = this.onChangeTete.bind(this);
    this.onChangeAmorce = this.onChangeAmorce.bind(this);
    this.onChangeMsan = this.onChangeMsan.bind(this);
    this.onChangeReference = this.onChangeReference.bind(this);
    this.onChangeNomClient = this.onChangeNomClient.bind(this);
    this.onChangeNumFix = this.onChangeNumFix.bind(this);
    this.onChangeNumClient = this.onChangeNumClient.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePair = this.onChangePair.bind(this);
    this.onChangeNomTech = this.onChangeNomTech.bind(this);
    this.onChangeLic = this.onChangeLic.bind(this);
    this.onChangeTypeDer = this.onChangeTypeDer.bind(this);
    this.save = this.save.bind(this);
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
      ///////////////////////:
      titre: "",
      nomClient: "",
      dateSignal: new Date(),
      tete: "",
      groupe: "",
      amorce: "",
      pair: "",
      addressClient: "",
      numClient: "",
      numFix: "",
      nomTech: "",
      msan: "",
      reference: "",
      lic: "",
      typeDer: "",
      der: [
        { value: "Pas de tonalité", label: "Pas de tonalité" },
        { value: "Pas d'appel Emis/reçu", label: "Pas d'appel Emis/reçu" },
        { value: "Friture sur ligne", label: "Friture sur ligne" },
        { value: "Chute de débit internet", label: "Chute de débit internet" },
        { value: "Pas d'internet", label: "Pas d'internet" },
        { value: "Liaison spécialisée", label: "Liaison spécialisée" },
        { value: "IDOOM internet Pro", label: "IDOOM internet Pro" },
        { value: "Intranet/VPN", label: "Intranet/VPN" },
        {
          value: "Problème signaux non rétablies",
          label: "Problème signaux non rétablies",
        },
        { value: "Ping élevé", label: "Ping élevé" },
        { value: "Upload faible", label: "Upload faible" },
      ],
    };
  }

  /*----les fonctions---------------- */
  onChangeTitre(e) {
    this.setState({
      titre: e.target.value,
    });
  }
  onChangeNomClient(e) {
    this.setState({
      nomClient: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      dateSignal: date,
    });
  }
  //////////////
  onChangeTete(e) {
    this.setState({
      tete: e.target.value,
    });
  }
  //////////////////////
  onChangeGroupe(e) {
    this.setState({
      groupe: e.target.value,
    });
  }
  ///////////////////////
  onChangeAmorce(e) {
    this.setState({
      amorce: e.target.value,
    });
  }
  ///////////////////////////
  onChangePair(e) {
    this.setState({
      pair: e.target.value,
    });
  }
  /////////////////////////////
  onChangeNumClient(e) {
    this.setState({
      numClient: e.target.value,
    });
  }
  ///////////////////////////////
  onChangeNumFix(e) {
    this.setState({
      numFix: e.target.value,
    });
  }
  /////////////////////////
  onChangeNomTech(e) {
    this.setState({
      nomTech: e.target.value,
    });
  }
  onChangeMsan(e) {
    this.setState({
      msan: e.target.value,
    });
  }
  onChangeAddressClient(e) {
    this.setState({
      addressClient: e.target.value,
    });
  }
  onChangeReference(e) {
    this.setState({
      reference: e.target.value,
    });
  }
  ////////////
  onChangeLic(e) {
    this.setState({
      lic: e.target.value,
    });
    console.log(this.state.lic);
  }
  /////////////
  onChangeTypeDer(e) {
    this.setState({
      typeDer: e.value,
    });
  }
  ////////////////////////////
  save = (e) => {
    e.preventDefault();
    if (
      this.state.titre === "" ||
      this.state.nomClient === "" ||
      this.state.numClient === "" ||
      this.state.addressClient === "" ||
      this.state.tete === "" ||
      this.state.groupe === "" ||
      this.state.amorce === "" ||
      this.state.msan === "" ||
      this.state.pair === "" ||
      this.state.typeDer === "" ||
      this.state.reference === "" ||
      this.state.nomTech === ""
    ) {
      alert("veuillez remplir tout les champs");
    } else {
      var result = this.state.dateSignal;
      result.setDate(result.getDate() + 2);

      axios
        .post("http://localhost:5000/derangement/Ajouter/web", {
          titre: this.state.titre,
          dateSignal: this.state.dateSignal,
          dateLimit: result,
          nomClient: this.state.nomClient,
          numClient: this.state.numClient,
          addressClient: this.state.addressClient,
          constitutionTete: this.state.tete,
          constitutionGroupe: this.state.groupe,
          constitutionAmorce: this.state.amorce,
          nomMsan: this.state.msan,
          pair: this.state.pair,
          typeDerang: this.state.typeDer,
          numFixClient: this.state.numFix,
          lic: this.state.lic,
          referenceEqui: this.state.reference,
          nomTech: this.state.nomTech,
        })
        .then((response) => {
          console.log(response.data.message);
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  /////////////////////////
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

        <form onSubmit={this.save}>
          <div className="form-group">
            <h1>Ajouter dérangement</h1>
          </div>
          <div className="form-group">
            <span className="first">Titre</span>
            <span className="second">Nom client</span>
          </div>
          <div className="form-group">
            <input
              id="titreInput"
              type="text"
              placeholder="Titre..."
              className="form-control"
              value={this.state.titre}
              onChange={this.onChangeTitre}
            />
            <input
              id="nomClientInput"
              type="text"
              placeholder="Nom de client ..."
              className="form-control"
              value={this.state.nomClient}
              onChange={this.onChangeNomClient}
            />
          </div>
          <div className="form-group">
            <label id="dateLabel">Date de signalisation</label>
            <label id="numClientLabel">Numéro de contact du client</label>
          </div>
          <div className="form-group">
            <DatePicker
              id="dateInput"
              placeholder="Date de signalisation..."
              selected={this.state.dateSignal}
              onChange={this.onChangeDate}
            />
            <input
              id="numClientInput"
              type="text"
              placeholder="Numéro de contact du client..."
              className="form-control"
              value={this.state.numClient}
              onChange={this.onChangeNumClient}
            />
          </div>
          <div className="form-group">
            <label id="contitutionLabel">Constitution</label>
            <label id="numClientLabel">Addresse de client</label>
          </div>
          <div className="form-group">
            <input
              id="teteInput"
              type="text"
              placeholder="Tete"
              className="form-control"
              value={this.state.tete}
              onChange={this.onChangeTete}
            />
            <input
              id="groupeInput"
              placeholder="Groupe"
              type="number"
              className="form-control"
              value={this.state.groupe}
              onChange={this.onChangeGroupe}
            />
            <div id="space"></div>
            <input
              id="AddressClientInput"
              placeholder="Addresse de client..."
              type="text"
              className="form-control"
              value={this.state.addressClient}
              onChange={this.onChangeAddressClient}
            />
          </div>
          <div className="form-group">
            <label id="fixLabel">Numéro fix de client</label>
          </div>
          <div className="form-group">
            <input
              id="amorceInput"
              placeholder="Amorce..."
              type="number"
              className="form-control"
              value={this.state.amorce}
              onChange={this.onChangeAmorce}
            />

            <input
              id="pairInput"
              type="number"
              placeholder="Paire..."
              className="form-control"
              value={this.state.pair}
              onChange={this.onChangePair}
            />
            <div id="space"></div>
            <input
              type="text"
              placeholder="Numéro fix de client..."
              id="numFixInput"
              className="form-control"
              value={this.state.numFix}
              onChange={this.onChangeNumFix}
            />
          </div>
          <div className="form-group">
            <label id="neLabel">NE</label>
            <label id="label">Nom de l'équipe des techniciens</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Msan..."
              id="msanInput"
              className="form-control"
              value={this.state.msan}
              onChange={this.onChangeMsan}
            />
            <input
              id="referenceInput"
              type="number"
              placeholder="Réference..."
              className="form-control"
              value={this.state.reference}
              onChange={this.onChangeReference}
            />
            <div id="space"></div>
            <input
              id="nomTechInput"
              placeholder="Nom de l'équipe des techniciens..."
              type="text"
              className="form-control"
              value={this.state.nomTech}
              onChange={this.onChangeNomTech}
            />
          </div>
          <div className="form-group">
            <label id="fixLabel">Type de dérangement</label>
          </div>
          <div className="form-group">
            <input
              id="licInput"
              type="number"
              placeholder="Lic..."
              className="form-control"
              value={this.state.lic}
              onChange={this.onChangeLic}
            />
            <div id="spacelast"></div>
            <div className="dropdown">
              <Dropdown
                options={this.state.der}
                onChange={this.onChangeTypeDer}
                value={this.state.typeDer}
                placeholder="le type de dérangement..."
              />
            </div>
            ;
          </div>
          <div className="form-group">
            <button
              id="btn"
              onClick={this.save}
              type="submit"
              className="btn btn-primary"
            >
              Ajouter
            </button>
            <div id="espace"></div>
          </div>
        </form>
        <div style={{ height: 100 }}></div>
      </div>
    );
  }
}
