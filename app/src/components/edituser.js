import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            users: []
        }
    }

    componentDidMount() {
        axios.get('/users/' + this.props.match.params.id)
            .then(response => {
                this.setState( {
                    username: response.data.username,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        axios.post('/users/update/' + this.props.match.params.id, user)
            .then(res => {
                window.location = "/createuser"
            })
            .catch(function (error) {
                console.log(error);
                document.getElementById("message").innerHTML = "Kunde inte spara användare, kontrollera att du fyllt i ett användarnamn med minst 3 tecken och att användarnamnet inte är upptaget";
            })
    }

    render() {
        return (
            <div className="main-content">
                <h2>Editera användare</h2>
                <div id="message"></div>
                <div className="form-container">
                    <form className="form" onSubmit={this.onSubmit}>
                        <p>
                            <label>Användarnamn
                                <input
                                    required
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                />
                            </label>
                        </p>
                        <p>
                            <input
                                type="submit"
                                value="Spara användare"
                            />
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}