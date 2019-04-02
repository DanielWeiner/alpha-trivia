import * as React from 'react';
import {TriviaState} from "../state";
import {connect} from "react-redux";
import Quiz from "./Quiz";


const mapStateToProps = (state: TriviaState) => ({
    score: state.currentRound.score,
    // add 1 to the current question if it's been answered. This will make the progress bar increment while the answers are shown
    currentQuestion: state.currentRound.currentQuestion + Number(state.currentRound.questions[state.currentRound.currentQuestion].answer !== null),
    questionCount: state.currentRound.questions.length
});

const QuizContainer = connect(mapStateToProps, {})(Quiz);
export default QuizContainer;