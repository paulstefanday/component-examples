(RaiselyComponents) => (props) => {
	const { ProgressBar, ProfileTile } = RaiselyComponents.Atoms;
	// set the cost of the meal is 2000 cents aka $20
	const mealCost = 2000;
	// get campaign data
	const current = props.global.campaign;
	// log data so we can be sure it has what we need. This is only for testing. Remove when campaing is live.
	console.log("Current Profile: ", current)
	// Add temporary test value to preview progress
	current.total = 23435;
	// how many meals paid for
	const mealsRaised = parseInt(current.total / mealCost);
	// how many meals that need to be donated for the campaign
	const totalMeals = parseInt(current.goal / mealCost);
	// how many meals left to be donated to reach goal
	const mealsLeft = totalMeals - mealsRaised;

    // return html to be displayed
	return <div id="home-page-progress-bar">
		<h1>{mealsRaised} meals already donated!</h1>
		<h2>{mealsLeft} meals left to go!</h2>
		<ProgressBar profile={current} />
	</div>;
}



