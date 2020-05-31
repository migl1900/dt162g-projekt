import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            description: "",
            duration: "",
            date: new Date(),
            users: []
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Default start method (get all existing users to be used in dropdown list)
    componentDidMount() {
        axios.get('/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState( {
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // set new state for username
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // set new state for description
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    // set new state for duration
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    // set new state for date
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    // If form submitted
    onSubmit(e) {
        e.preventDefault();

        const training = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        // Send post request to server with values from form
        axios.post("/trainings/add", training)
        .then(res => {
            window.location = "/"
        })
        .catch(function (error) {
            console.log(error);
            document.getElementById("message").innerHTML = "Kunde inte skapa träningspass, kontrollera att alla fälten är ifyllda och att tid står i minuter";
        })
    }

    // what to display on screen
    render() {
        return (
            <div className="main-content">
                <h2>Lägg till nytt träningspass</h2>
                <div id="message"></div>
                <div className="form-container">
                    <form className="form" onSubmit={this.onSubmit}>
                        <p>
                            <label>Användarnamn
                                <select
                                    required
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}> 
                                    {
                                        this.state.users.map(function(user) {
                                            return <option
                                                key={user}
                                                value={user}>{user}
                                            </option>
                                        })
                                    }
                                </select>
                            </label>
                        </p>
                        <p>
                            <label>Typ av träning
                                <input
                                    type="text"
                                    required
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                />
                            </label>
                        </p>
                        <p>
                            <label>Tid (i minuter)
                                <input
                                    type="text"
                                    required
                                    value={this.state.duration}
                                    onChange={this.onChangeDuration}
                                />
                            </label>
                        </p>
                        <label>Datum
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                dateFormat='yyyy-MM-dd'
                            />
                        </label>
                        <p>
                            <input
                                type="submit"
                                value="Spara träningspass"
                            />
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}