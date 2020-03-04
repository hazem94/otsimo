/** @format */

import React from "react";
import { Card, CardHeader, CardBody, CardText, Container, Row, Col, FormGroup, Button, Form } from "reactstrap";
import { Spring } from "react-spring/renderprops";
import Countdown from "./CountdownComponent";
import PropTypes from "prop-types";

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Question({ question, totalQuestionsCount, currentQuestionId, handleAnswer }) {
  if (!question) return <></>;
  const incorrectAnswers = question.incorrect_answers;
  const correctAnswer = [question.correct_answer];
  const options = shuffle(incorrectAnswers.concat(correctAnswer));
  const renderOptions = options.map((option, index) => {
    return (
      <Button key={index} className="btn-block" outline onClick={() => handleAnswer({ option }, correctAnswer[0])}>
        {option}
      </Button>
    );
  });

  return (
    <Spring from={{ opacity: 0, marginTop: -500 }} to={{ opacity: 1, marginTop: 0 }} config={{ delay: 200, duration: 500 }}>
      {props => (
        <div style={props}>
          <Container style={{ marginTop: "10%" }}>
            <Row>
              <Col>
                <Card>
                  <CardHeader className="bg-dark text-light">
                    <div className="d-flex">
                      <div className="p-2">
                        Question {parseInt(currentQuestionId) + 1} / {totalQuestionsCount}
                      </div>
                      <div className="p-2 ml-auto">
                        <Countdown remainingTime={15} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CardText>{question.question}</CardText>
                    <Form>
                      <FormGroup>{renderOptions}</FormGroup>
                    </Form>
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

// PropTypes
Question.propTypes = {
  question: PropTypes.object,
  totalQuestionsCount: PropTypes.number,
  currentQuestionId: PropTypes.number,
  handleAnswer: PropTypes.func
};
