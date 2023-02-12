const { JSDOM } = require('jsdom');

const normalizeURL = (urlString) => {
  const urlObj = new URL(urlString);

  let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
  if(fullPath.length && fullPath.slice(-1) === '/') {
    return fullPath.slice(0, -1);
  }
  
  return fullPath;
}


const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');

  linkElements.forEach( link => {
    if(link.href[0] === '/') {
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
        urls.push(urlObj.href)
      } catch (err) {
        console.log(`${link.href} is not a valid URL: ${err.message}`)
      }
    }
  })
  return urls;
}

async function crawlPage(currentURL) {
  console.log(`Actively crawling ${currentURL}.`)
  try {
    const res = await fetch (currentURL)
    if(res.status > 399) {
      throw new Error(`Received HTTP Error. Status Code: ${res.status}`)
    }

    const contentType = res.headers.get('content-type');
    if(!contentType.includes('text/html')) {
      throw new Error(`Received non-html response`)
    }

    const htmlBody = await res.text();
    console.log(htmlBody)
  } catch (err) {
    console.log(`Error in fetching ${currentURL}: ${err.message}`)
  }
}


module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}