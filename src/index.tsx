import * as React from "react"
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore, Middleware} from 'redux';
import rootReducer from './reducers';
import {TriviaState} from "./state";
import thunkMiddleware from "redux-thunk";
import HomeContainer from "./components/HomeContainer";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


const localStorageKey = 'trivia';


const localStorageMiddleware : Middleware<{}, TriviaState> = ({getState}) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem(localStorageKey, JSON.stringify(getState()));
        return result;
    }
};

const rehydrateStore = () => {
    if (localStorage.getItem(localStorageKey) !== null) {
        return JSON.parse(localStorage.getItem(localStorageKey));
    }
};

const store = createStore(rootReducer, rehydrateStore(), applyMiddleware(
    thunkMiddleware,
    localStorageMiddleware
));

render(
    <Provider store={store}>
        <CssBaseline>
            <Typography component="div">
                <HomeContainer/>
            </Typography>
        </CssBaseline>
    </Provider>,
    document.getElementById('root')
);