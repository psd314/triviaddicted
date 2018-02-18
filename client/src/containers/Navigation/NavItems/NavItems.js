import React, {Component} from 'react';
import './NavItems.css';
import {Link} from 'react-router-dom';

class NavItems extends Component {
    render() {
        return (
            <ul className={this.props.styleClasses}>
                <li><Link to="/" onClick={this.props.show}>Home</Link></li>
                <li><Link to="/authentication">Login/Sign Up</Link></li>
                <li><Link to="/play">Play</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        );
    }
}

export default NavItems;