import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import App from './pages/App';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EventsNew from './pages/EventsNew';
import EventShow from './pages/EventShow';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore.js';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/events/new" component={EventsNew} />
                <Route path="/event/:id" component={EventShow} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
