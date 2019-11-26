(RaiselyComponents) => (props) => {
	const { ProgressBar, ProfileTile, Button } = RaiselyComponents.Atoms;
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
    
    // show something different if user is logged in
	const { user } = props.global;
	if(user) {
		// update value for testing purposes
        user.profile.total = 3000;
        // calculate percentage of user goal 
        const userPercentage = parseInt((user.profile.total / user.profile.goal) * 100);
        // return html to be displayed
		return <div id="home-page__cta">
			<h1>Hey {user.firstName}!</h1>
			<h2>Congrats on reaching {userPercentage}% of your goal</h2>
			<ProfileTile profile={user.profile} />
			<div id="home-page__action-buttons">
				<Button href="/tips">Fundraising tips</Button>
				<Button theme="cta" href={`/${user.profile.path}`}>View your page</Button>
			</div>
		</div>;
	}

    // return html to be displayed
	return <div id="home-page-progress-bar">
		<h1>{mealsRaised} meals already donated!</h1>
		<h2>{mealsLeft} meals left to go!</h2>
		<ProgressBar profile={current} />
	</div>;
}



