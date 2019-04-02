import * as React from "react";
import {TriviaState} from "../state";
import {Dispatch} from "redux";
import {answerQuestion, endRound, nextQuestion} from "../actions";
import {connect} from "react-redux";
import Question from "./Question";

const mapStateToProps = (state: TriviaState) => ({
    roundId: state.currentRound.id,
    question: state.currentRound.questions[state.currentRound.currentQuestion],
    questionIndex: state.currentRound.currentQuestion,
    isLastQuestion: state.currentRound.currentQuestion === state.currentRound.questions.length - 1
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        answerQuestion: (roundId: string, questionIndex: number, answerId: string) => {
            return dispatch(answerQuestion(roundId, questionIndex, answerId) as any);
        },
        nextQuestion: (roundId: string) => {
            return dispatch(nextQuestion(roundId));
        },
        endRound: (roundId: string) => {
            return dispatch(endRound(roundId));
        }
    }
};

const QuestionContainer = connect(mapStateToProps, mapDispatchToProps)(Question);
export default QuestionContainer;