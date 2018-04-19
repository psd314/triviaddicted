import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
// import * as actionCreators from "../../../store/actions/actionCreators";

const categoryDropdown = props => {
	let categories = [];
    let selectMenu = "Loading...";

	if (props.categories) {
		categories = props.categories.map(el => {
			return (
				<option value={el.id} key={el.id}>
					{el.name}
				</option>
			);
		});
		selectMenu = (
			<select value={props.categoryId} onChange={props.onCategoryChange}>
				{categories}
			</select>
		);
	} 

	return (
		<div>
			<h4>Title</h4>
			{selectMenu}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		categories: state.trivia.categories
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCategoryChange: event =>
			dispatch({
				type: actionTypes.UPDATE_CATEGORY,
				event: event.target.value
			})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(categoryDropdown);
