import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let toggle = "asc";

export default class TrainingsList extends Component {
    constructor(props) {
        super(props);

        this.deleteTraining = this.deleteTraining.bind(this);
        this.onSort = this.onSort.bind(this);

        this.state = {trainings: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/trainings/')
            .then(response => {
                this.setState({ trainings: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteTraining(id) {
        axios.delete('http://localhost:5000/trainings/' + id)
            .then(res => document.getElementById("message").innerHTML = JSON.parse(JSON.stringify(res.data)))
            .catch(function (error) {
                console.log(error);
            })

        this.setState( {
            trainings: this.state.trainings.filter(el => el._id !== id)
        })
    }

    onSort(event, sortKey) {
        const data = this.state.trainings;
        if(toggle === "asc") {
            data.sort((a, b) => (a[sortKey] > b[sortKey]) ? 1 : -1);
            toggle = "desc";
        } else {
            data.reverse((a, b) => (a[sortKey] > b[sortKey]) ? 1 : -1);
            toggle = "asc";
        }
        this.setState({data})
    }

    render() {
        var newdata = this.state.trainings;
        var deleteButton = this.deleteTraining;
        return (
            <div className="main-content">
                <h2>Registrerade träningspass</h2>
                <div id="message"></div>
                <table className="traingslist-table">
                    <thead>
                        <tr>
                            <th onClick={e => this.onSort(e, 'username')}>Användare &#8597;</th>
                            <th onClick={e => this.onSort(e, 'description')}>Träningspass &#8597;</th>
                            <th onClick={e => this.onSort(e, 'duration')}>Träningstid &#8597;</th>
                            <th onClick={e => this.onSort(e, 'date')}>Datum &#8597;</th>
                            <th>Redigera</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newdata.map(function(training, index) {
                            return (
                            <tr key={index} data-item={training}>
                                <td data-title="Användare">{training.username}</td>
                                <td data-title="Träningspass">{training.description}</td>
                                <td data-title="Träningstid">{training.duration.toString()}</td>
                                <td data-title="Datum">{training.date.substring(0,10)}</td>
                                <td data-title="Redigera"><Link to={"/edittraining/" + training._id}><img src="/images/Modify.png" alt="Edit logo" title="Redigera träningspass" /></Link>&emsp;<img src="/images/Delete.png" alt="Edit logo" title="Radera träningspass" onClick={() => deleteButton(training._id) } className="image-link" /></td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}