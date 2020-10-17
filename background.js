"use strict";

const sentOnCompletedMessage = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {completed: true});
  });
}

chrome.webNavigation.onCompleted.addListener(sentOnCompletedMessage);
