"use strict";

const setReactInputValue = (input, value) => {
  const previousValue = input.value;

  input.value = value;

  const tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue(previousValue);
  }

  input.dispatchEvent(new Event('change', { bubbles: true }));
}

const setValueToInputs = () => {
  const loginInput = document.querySelector('input[name="login"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const submitBtn = document.querySelector('button[type="submit"]');

  if (!loginInput || !passwordInput) {
    return;
  }

  chrome.storage.sync.get({
    login: '',
    password: '',
  }, ({ login, password }) => {
    setReactInputValue(loginInput, login);
    setReactInputValue(passwordInput, password);
    submitBtn.click();
  });
}

chrome.runtime.onMessage.addListener(
  (request, sender) => {
    if (request.completed) {
      chrome.storage.sync.get({
        urls: [],
        active: true,
      }, ({ urls, active }) => {
        const currentWindowUrl = window.location.href;
        if (urls.includes(currentWindowUrl) && active) {
          setTimeout(setValueToInputs, 1000);
        }
      });
    }
});