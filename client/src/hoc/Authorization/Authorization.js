import React, { Component } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
	class Authorization extends Component {
		componentWillMount() {
			// if (localStorage.jwtToken) {
			// 	console.log(true);
			// verify jwt
			// } 

			if (!this.props.isAuthenticated) {
				this.props.history.push("/authentication");
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.isAuthenticated) {
				this.props.history.push("/authentication");
			}
		}

		render() {
			return <ComposedComponent {...this.props} />;
		}
    }
    
    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps)(Authorization);
}
