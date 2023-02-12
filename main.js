const { crawlPage } = require('./crawl.js');

const main = () => {
  if (process.argv.length < 3) {
    console.log('No website provided.');
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log('Too many arguments provided.')
    process.exit(1);
  } else {
    const baseURL = process.argv[2];
    console.log(`Starting web crawl of ${baseURL}.`)
    crawlPage(baseURL, {});
  }
}

main();