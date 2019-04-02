export interface TriviaState {
    topScore: number;
    currentRound: TriviaRound | null;
    lastScore: number | null
}

export interface TriviaRound {
    id: string;
    score: number;
    fetching: boolean;
    currentQuestion: number;
    questions: TriviaQuestion[];
}

export interface TriviaQuestion {
    category: string;
    type: 'boolean' | 'multiple';
    question: string;
    correctAnswer: string;
    answers: TriviaAnswers,
    answer: string | null
}

export interface TriviaAnswers {
    [key: string]: string;
}