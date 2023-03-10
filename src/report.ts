import type { Pages } from "./types.js"

function sortPages(pages: Pages) {
  const pagesArr = Object.entries(pages);
  return pagesArr.sort((a, b) => b[1] - a[1]);
}

function printReport(pages: Pages) {
  console.log('============');
  console.log(
    'See Below For Results (Printed from most-to-least internal link count)'
  );
  console.log('============');

  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    if(page[1] === 1) {
      console.log(`Found ${page[1]} internal link to ${page[0]}.`);
    } else {
      console.log(`Found ${page[1]} internal links to ${page[0]}.`);
    }
  }

  console.log('============');
  console.log('End of Report');
  console.log('============');
}

export {
  sortPages,
  printReport
};
