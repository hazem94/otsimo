/** @format */

import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Welcome from "./WelcomeComponent";
import Question from "./QuestionComponent";
import Axios from "axios";
import CorrectAnswer from "./CorrectAnswerComponent";
import GameOver from "./GameOverComponent";
import Winner from "./WinnerComponent";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "easy",
      questions: [],
      totalQuestionsCount: 0,
      currentQuestionId: 0,
      currentAnswer: ""
    };

    // Binding
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handlers
  handleSubmit = event => {
    event.preventDefault();
    this.setQuestions();
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  setQuestions = () => {
    Axios.get(`https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${this.state.difficulty}`).then(response => {
      const fetchedQuestions = response.data.results;
      this.setState({
        questions: fetchedQuestions,
        totalQuestionsCount: fetchedQuestions.length
      });
    });
    // redirect on form submission
    this.props.history.push("/questions");
  };

  handleAnswer = (answer, correctAnswer) => {
    this.setState({ currentAnswer: answer.option });
    // check if the answer correct => render CorrectAnswer Component else, GameOver Component
    if (answer.option === correctAnswer) {
      this.props.history.push("/correctAnswer");
    } else {
      this.props.history.push("/gameOver");
    }
  };

  onNext = () => {
    const counter = this.state.currentQuestionId + 1;
    // handle if all questions are answered correctly
    if (counter >= this.state.totalQuestionsCount) {
      this.props.history.push("/winner")
    } else {
      this.setState({ currentQuestionId: counter });
      this.props.history.push("/questions");
    }
  };

  restart = () => {
    // reset the state of the app
    this.setState({
      difficulty: "easy",
      questions: [],
      totalQuestionsCount: 0,
      currentQuestionId: 0,
      currentAnswer: ""
    });
    this.props.history.push("/");
  };

  // Components calling
  welcomePage = () => {
    return (
      <Welcome
        difficulty={this.state.difficulty}
        onChange={event => this.handleChange(event)}
        onSubmit={event => this.handleSubmit(event)}
      />
    );
  };

  questionPage = () => {
    return (
      <Question
        question={this.state.questions[this.state.currentQuestionId]}
        totalQuestionsCount={this.state.totalQuestionsCount}
        currentQuestionId={this.state.currentQuestionId}
        handleAnswer={(answer, correctAnswer) => this.handleAnswer(answer, correctAnswer)}
        gameOverPage={this.gameOverPage}
      />
    );
  };

  correctAnswerPage = () => {
    return (
      <CorrectAnswer
        currentQuestionId={this.state.currentQuestionId}
        totalQuestionsCount={this.state.totalQuestionsCount}
        onNext={this.onNext}
      />
    );
  };

  gameOverPage = () => {
    return <GameOver restart={this.restart} />;
  };

  winnerPage = () => {
    return <Winner restart={this.restart} />
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={this.welcomePage} />
        <Route path="/questions" component={this.questionPage} />
        <Route path="/correctAnswer" component={this.correctAnswerPage} />
        <Route path="/gameOver" component={this.gameOverPage} />
        <Route path="/winner" component={this.winnerPage} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default withRouter(MainComponent);
