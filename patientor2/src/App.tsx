import React from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { setDiagnoses, useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInformationPage from './PatientInformationPage';

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoses = async() => {
      try{
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses/`
        );
        
        dispatch(setDiagnoses(diagnoses));
      }
      catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
    void fetchDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id/">
              <PatientInformationPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
    </div>
  );
};

export default App;
