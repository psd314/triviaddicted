import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./Layout.css";
import NavBar from "../containers/Navigation/NavBar/NavBar";
import Backdrop from "../components/Backdrop/Backdrop";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import Auxiliary from "../hoc/Auxiliary/Auxiliary";
import Home from "../pages/Home/Home";
import Authentication from "../pages/Authentication/Authentication";
import GameMenu from "../pages/GameMenu/GameMenu";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Settings from "../pages/Settings/Settings";
import Authorization from "../hoc/Authorization/Authorization";

class Layout extends Component {
	state = {
		showSideDrawer: false
    };

	handleMenuClick = () => {
		let drawer = !this.state.showSideDrawer;
		this.setState({ showSideDrawer: drawer });
	};

	handleBackdropClick = () => {
		let closeDrawer = false;
		this.setState({ showSideDrawer: closeDrawer });
    };

	render() {
		return (
			<Auxiliary>
				<NavBar clicked={this.handleMenuClick} />
				<Backdrop
					show={this.state.showSideDrawer}
					clicked={this.handleBackdropClick}
				/>
				<SideDrawer
					show={this.state.showSideDrawer}
					clicked={this.handleMenuClick}
                    closeDrawer={this.handleMenuClick}
					drawerStatus={this.state.showSideDrawer}
				/>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/authentication" component={Authentication} />
					<Route exact path="/play" component={Authorization(GameMenu)} />
					<Route
						exact
						path="/leaderboard"
						component={Authorization(Leaderboard)}
					/>
					<Route exact path="/settings" component={Authorization(Settings)} />
					<Route component={Home} />
				</Switch>
			</Auxiliary>
		);
	}
}

export default Layout;
