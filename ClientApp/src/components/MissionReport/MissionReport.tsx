import React from 'react';
import { Container, Row, Form, InputGroup, Button, Col } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import axios from 'axios'

interface FormValues {
  twitterHandle: string,
  fieldNotes: string,
  passcode: string,
  timesCompleted: number,
  missionId: string,
  trustConfirmation: boolean,
};

const validationSchema = yup.object().shape({
  twitterHandle: yup.string()
    .required('Twitter handle is a required field')
    .min(4, 'Twitter handle must be at least 4 characters long')
    .max(15, 'Twitter handle must be less than 16 characters long')
    .matches(/^[0-9,a-z,A-Z,_]{4,15}$/, 'Twitter handle appears to be invalid'),
  fieldNotes: yup.string()
    .required('Field notes is a required field'),
  timesCompleted: yup.number()
    .typeError('Times completed must be a number')
    .required('Times completed is a required field')
    .positive('Times completed must be a positive number')
    .integer('Times completed must be a whole number')
    .max(1024, 'Times completed must be less than 1024'),
  trustConfirmation: yup.bool()
    .required()
    .oneOf([true], 'Trust confirmation must be completed'),
  missionId: yup.string()
    .typeError('Mission is a required field')
    .required('Mission is a required field')
});

const initialValues: FormValues = {
  twitterHandle: '',
  fieldNotes: '',
  passcode: '',
  timesCompleted: 1,
  missionId: '',
  trustConfirmation: false,
};

const MissionReport = () => {

  const handleServerResponse = (successful: boolean, responseCode: number) => {
    //TODO handle the response...
  };

  const sendReport = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    console.log({ values, helpers });

    axios.post("/api/mission-report", values)
      .then(response => {
        setTimeout(() => helpers.setSubmitting(false), 500);
        helpers.resetForm();
        handleServerResponse(true, response.status);
      })
      .catch(error => {
        setTimeout(() => helpers.setSubmitting(false), 500);
        handleServerResponse(false, error.response.status);
      });
  };

  return (
    <Container>
      <h1>Mission Report</h1>
      <Formik
        validationSchema={validationSchema}
        onSubmit={sendReport}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isSubmitting, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFormikTwitterHandle">
                <Form.Label>Twitter Handle</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="twitterHandle"
                    value={values.twitterHandle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.twitterHandle && !errors.twitterHandle}
                    isInvalid={touched.twitterHandle && !!errors.twitterHandle}
                  />
                  <Form.Control.Feedback type="invalid">{errors.twitterHandle}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="9" controlId="validationFormikMissionId">
                <Form.Label>Mission</Form.Label>
                <Form.Select
                  name="missionId"
                  value={values.missionId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.missionId && !errors.missionId}
                  isInvalid={touched.missionId && !!errors.missionId}
                >
                  <option></option>
                  <option value="1">Mission 001 - Sign Up</option>
                  <option value="2">Mission 002 - Pizza</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.missionId}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFormik05">
                <Form.Label>Times Completed</Form.Label>
                <Form.Control
                  type="text"
                  name="timesCompleted"
                  value={values.timesCompleted}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.timesCompleted && !errors.timesCompleted}
                  isInvalid={touched.timesCompleted && !!errors.timesCompleted}
                />
                <Form.Control.Feedback type="invalid">{errors.timesCompleted}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="9" controlId="validationFormik03">
                <Form.Label>Field Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="fieldNotes"
                  value={values.fieldNotes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.fieldNotes && !errors.fieldNotes}
                  isInvalid={touched.fieldNotes && !!errors.fieldNotes}
                />
                <Form.Control.Feedback type="invalid">{errors.fieldNotes}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFormik04">
                <Form.Label>Passcode</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="passcode"
                    value={values.passcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.passcode && !errors.passcode}
                    isInvalid={touched.passcode && !!errors.passcode}
                  />
                  <Form.Control.Feedback type="invalid">{errors.passcode}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group className="mb-3">
                <Form.Text id="passwordHelpBlock" muted>
                  Please confirm that you have completed the mission accurately and with integrity. We trust our Secret Agents and rely on integrity to ensure that this program is successful. Spot checks will be conducted periodically, so we ask that you raise concerns if you suspect any agents of gaming the system.
                </Form.Text>
                <Form.Check
                  required
                  name="trustConfirmation"
                  checked={values.trustConfirmation}
                  label="Trust Confirmation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.trustConfirmation && !!errors.trustConfirmation}
                  feedback={errors.trustConfirmation}
                  feedbackType="invalid"
                  id="trustConfirmation"
                />
              </Form.Group>
            </Row>

            <Button disabled={isSubmitting} type="submit">Send Report</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default MissionReport;