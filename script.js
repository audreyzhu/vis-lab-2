
// attractions is a global variable
let attractions;

// sorts the data by number of visitors, ascending
function sortData() {
	attractions.sort((a,b) => a["Visitors"] - b["Visitors"]);

	// creates bar chart with the top five attractions
	let data = attractions.slice(-5);
	renderBarChart(data);
}

// filters the data by category
function filterData(category) {

    attractions.sort((a,b) => a["Visitors"] - b["Visitors"]);

	const result = attractions.filter(d => d["Category"] == category);

	// result == 0 when "All Attractions" is selected
	if (result.length == 0) {
		let data = attractions.slice(-5);
		renderBarChart(data);

	} else {
		let data = result.slice(-5);
		renderBarChart(data);
	}
} 

// fetches the data and calls the functions
async function fetchData() {

	// fetches the data and puts it in attractions
	const response = await fetch('attractions.json');
	const data = await response.json();
	attractions = data;
	console.log('attractions - (a)', attractions);

	// creates the bar chart when the page is entered
	const f1 = await sortData();

	// interactive dropdown
	var element = document.querySelector('#attraction-category');
	element.addEventListener("change", event =>{
		console.log(event);
		console.log(event.target.value);
		filterData(event.target.value);
	});

	return true;

}

fetchData();
