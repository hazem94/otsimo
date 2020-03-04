/** @format */

import React from "react";
import { Spring } from "react-spring/renderprops";
import { Container, Row, Col, Button, Card, CardHeader, CardBody, CardText } from "reactstrap";
import PropTypes from "prop-types";

export default function CorrectAnswer({ currentQuestionId, totalQuestionsCount, onNext }) {
  // if questions not set yet, return
  if (!totalQuestionsCount) return <></>;
  return (
    <Spring from={{ opacity: 0, marginTop: -500 }} to={{ opacity: 1, marginTop: 0 }} config={{ delay: 200, duration: 500 }}>
      {props => (
        <div style={props}>
          <Container style={{ marginTop: "10%" }}>
            <Row>
              <Col>
                <Card>
                  <CardHeader className="bg-dark text-light">
                    Question {parseInt(currentQuestionId) + 1} / {totalQuestionsCount}
                  </CardHeader>
                  <CardBody>
                    <CardText>
                      <i className="fa fa-check fa-lg" />
                      {" Correct!"}
                    </CardText>
                    <Button outline className="btn-block" onClick={onNext} color="success">
                      Next Question
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </Spring>
  );
}

// propTypes
CorrectAnswer.propTypes = {
  currentQuestionId: PropTypes.number,
  totalQuestionsCount: PropTypes.number,
  onNext: PropTypes.func
};
