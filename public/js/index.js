import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import reduxApi, {transformers} from "redux-api";
// import { Provider } from 'react-redux';



class OutingApp extends Component {

    getUsers() {
        console.log("onClick");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);
        }
        xmlHttp.open("GET", "http://localhost:8080/api/v1/users", true); // true for asynchronous
        xmlHttp.send(null);
    }

    render() {
        return (
            <div>
                <p> Outing App! </p>
                <button onClick={this.getUsers}>
                    Get Users
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <OutingApp />,
    document.getElementById('root')
);
