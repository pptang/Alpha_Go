import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import App from './pages/App';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EventsNew from './pages/EventsNew';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore.js';

const store = configureStore();

/****** Example for send request
import axios from 'axios';

const ROOT_URL = 'http://localhost:8080';
// class OutingApp extends Component {

    // getUsers() {
    //     console.log("onClick");
    //     const request = axios.get(`${ROOT_URL}/api/v1/users`);
    //     request.then((data) => {
    //         console.log(data.payload);
    //     })
    // }

    // render() {
    //     return (
    //         <div>
    //             <p> Outing App! </p>
    //             <button onClick={this.getUsers}>
    //                 Get Users
    //             </button>
    //         </div>
    //     );
    // }
// }

**************/

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/events/new" component={EventsNew} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
