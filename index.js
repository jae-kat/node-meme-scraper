// create a writable stream, to write data to a file
import { createWriteStream } from 'node:fs';
// to direct the images into the correct folder
import Path from 'node:path';
// to get the html and the image data
import axios from 'axios';

// request the html data from the website and store it as a string
const res = await axios.get(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const htmlString = res.data;

// convert the string html into an array. elements start off with the image source links
const htmlArray = htmlString.split('src="');

// loop over the array, to find the first index of each end quote (")
// cut off the string at this point and store the shorter strings in a new array

const srcArr = [];

for (let item of htmlArray) {
  const index = item.indexOf('"');
  srcArr.push(item.slice(0, index));
}

// remove the first 2 elements of the array, these are not an img src
srcArr.shift();
srcArr.shift();

// write a loop. each src url is 1) downloaded 2) named 3) stored in memes folder
for (let i = 0; i < 10; i++) {
  const download = await axios({
    // 1)
    url: srcArr[i],
    method: 'GET',
    responseType: 'stream',
  });

  const imgName = i < 9 ? `0${i + 1}.jpg` : `${i + 1}.jpg`; // 2)
  const filePath = Path.resolve('./memes', imgName);
  download.data.pipe(createWriteStream(filePath)); // 3)
}
