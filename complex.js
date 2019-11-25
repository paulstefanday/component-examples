(RaiselyComponents) => (props) => {
	const { ProgressBar, Button, ProfileTile } = RaiselyComponents.Atoms;
	const { DonationForm, Share } = RaiselyComponents.Molecules;
	// set the cost of the meal is 2000 cents aka $20
	const mealCost = 2000;
	// get campaign data
	const current = props.global.campaign;
	// log data so we can be sure it has what we need. This is only for testing. Remove when campaing is live.
	console.log(current, props, RaiselyComponents)
	// Add temporary test value to preview progress
	current.total = 10000;
	// how many meals paid for
	const mealsRaised = parseInt(current.total / mealCost);
	// how many meals that need to be donated for the campaign
	const totalMeals = parseInt(current.goal / mealCost);
	// how many meals left to be donated to reach goal
	const mealsLeft = totalMeals - mealsRaised;
	// calculate percent
	const percentage = parseInt((current.total / current.goal) * 100)
	// console.log(percentage)

	// render different info for logged in users
	const { user } = props.global;
	if(user) {
		// update value for testing purposes
		user.profile.total = 3000;
		const userPercentage = parseInt((user.profile.total / user.profile.goal) * 100)
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

	// calculate how many meals left
	const findMealsLeft = (from, to) => {
		const percentageLeft = (to - from) - (percentage - from);
		return parseInt((percentageLeft / 100) * totalMeals);
	}

	// show different headings based on how close campaign is to it's goal
	const LoadHeading = () => {
		if(percentage > 50 && percentage < 75) {
			const mealsTo75 = findMealsLeft(50, 75)
			return [
				<h1>Just past the half way mark!</h1>,
				<h2>Only {mealsTo75} meals left to reach 75% of our goal</h2>,
			];
		} else if(percentage >= 75) {
			const mealsTo100 = findMealsLeft(percentage, 100)
			return [
				<h1>Only {mealsTo100} meals left!</h1>,
				<h2>We are almost at our goal of {totalMeals} meals!</h2>,
			];
		} else {
			return [
				<h1>{mealsRaised} meals already donated!</h1>,
				<h2>{mealsLeft} meals left to go!</h2>,
			];
		}
	}

	// finally return everything to be rendered
	return <div id="home-page__cta">
		<LoadHeading />
		<ProgressBar profile={current} />
		<div id="home-page__action-buttons">
			<Button href="/donate">Donate A Meal</Button>
			<Button theme="cta" href="/signup">Start Fundraising</Button>
		</div>
	</div>;
}