import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  if (process.argv[2] === undefined) {
    console.log('No website provided.');
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log('Too many arguments provided.');
    process.exit(1);
  } else {
    const baseURL = process.argv[2];
    console.log(`Starting web crawl of ${baseURL}.`);
    const pages = await crawlPage(baseURL, baseURL, {});

    printReport(pages);
  }
}

await main();
