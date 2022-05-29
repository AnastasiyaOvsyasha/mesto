export default class UserInfo {
  constructor({
    userNameSelector,
    userAboutSelector
  }) {
    this._userAboutContainer = document.querySelector(userAboutSelector);
    this._userNameContainer = document.querySelector(userNameSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameContainer.textContent,
      about: this._userAboutContainer.textContent
    }
  }

  setUserInfo({
    newUserName,
    newUserAbout
  }) {
    this._userNameContainer.textContent = newUserName;
    this._userAboutContainer.textContent = newUserAbout;
  }
}
