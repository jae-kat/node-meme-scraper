// create a writable stream, to write data to a file
import { createWriteStream, mkdir } from 'node:fs';
// to direct the images into the correct folder
import path from 'node:path/posix';
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
for (const item of htmlArray) {
  const index = item.indexOf('"');
  srcArr.push(item.slice(0, index));
}

// remove the first 2 elements of the array, these are not an img src
srcArr.shift();
srcArr.shift();

// create a folder for the memes
const folder = () => {
  mkdir(path.join('memes'), { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  });
};
folder();

// write a loop. each src url is 1) downloaded 2) named 3) stored in memes folder
for (let i = 0; i < 10; i++) {
  // 1)
  const download = await axios({
    url: srcArr[i],
    method: 'GET',
    responseType: 'stream',
  });

  const imgName = i < 9 ? `0${i + 1}.jpg` : `${i + 1}.jpg`; // 2)

  const filePath = path.resolve('./memes', imgName);
  download.data.pipe(createWriteStream(filePath)); // 3)

  // log the download progress
  console.log(i + 1 + ' of 10');
}
