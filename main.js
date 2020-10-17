"use strict";

const getSelectors = () => {
  const urlInputs = document.querySelectorAll('[id*="pageUrl-"]');
  const loginInput = document.getElementById('login');
  const passwordInput = document.getElementById('password');
  const activeInput = document.getElementById('deactivate');

  return {
    urlInputs,
    loginInput,
    passwordInput,
    activeInput,
  }
}

const getValueFromInputs = (inputs) => {
  return Array.from(inputs).map((input) => input.value);
}

const setValueToInputs = (inputs, values) => {
  inputs.forEach((input, key) => {
    input.value = values[key];
  });
}

const saveLoginInfo = () => {
  const {
    urlInputs,
    loginInput,
    passwordInput,
    activeInput,
  } = getSelectors();

  const inputUrls = getValueFromInputs(urlInputs);

  chrome.storage.sync.set({
    urls: inputUrls,
    login: loginInput.value,
    password: passwordInput.value,
    active: activeInput.checked,
  }, () => {
    window.close();
  })
}

const restoreOptions = () => {
  chrome.storage.sync.get({
    urls: ['', '', '', ''],
    login: '',
    password: '',
    active: true,
  }, ({
    urls,
    login,
    password,
    active,
  }) => {
    const {
      urlInputs,
      loginInput,
      passwordInput,
      activeInput,
    } = getSelectors();

    setValueToInputs(urlInputs, urls);
    loginInput.value = login;
    passwordInput.value = password;
    activeInput.checked = active;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveLoginInfo);

