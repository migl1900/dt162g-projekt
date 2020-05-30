import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.username}</td>
        <td>
            <Link to={"/edituser/" + props.user._id}><img src="/images/Modify.png" alt="Edit logo" title="Redigera träningspass" /></Link>&emsp;<img src="/images/Delete.png" alt="Edit logo" title="Radera träningspass" onClick={() => { props.deleteUser(props.user._id) }} className="image-link" />
        </td>
    </tr>
)

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            users: []
        };

        this.deleteUser = this.deleteUser.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch((error) => {
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

        axios.post("http://localhost:5000/users/add", user)
            .then(res => {
                window.location = "/createuser"
            })
            .catch(function (error) {
                console.log(error);
                document.getElementById("message").innerHTML = "Kunde inte skapa användare, kontrollera att du fyllt i ett användarnamn med minst 3 tecken och att användarnamnet inte är upptaget";
            })
    }

    deleteUser(id) {
        axios.delete('http://localhost:5000/users/' + id)
        .then(res => document.getElementById("message").innerHTML = JSON.parse(JSON.stringify(res.data)))
        .catch(function (error) {
            console.log(error);
        })

        this.setState( {
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    userList() {
        return this.state.users.map(currentuser => {
            return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />
        })
    }

    render() {
        return (
            <div className="main-content">
                <h2>Registrerade användare</h2>
                <div id="message"></div>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Användare</th>
                            <th>Redigera</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
                <hr />
                <h2>Lägg till ny användare</h2>
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