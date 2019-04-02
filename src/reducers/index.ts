import {AnswerQuestionAction, InitRoundAction, StartRoundAction, TriviaAction, TriviaActionType} from "../actions";
import {TriviaState} from "../state";

const rootReducer = (currentState: TriviaState | undefined, action: TriviaAction) : TriviaState => {
    const state = currentState || {
        currentRound: null,
        lastScore: null,
        topScore: 0
    };

    if (action.type === TriviaActionType.INIT_ROUND) {
        return {
            ...state,
            currentRound: {
                id: (<InitRoundAction>action).id,
                fetching: true,
                questions: [],
                score: 0,
                currentQuestion: -1
            }
        };
    }

    if (action.type === TriviaActionType.START_ROUND) {
        return {
            ...state,
            currentRound: {
                id: (<StartRoundAction>action).roundId,
                fetching: false,
                questions: (<StartRoundAction>action).questions,
                score: 0,
                currentQuestion: 0
            }
        }
    }

    if (action.type === TriviaActionType.ANSWER_QUESTION) {
        const answerAction = (<AnswerQuestionAction>action);
        if (answerAction.roundId === state.currentRound.id) { // TODO: handle invalid round
            // TODO: handle out-of-bounds index
            const question = state.currentRound.questions[answerAction.questionIndex];

            if (answerAction.answerId in question.answers) {
                //TODO: handle invalid answer id

                const withAnswer = state.currentRound.questions.map((question, i) => {
                    if (i === state.currentRound.currentQuestion) {
                        return {
                            ...question,
                            answer: answerAction.answerId
                        }
                    }
                    return question;
                });

                if (question.correctAnswer === answerAction.answerId) {
                    return {
                        ...state,
                        currentRound: {
                            ...state.currentRound,
                            questions: withAnswer,
                            score: state.currentRound.score + 1
                        }
                    }
                } else {
                    return {
                        ...state,
                        currentRound: {
                            ...state.currentRound,
                            questions: withAnswer
                        }
                    }
                }
            }
        }

    }

    if (action.type === TriviaActionType.NEXT_QUESTION) {
        return {
            ...state,
            currentRound: {
                ...state.currentRound,
                currentQuestion: state.currentRound.currentQuestion + 1
            }
        };
    }

    if (action.type === TriviaActionType.END_ROUND) {
        const score = state.currentRound.score;
        const topScore = Math.max(score, state.topScore);

        return {
            ...state,
            topScore,
            currentRound: null,
            lastScore: score
        };
    }

    return state;
};

export default rootReducer;