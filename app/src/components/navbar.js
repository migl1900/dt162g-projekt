import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// Create header with logo and navigation menu
export default class Navbar extends Component {
    render() {
        return (
            <nav className="header">
                <div className="header-content">
                    <Link to="/"><img className="logo" src="/images/logga.png" alt="WorkOutLog logo"></img></Link>
                    <input className="menu-btn" type="checkbox" id="menu-btn" aria-label="Menu button " />
                    <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">
                        <li><NavLink exact activeClassName="active" to="/">Hem</NavLink></li>
                        <li><NavLink exact activeClassName="active" to="/createtraining">Nytt träningspass</NavLink></li>
                        <li><NavLink exact activeClassName="active" to="/createuser">Användare</NavLink></li>
                    </ul>
                </div>
            </nav>
        )
    }
}