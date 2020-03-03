import React from "react";
import {
  Form,
  Container,
  Col,
  Row,
  FormGroup,
  Button,
  Input,
  Label
} from "reactstrap";
import { Spring } from "react-spring/renderprops";

const cardStyle = {
  textAlign: "center",
  display: "block",
  margin: "auto"
};

export default function Welcome({ difficulty, onChange, onSubmit }) {
  return (
    <Spring
      from={{ opacity: 0, marginTop: -500 }}
      to={{ opacity: 1, marginTop: 0 }}
      config={{ delay: 200, duration: 500 }}
    >
      {props => (
        <div style={props}>
          <Container style={{ marginTop: "10%" }}>
            <Row>
              <Col sm={{ span: 1 }} style={cardStyle}>
                <Form onSubmit={onSubmit}>
                  <FormGroup>
                    <h3>
                      <strong>Trivia Game</strong>
                    </h3>
                    <img src="/assets/logo.png" alt="logo" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="difficulty">Select Difficulty Level</Label>
                    <Input
                      type="select"
                      id="difficulty"
                      name="difficulty"
                      value={difficulty}
                      onChange={onChange}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Button outline type="submit" color="primary" value="submit">
                      GET STARTED
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </Spring>
  );
}
