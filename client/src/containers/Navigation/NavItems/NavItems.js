import React from 'react';
import './NavItems.css';
import {Link} from 'react-router-dom';

const navItems = (props) => {
    return (
        <ul className={props.styleClasses}>
            <li><Link onClick={props.drawerStatus ? () => props.closeDrawer() : null} to="/">Home</Link></li>
            <li><Link onClick={props.drawerStatus ? () => props.closeDrawer() : null} to="/authentication">Login/Sign Up</Link></li>
            <li><Link onClick={props.drawerStatus ? () => props.closeDrawer() : null} to="/play">Play</Link></li>
            <li><Link onClick={props.drawerStatus ? () => props.closeDrawer() : null} to="/leaderboard">Leaderboard</Link></li>
            <li><Link onClick={props.drawerStatus ? () => props.closeDrawer() : null} to="/settings">Settings</Link></li>
        </ul>
    );
}

export default navItems;