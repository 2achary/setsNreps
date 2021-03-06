import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import SessionCard from "./SessionCard";
import '../css/HomePage.css';
import {APIURL} from '../helpers.js'


export default class HomePage extends Component {
    state = {
        session: {},
        sessions: [],
        newWorkout: null
    }

    onClick = (e) => {
        fetch(`${APIURL}session/new-workout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            },
            body: JSON.stringify({name: "Abs and stuff"})
        })
            .then(r => r.json())
            .then(response => {
                this.setState({newWorkout: response});
            });
    }

    componentDidMount() {
      this.refreshSessionList();
      document.body.style.backgroundColor = 'white';
    }

    logout = () => {
        localStorage.removeItem('api-token');
        this.setState({ logout: true })
    }

    refreshSessionList = () => {
       // get the list of all sessions and save them to state
        fetch(`${APIURL}sessions/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        })
            .then(r => r.json())
            .then(response => {
                this.setState({sessions: response});
            });
    }

    deleteSession = (session_id) => {
        fetch(`${APIURL}session/${session_id}/`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        }).then(this.refreshSessionList)
    }

    copySession = (session_id) => {
        fetch(`${APIURL}session/copy/${session_id}/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        }).then(r => r.json())
            .then(this.refreshSessionList)
    }

    render() {
        if(this.state.logout) {
            return <Redirect to={'login'}/>
        }

        if (this.state.newWorkout) {
            return <Redirect to={`session/${this.state.newWorkout.id}`}/>
        }

        return (
            <div className="container home-page-container">
                <div className={'top-bar'}>
                    <button onClick={this.logout} className={'btn btn-sm logout-btn'}>logout</button>
                </div>
                <h1>Start Workout</h1>
                <button className="btn btn-block btn-secondary" onClick={this.onClick}>Create New Workout</button>
                {
                    this.state.sessions.map(session => {
                        return <SessionCard key={session.id} copySession={this.copySession} deleteSession={this.deleteSession} session={session}/>
                    })
                }
            </div>
        )
    }
};
