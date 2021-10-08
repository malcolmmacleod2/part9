import React from "react";
import { Field, Form, Formik } from 'formik';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckEntry, HealthCheckRating } from '../types';

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

const AddHealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      description: "",
      date: "",
      specialist: "",
      type: "HealthCheck",
      diagnosisCodes: [],
      healthCheckRating: 0
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const invalidHealthCheckError = "Rating is invalid";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        } else if (!Object.values(HealthCheckRating).includes(values.healthCheckRating)) {
          errors.healthCheckRating = invalidHealthCheckError;
        }

        return errors;
    }}
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
            label="healthCheckRating"
            name="healthCheckRating"
            component={NumberField}
            min={HealthCheckRating.Healthy}
            max={HealthCheckRating.CriticalRisk}
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

export default AddHealthCheckEntryForm;