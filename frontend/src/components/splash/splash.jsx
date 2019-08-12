import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import LobbyRowsContainer from './lobby_rows/lobby_rows_container'
import './splash.css';

export default class Splash extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '2',
            players: new Array(2)
        }

        this.handleClick = this.handleClick.bind(this);
        this.demoGame = this.demoGame.bind(this);
    }

    handleClick() {
        this.props.openModal('gameSettings');
        // kc: set sessionStorage.game to empty {}
        sessionStorage.setItem("game", JSON.stringify(
            {}
        ))
    }

    demoGame() {
        let players = this.state.players

        players[0] = this.props.session.user.email;
        players[1] = "Computer"

        let data = {
            player_ids: players,
            // grid: [{
            //     xCoord: 0,
            //     yCgit boord: 0,
            //     color: "R"
            // }],
            turn: "0"
        }

        this.props.newGame(data).then((game) => {
            return this.props.history.push(`/game/${game.game._id}/`)
        });
    }

    componentDidMount() {
        this.props.getValidGames();
    }

    render() {
        let { isLoggedIn } = this.props

        // let currentGame = this.store.getState().entities;

        // let colors = ['Red','Green','Blue']
        // let style;
        // let msg1 = "Multi-Go".split('').map((letter,idx) => {
        //     style
        //     return (
        //         <div style={}>letter</div>

        //     )
        // }).join('')

        if (isLoggedIn) {
        return (
            <div className="splash-page">
                <NavBar />
                <div className="splash-page-create-lobby-div">
                    <h1 className="splash-page-app-title">Multi-Go</h1>
                    <h3 className="splash-page-app-sub-title">Play Go variations with friends</h3>
                    <button onClick={this.handleClick} className="blue-button" id="splash-page-create-lobby-button">Create Game</button>
                    <button onClick={this.demoGame} className="blue-button" >Demo Single Player Game</button>
                </div>
                <LobbyRowsContainer />
            </div>
        )
        } else {
            return (
            <div className="splash-page">
                <NavBar />
                <div className="splash-page-create-lobby-div">
                    <h1 className="splash-page-app-title">Multi-Go</h1>
                    <h3 className="splash-page-app-sub-title">Play Go variations with friends</h3>
                        <button onClick={() => this.props.openModal('login')} className="blue-button" id="splash-page-create-lobby-button">Create Game</button>
                </div>
                <LobbyRowsContainer />
            </div>
            )
        }
    }
}
