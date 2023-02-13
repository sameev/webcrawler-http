const { JSDOM } = require("jsdom");

const normalizeURL = (urlString) => {
  const urlObj = new URL(urlString);

  let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (fullPath.length && fullPath.slice(-1) === "/") {
    return fullPath.slice(0, -1);
  }

  return fullPath;
};

const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  linkElements.forEach((link) => {
    if (link.href[0] === "/") {
      //relative
      try {
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`${link.href} is not a valid URL: ${err.message}`);
      }
    } else {
      //absolute
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`${link.href} is not a valid URL: ${err.message}`);
      }
    }
  });
  return urls;
};

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) return pages;

  const normalizedURL = normalizeURL(currentURL);

  if (normalizedURL in pages) {
    pages[normalizedURL]++;
    return pages;
  } else {
    pages[normalizedURL] = 1;
  }

  // console.log(pages)
  console.log(`Actively crawling ${currentURL}.`);

  try {
    const res = await fetch(currentURL);
    if (res.status > 399) {
      // throw new Error(`Received HTTP Error. Status Code: ${res.status}`)
      console.log(`Received HTTP Error. Status Code: ${res.status}`);
      return pages;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      // throw new Error(`Received non-html response`);
      console.log(`Received non-html response from ${currentURL}.`);
      return pages;
    }

    const htmlBody = await res.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }

    return pages;
  } catch (err) {
    console.log(`Error in fetching ${currentURL}: ${err.message}`);
    return pages;
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
