import * as React from "react";
import {TriviaQuestion} from "../state";
import RawHTML from "./RawHTML";
import {Card, Icon, List, ListItem} from "@material-ui/core";

interface QuestionState {
    roundId: string;
    question: TriviaQuestion;
    questionIndex: number;
    answerQuestion: (roundId: string, questionIndex: number, answerId: string) => void;
    isLastQuestion: boolean;
    nextQuestion: (roundId: string) => void;
    endRound: (roundId: string) => void;
}

const ANSWER_TIMEOUT_MS = 750;

const Question = ({roundId, question, questionIndex, answerQuestion, nextQuestion, endRound, isLastQuestion}: QuestionState) => {
    const text = question.question;
    const answered = question.answer !== null;

    if (question.answer !== null) {
        if (isLastQuestion) {
            setTimeout(() => endRound(roundId), ANSWER_TIMEOUT_MS);
        } else {
            setTimeout(() => nextQuestion(roundId), ANSWER_TIMEOUT_MS);
        }
    }

    return (
        <div className="quiz-content">
            <p><RawHTML>{text}</RawHTML></p>
            <Card>
                <List disablePadding={true} component="ol">{Object.keys(question.answers).map(answerId => {
                    const itemCorrect = answerId === question.correctAnswer;
                    return (
                        <ListItem selected={answered && question.answer === answerId} button={!answered} divider={true} key={answerId} onClick={() => {
                            if (!answered) {
                                return answerQuestion(roundId, questionIndex, answerId);
                            }
                        }}>

                            <RawHTML>{question.answers[answerId]}</RawHTML>
                            {
                                answered ? <Icon className="answer-icon" color={itemCorrect? 'primary' : 'error'}>{itemCorrect? 'check' : 'close'}</Icon>
                                : ''
                            }
                        </ListItem>
                    )
                })}</List>
            </Card>
        </div>
    );
};

export default Question;