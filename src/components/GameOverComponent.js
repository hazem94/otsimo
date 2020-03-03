/** @format */

import React from "react";
import { Spring } from "react-spring/renderprops";
import {Container, Col, Row, Card, CardHeader, CardBody, CardText, Button, CardImg} from "reactstrap";

export default function GameOver({ restart }) {
  return (
    <Spring from={{ opacity: 0, marginTop: -500 }} to={{ opacity: 1, marginTop: 0 }} config={{ delay: 200, duration: 500 }}>
      {props => (
        <div style={props}>
          <Container style={{ marginTop: "10%" }}>
            <Row>
              <Col>
                <Card>
                  <CardHeader className="bg-dark text-light">
                    You are done <span role="img" aria-label="emoji">😜</span>
                  </CardHeader>
                  <CardBody>
                    <CardText>
                      <CardImg src="/assets/gameover.jpg" alt="gameover"/>
                    </CardText>
                    <Button color="danger" outline onClick={restart}>Try Again</Button>
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
