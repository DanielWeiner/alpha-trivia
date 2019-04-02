import * as React from 'react';
import {TriviaState} from "../state";
import {newRound} from "../actions";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import Home from "./Home";

const mapStateToProps = (state: TriviaState) => ({
    topScore: state.topScore,
    loading: state.currentRound && state.currentRound.fetching,
    showQuiz: state.currentRound && !state.currentRound.fetching,
    lastScore: state.lastScore === undefined? null : state.lastScore
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        newRound: () => dispatch(newRound() as any)
    }
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;