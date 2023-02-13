function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  return pagesArr.sort((a,b) => b[1] - a[1])
}

function printReport(pages) {
  console.log('============');
  console.log('See Below For Results (Printed from most-to-least internal link count)');
  console.log('============');

  const sortedPages = sortPages(pages)
  for(const page of sortedPages) {
    console.log(`Found ${page[1]} internal links to ${page[0]}.`)
  }

  console.log('============');
  console.log('End of Report');
  console.log('============');
}


module.exports = {
  sortPages,
  printReport
}