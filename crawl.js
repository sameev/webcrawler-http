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


module.exports = {
  normalizeURL,
  getURLsFromHTML
}