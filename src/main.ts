const { crawlPage } = require("./crawl.ts");
const { printReport } = require("./report.ts");

async function main() {
  if (process.argv.length < 3) {
    console.log("No website provided.");
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log("Too many arguments provided.");
    process.exit(1);
  } else {
    const baseURL = process.argv[2];
    console.log(`Starting web crawl of ${baseURL}.`);
    const pages = await crawlPage(baseURL, baseURL, {});

    printReport(pages);
  }
}

main();