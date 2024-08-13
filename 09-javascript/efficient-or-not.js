// The performance boosts are not large!

// ES6 - ES2015
const add = (a, b) => a + b;

function addOne(a, b) {
	return a + b;
}
// Java => lambda!

const numbers = [1, 2, 3, 4, 5];
{
	const [first, ...rest] = numbers;
}

{
	const first = numbers[0];
	const rest = numbers.slice(1);
}

async function fetchData() {
	const response = await fetch('https://api.com');
	const data = await response.json();
}

function main() {
	// do some work ...
	// remove async when you can!
}

// syntactic sugar

numbers.forEach((number) => {
	console.log(number);
	// no break; continue; :(
})

for (let number of numbers) {
	console.log(number);
}

for (let i = 0; i < numbers.length; i++) {
	console.log(numbers[i]);
}