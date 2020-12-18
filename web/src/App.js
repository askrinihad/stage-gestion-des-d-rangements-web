import React, { Component } from "react";
import Login from "./Components/Login";
import AjouterDer from "./Components/AjouterDer";
import ListeDerangementAttente from "./Components/ListDerangementAttente";
import ListeDerangementAbsent from "./Components/ListDerangementAbsent";
import ListeDerangementTraite from "./Components/ListDerangementTraite";
import ListeDerangementProbléme from "./Components/ListDerangementProbléme";
import ListeDerangementAjouté from "./Components/ListDerangementAjouté";
import InfoDer from "./Components/InfoDer";
import InfoDerPb from "./Components/InfoDerPb";
import EtatPc from "./Components/EtatPc";
import AjouterPc from "./Components/AjouterPc";
import InfoDerTraite from "./Components/InfoDerTraite";
import InfoDerAttente from "./Components/InfoDerAttente ";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/EtatPc" component={EtatPc} />
          <Route exact path="/AjouterDer" component={AjouterDer} />
          <Route exact path="/InfoDerPb" component={InfoDerPb} />
          <Route exact path="/InfoDerAttente" component={InfoDerAttente} />
          <Route exact path="/InfoDerTraite" component={InfoDerTraite} />
          <Route
            exact
            path="/ListeAttente"
            component={ListeDerangementAttente}
          />
          <Route exact path="/ListeAbsent" component={ListeDerangementAbsent} />
          <Route exact path="/ListeTraite" component={ListeDerangementTraite} />
          <Route
            exact
            path="/ListeProbléme"
            component={ListeDerangementProbléme}
          />
          <Route exact path="/ListeAjouté" component={ListeDerangementAjouté} />
          <Route exact path="/InfoDer" component={InfoDer} />
          <Route exact path="/AjouterPc" component={AjouterPc} />
        </Switch>
      </Router>
    );
  }
}
