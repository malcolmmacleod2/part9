import React from "react";
import { Field, Form, Formik } from 'formik';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */
export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      description: "",
      date: "",
      specialist: "",
      type: "OccupationalHealthcare",
      diagnosisCodes: [],
      employerName: "",
      sickLeave: {
        startDate: "",
        endDate: ""
      }
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const invalidDate = "Date is invalid";
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

        if (!values.employerName) {
          errors.employerName = requiredError;
        }

        if (!values.sickLeave.startDate) {
          errors.sickleave = requiredError;
        } else if (!Date.parse(values.sickLeave.startDate)){
          errors.sickLeave = invalidDate;
        }

        if (!values.sickLeave.endDate) {
          errors.sickleave = requiredError;
        } else if (!Date.parse(values.sickLeave.endDate)){
          errors.sickLeave = invalidDate;
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
            label="Employer Name"
            placeholder="Employer"
            name="employerName"
            component={TextField}
          />

         <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />

           <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
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

export default AddOccupationalHealthcareEntryForm;