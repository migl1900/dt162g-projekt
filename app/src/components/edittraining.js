import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditTraining extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            value: "",
            username: "",
            description: "",
            duration: "",
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('/trainings/' + this.props.match.params.id)
            .then(response => {
                this.setState( {
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })


        axios.get('/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState( {
                        users: response.data.map(user => user.username),
                    })
                }
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

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const training = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('/trainings/update/' + this.props.match.params.id, training)
            .then(res => {
                window.location = "/"
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="main-content">
                <h2>Editera träningspass</h2>
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