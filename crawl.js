const normalizeURL = (urlString) => {
  const urlObj = new URL(urlString);

  let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
  if(fullPath.length && fullPath.slice(-1) === '/') {
    return fullPath.slice(0, -1);
  }
  
  return fullPath;
}

normalizeURL('http://Localhost:8080/Hello')

module.exports = {
  normalizeURL
}