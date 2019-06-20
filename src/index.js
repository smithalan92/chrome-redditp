// URL patterns we want the context menu to appear for
const targetUrls = [
  "http://reddit.com/r/*",
  "http://www.reddit.com/r/*",
  "https://reddit.com/r/*",
  "https://www.reddit.com/r/*",
  "http://redditlist.com/search/*"
];

// Context Menu Title
const contextMenuTitle = 'Open on RedditP';
// Context menu context targets
const contexts = ['link'];

// Handle click of context menu
OnClick = (info) => {
  let url = info.linkUrl

  if (url.includes('redditlist.com/search')) {
    const indexOfRedir = url.indexOf('redir?sub=');
    let subreddit = url.substring(indexOfRedir + 10, url.length);
    const indexOfTerm = subreddit.indexOf('&term');
    subreddit = subreddit.substring(0, indexOfTerm);
    url = `http://redditp.com/r/${subreddit}`
  } else {
    url = info.linkUrl.replace("reddit", "redditp");
  }

  chrome.tabs.create({ url });
}

// Create the context menu
chrome.contextMenus.create({
  title: contextMenuTitle,
  contexts: contexts,
  targetUrlPatterns: targetUrls,
  onclick: OnClick,
});
