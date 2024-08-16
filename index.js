const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 9, 10];

// Before proceeding, we must know what a "shallow" copy is.
// A shallow copy means that a copy still retains a reference to the
// original's nested items (i.e., 2D arrays, nested objects, objects in arrays).
// An example:

const two_dimensional_array = [
	[1, 2], [3, 4]
];
// copies the array
const copy_of_two_dimensional_array = [...two_dimensional_array];

// console.log("original", two_dimensional_array, "copy", copy_of_two_dimensional_array); // The same as its original counterpart

two_dimensional_array[0][1] = 5;

//console.log("original", two_dimensional_array, "copy", copy_of_two_dimensional_array); // Still the same

// Compare that with a deep copy:

const deep_copy_of_two_dimensional_array = JSON.parse(JSON.stringify(two_dimensional_array));

// console.log("original", two_dimensional_array, "deep copy", deep_copy_of_two_dimensional_array); // The same

two_dimensional_array[0][1] = 6;

// console.log("original", two_dimensional_array, "deep copy", deep_copy_of_two_dimensional_array);

// So, a "shallow" copy pretty much means that it does not truly copy recursively (only the surface of the item to be copied, and not its children or nested data). That is why its nested data still reference the original's
// A "deep" copy means it copies a data recursively.
// To understand about this deeper, one must know how memory works. In JavaScript, primitive data types (strings, numbers, booleans) are always passed around by value,
// which means that they are always copied when transferred from one context to another (e.g. as an argument to a function), while data types like arrays/objects are, yes,
// passed by value, but this value is only the references to the data it contains.

// Array.isArray
// A static method in the Array class. Accepts an argument which is the item that will be
// checked whether it's an array or not.

// Another way to check whether something is an Array in JavaScript is using the instanceof
// keyword. However, this might be unpredictable if you check an item that came from another
// JavaScript file/execution content (i.e., in an iFrame) since the instanceof keyword
// checks whether an item was created from a class/constructor.

console.log("Array.isArray", Array.isArray(items), "instanceof", items instanceof Array);

// Array.length
// Gets the total amount of items inside an array one-dimensionally.

// console.log(items.length);

// Array.filter
// Will create a new array (shallow copy) and fill that array with
// values where the parameter callback function provided returns true.
const filtered_items = items.filter((item) => {
	return item < 5;
});

// console.log(filtered_items);

// It is somewhat the same as:
// const filtered_items = [];
// for (const item of items) {
//	if (item < 5) {
//		filtered_items.push(item);
//	}
// }

// Array.map
// Will create a new array and fill that array with whatever is
// returned by the parameter callback function.
const incremented_items = items.map((item) => {
	return item + 1;
});

// console.log(incremented_items);

// It is the same as:
// const incremented_items = [];
// for (const item of items) {
//	incremented_items.push(item + 1);
// }

// Array.reduce
// Used to leoop through an array and change the value of the second argument
// based on what is returned by the first parameter callback function.
// Notice how I provided 0.
const sum_of_items = items.reduce((current_value, current_item, _idx) => {
	// console.log(current_value, current_item);
	return current_value + current_item;
});

// console.log(sum_of_items);

// Based on the example above, it is somewhat the same as:
// let sum_of_items = 0;
// for (const item of items) {
//	sum_of_items += item;
// }

// Array.reduceRight
// The same as Array.reduce but starts at the last item of the array.

/**
 * The methods below are used to find something in an array
 * and will stop looping once the item is found.
 */

// Array.find
// Will loop through the array and returns an item in the array where
// the provided parameter callback function returns true.

const number_five = items.find((item) => {
	return item == 5;
});

// console.log(number_five);

// Array.findIndex
// The same as Array.find but returns the current index where true was returned
// instead.

const index_of_number_five = items.findIndex((item) => {
	return item == 5;
});

// console.log(index_of_number_five);

// Array.indexOf
// will loop through an array and
// checks whether an item in the array matches the item provided as its
// argument. The second argument indicates the index position that we want
// the method to start looking.

const index_of_number_ten = items.indexOf(10);

// console.log(index_of_number_ten);

// Array.lastIndexOf
// much like indexOf but starts at the end, and returns the index at which
// the item to look for is found for the last time in the array.

const last_index_of_number_ten = items.lastIndexOf(10);

// console.log(last_index_of_number_ten);

const does_array_contain_a_decimal = items.some((item) => {
	return typeof item == "number" && item % 1 != 0;
});

// console.log(does_array_contain_a_decimal);

/**
 * The methods above are used to find an item in an array and
 * will stop the loop once it's found.
 */

// Array.fill
// Typically used to fill an array.

const choco_list = new Array(4).fill("chocolate");

// console.log(choco_list);

// Array.entries
// Get a key value pair list of the array.
// Almost like Object.entries(), but this is used for arrays,
// and only integer keys are allowed. Refer tothe example below.

// We attach the object Array.prototype's entries method to the object with the length
// property and call/invoke it. Since the entries method will return a list of entries on an array based on its length, it
// only looks for the length property.

const array_like_object = {
	length: 2,
	0: "hello",
	"world": "hello",
	"hi": "there"
};
const entries = Array.prototype.entries.call(array_like_object);

// Will be:
// [0, "hello"]
// [1, undefined] since the key on this 2nd value is not an integer, it's not recognized.
/* for (const entry of entries) {
	console.log(entry);
} */

// Array.concat
// Takes in an array and combine that with the array that's calling the concat
// method. This will create a new array where it's items are the combined items
// from array 1 and 2.

const hello_array = ["hello"];
const world_array = ["world"];
const hello_world_array = hello_array.concat(world_array);

// console.log(hello_world_array);

// Array.at
// A newer array method and is like bracket notation and a little bit more convenient.
// Accepts either a positive or a negative integer.
// A negative integer will start counting from the last index of the array.

// console.log(hello_world_array.at(-1)); // "world";

// Array.from
// Static method (meaning we call it using the Array() class). It takes
// in an array-like object or an item that is iterable (can be looped over with
// for..of loop). Accepts an optional second parameter callback function (mapFn) where we can
// perform operations on each item in the array-like item from the first argument.
// This is almost like Array.map() except it does not create a new array and only has
// two arguments from the callback (item, index) without the array as the third argument since
// the array is still being made.

// Useful if there are array-like data structures (i.e. NodeListOf<Element>) where we want the Array methods
// available to them (i.e. map, sort, filter, etc.).
let one_two_three = "123";
const string_to_array = Array.from(one_two_three, (item) => {
	return parseInt(item) + 1;
});

// console.log(string_to_array);

// Array.includes
// searches for the item provided as a parameter and returns a boolean to indicate
// whether the item exists in the array or not.

const my_favourite_pets = ["cat", "dog"];
const is_a_cat_my_favourite = my_favourite_pets.includes("cat");

// console.log(is_a_cat_my_favourite);

// Array.sort
// Sorts an array in place (changes the arrangement of the array that calls
// this method). This means that this method will not create a new array and is memory-efficient.
// If the array that calls this method should be immutable, then use the toReversed method instead. However, it's new and requires more browser support.

// Takes in a callback function as its first parameter. If no callback function
// is provided, then the sort method will convert each item into a string and compare their arrangement
// in the Unicode order. The callback function
// receives two parameters which are the current two items being sorted. In the callback function,
// either -1, 0, or 1 must be returned. What matters here is that
// the callback function must return either a negative, 0, or a poisitve integer. 
// If a positive integer is returned, then a will come after b (i.e. [b, a]).
// If a negative integer is returned, then b will come after a (i.e. [a, b]).
// If zero is returned, then their original positions are retained.

// Returns a reference to the array that is sorted. Note that it's only a reference, so it's
// not a copy of the array.
const totally_unarranged_numbers = [10, 2, 9, 5, 4, 1, 3, 7, 9, 6, 8];

totally_unarranged_numbers.sort((a, b) => {
	if (a === b) {
		return 0; 
	}

	return a < b ? -1 : 1;
});

// console.log(totally_unarranged_numbers);

// Array.splice
// Changes items in an array by removing or replacing the current items or adding new ones.
// This is a bit like sort, where it does its thing in place (does not make a new array).

// The first parameter tells which index will the method begin.
// If the start value provided is < length of the array, then zero is used.
// If the start value provided is >= length of the array, then nothing will be deleted
// but will add items to the array based on the amount of items provided.
// If a negative value is provided, then the method will start at the last item in the array.
// If start is not provided (splice() is called as is without arguments), then nothing is deleted.

// The second parameter tells the amount of items that will be removed in the array from the start.
// If this is not provided or the value is >= the number of items after the specified start,
// then all the items from the start until the end will be deleted.
// If this is zero or a negative integer, then no value will be deleted. If this is the case,
// then you must specify at least an element that will be added to the array (the rest of the arguments).

// The third and ...n amount of arguments are the items to be added to the array from the start.
// After removing the items, then these arguments will be added in order. If a third argument or more is not provided, then the method will only remove items in the array.

const my_favourite_subjects = ["Math", "Music", "Digital Related Subject"];

// insert "Science" at the end
my_favourite_subjects.splice(my_favourite_subjects.length, 0, "Science");

// console.log(my_favourite_subjects);

// Of course, the method above works, but if you only want to add an item at the end of the array, then use the method below

// Array.push
// Adds an item at the end of an array.

const bucket_list = ["Run a Marathon", "Sky diving", "Make my own AI", "Hike a tall mountain"];

bucket_list.push("Make a cool indie film");

// console.log(bucket_list);

// Array.pop()
// Removes an item at the end of an array. This will return the removed item.
// This will not remove anything and return undefined when the array is empty.

bucket_list.pop();

// console.log(bucket_list);

// Array.shift()
// Removes an item at the start of an array. This will return the removed item.
// This will not remove anything and return undefined when the array is empty.

bucket_list.shift();
 
// console.log(bucket_list);

// Array.unshift()
// Adds an item at the beginning of an array.

bucket_list.unshift("Run a Marathon");

//console.log(bucket_list);

// Array.slice
// creates a new array which is a shallow copy

// Array.flat
// Flattens the array, meaning that it creates a new array which is the combination of the surface-level data, and its sub-arrays based on the depth provided as its argument.

const two_dimensional_array_to_be_flattened = [[1, 2], [3, 4]];

const flattened_two_dimensional_Array_to_be_flattened = two_dimensional_array_to_be_flattened.flat();

// console.log(flattened_two_dimensional_Array_to_be_flattened);

// Array.forEach
// Performs a function per item in an array

const list_of_players = [
	{
		name: "Deez",
		age: 24,
		avg_score: 0.9
	},
	{
		name: "Nuts",
		age: 21,
		avg_score: 0.95
	}
];

list_of_players.forEach((player) => {
	// probably display it or save it to a database after doing something with the data.
	// console.log(player);
});

