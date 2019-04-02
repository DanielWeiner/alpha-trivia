import * as uuid from "uuid/v4";
import {TriviaQuestion, TriviaState} from "../state";
import axios from "axios";
import {Dispatch} from "redux";

export enum TriviaActionType {
    START_ROUND,
    INIT_ROUND,
    ANSWER_QUESTION,
    END_ROUND,
    NEXT_QUESTION
}

const QUESTIONS_PER_ROUND = 10;
const TRIVIA_API_URL = 'https://opentdb.com/api.php';

export interface TriviaAction {
    type: TriviaActionType
}


export interface InitRoundAction extends TriviaAction {
    type: TriviaActionType.INIT_ROUND;
    id: string;
}

export interface StartRoundAction extends TriviaAction {
    type: TriviaActionType.START_ROUND;
    roundId: string;
    questions: TriviaQuestion[]
}


export interface AnswerQuestionAction extends TriviaAction {
    type: TriviaActionType.ANSWER_QUESTION;
    questionIndex: number;
    answerId: string;
    roundId: string;
}

export interface EndRoundAction extends TriviaAction {
    type: TriviaActionType.END_ROUND;
    roundId: string;
}

export interface NextQuestionAction extends TriviaAction{
    type: TriviaActionType.NEXT_QUESTION;
    roundId: string;
}

export const initRound = () : InitRoundAction => ({
    type: TriviaActionType.INIT_ROUND,
    id: uuid()
});

export const startRound = (roundId: string, questions: TriviaQuestion[]) : StartRoundAction => ({
    type: TriviaActionType.START_ROUND,
    roundId,
    questions
});

export const nextQuestion = (roundId: string) : NextQuestionAction => ({
    type: TriviaActionType.NEXT_QUESTION,
    roundId
});

export const answerQuestion = (roundId: string, questionIndex: number, answerId: string) : AnswerQuestionAction => ({
    type: TriviaActionType.ANSWER_QUESTION,
    questionIndex,
    answerId,
    roundId
});

export const endRound = (roundId: string) : EndRoundAction => ({
    type: TriviaActionType.END_ROUND,
    roundId
});

interface ApiTriviaQuestion {
    category: string;
    type: 'boolean' | 'multiple';
    question: string;
    correct_answer: string;
    incorrect_answers: string[]
}
interface ApiResponse {
    response_code: number;
    results: ApiTriviaQuestion[]
}

function shuffle<T>(arr: T[]): T[] {
    const newArr = arr.slice();
    for (let i = 0; i < newArr.length; i++) {
        let tmp = newArr[i];
        const pool = newArr.slice(i);
        const randomIndex = Math.floor(Math.random() * pool.length);
        newArr[i] = pool[randomIndex];
        newArr[randomIndex + i] = tmp;
    }
    return newArr;
}

export const fetchQuestions = (roundId: string) => {
    return async function (dispatch: Dispatch) {
        const questionsFromApi = await axios.get<ApiResponse>(TRIVIA_API_URL,{
            params: {
                amount: QUESTIONS_PER_ROUND
            }
        });


        const questions = questionsFromApi.data.results.map(result => {
            const correctAnswerId = uuid();
            const answers = shuffle([result.correct_answer, ...result.incorrect_answers].map((answer, i) => {
                return {
                    [i === 0? correctAnswerId: uuid()]: answer
                };
            })).reduce((answers: {[key: string]: string}, answer) => {
                const key = Object.keys(answer)[0];
                return {
                    ...answers,
                    [key]: answer[key]
                }
            }, {});

            return {
                category: result.category,
                question: result.question,
                type: result.type,
                answers,
                correctAnswer: correctAnswerId,
                answer: null
            }
        });

        return dispatch(startRound(roundId, questions));
    }
};

export const newRound = () => {
    return (dispatch: Dispatch, getState: () => TriviaState) => {
        dispatch(initRound());
        const roundId = getState().currentRound.id;
        return fetchQuestions(roundId)(dispatch);
    }
};