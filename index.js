// lets me fetch the html from the website
import fetch from 'node-fetch';

// this requests the data from the website and stores it in the htmlString variable
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const htmlString = await response.text();

// convert the string html into arrays that start off with the image source links
const htmlArray = htmlString.split('src="');

// loop over the array, to find the first index of each end quote (")
// cut off the string at this point
// store the shorter strings (the found sources) in a new array (srcArr)

let srcArr = [];

for (let item of htmlArray) {
  let index = item.indexOf('"');
  srcArr.push(item.slice(0, index));
}

console.log(srcArr);

// the first element of the array should be ignored! index 1 to 10 are the images i want
