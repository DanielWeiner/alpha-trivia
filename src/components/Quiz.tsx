import * as React from "react";
import QuestionContainer from "./QuestionContainer";
import {LinearProgress} from "@material-ui/core";

interface QuizState {
    currentQuestion: number;
    score: number;
    questionCount: number;
}
const Quiz = ({currentQuestion, score, questionCount} : QuizState) => {
    return (
        <>
            <h3 className="quiz-header">Score: {score}</h3>
            <LinearProgress variant="determinate" value={100 * (currentQuestion / questionCount)}/>
            <QuestionContainer/>
        </>
    )
};

export default Quiz;
