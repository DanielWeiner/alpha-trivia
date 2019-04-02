import * as React from "react";
import QuizContainer from "./QuizContainer";
import {Button, Card, CircularProgress} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

interface HomeProps {
    topScore: number;
    loading: boolean;
    showQuiz: boolean;
    lastScore: number | null;
    newRound: () => void;
}

const theme = createMuiTheme();
const wrapper = (content: any, verticallyCentered: boolean = false) => {
    return (
            <MuiThemeProvider theme={theme}>
                <Card style={{
                    marginTop: '25vh',
                    width: '50vw',
                    marginLeft: '25vw',
                    height: '50vh'
                }}>
                    <div id="main-container">
                        <div id="wrapper" className={verticallyCentered? 'vertically-centered' : ''}>
                            {content}
                        </div>
                    </div>
                </Card>
            </MuiThemeProvider>
    )
};

const Home = ({topScore, loading, showQuiz, newRound, lastScore} : HomeProps) => {

    if (showQuiz) {
        return wrapper(<QuizContainer/>);
    }

    return wrapper(<div style={{textAlign: 'center'}}>
        <h2>Alpha Trivia Take-Home</h2>
        <p>High score: {topScore}</p>
        {
            lastScore === null? '' : <p>Last score: {lastScore}</p>
        }
        {
            loading? <CircularProgress variant="indeterminate"/> : <Button variant="contained" className="primary" onClick={newRound}>New Round</Button>
        }
    </div>, true);
};

export default Home;