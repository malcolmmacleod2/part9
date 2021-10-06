import React from "react";
import { Field, Form, Formik } from 'formik';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */
export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      description: "",
      date: "",
      specialist: "",
      type: "Hospital",
      diagnosisCodes: [],
      discharge: {
        criteria: "",
        date: ""
      }
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const invalidDateError = "Date field is invalid";

      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      } else if (!Date.parse(values.date)) {
        errors.date = invalidDateError;
      }

      if (!values.discharge.date) {
        errors.discharge_date = requiredError;
      } else if (!Date.parse(values.discharge.date)) {
        errors.discharge_date = invalidDateError;
      }

      if (!values.discharge.criteria) {
        errors.discharge_criteria = requiredError;
      }

      return errors;
    }
  }
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />    

          <Field
            label="Discharge Criteria"
            placeholder="Discharge Criteria"
            name="discharge_criteria"
            component={TextField}
          />
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge_date"
            component={TextField}
          />


          <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddHospitalEntryForm;