export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, avatarSelector, userId }) {
    this.userId = userId;
    this._userNameContainer = document.querySelector(userNameSelector);
    this._userAboutContainer = document.querySelector(userAboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameContainer.textContent,
      about: this._userAboutContainer.textContent,
      avatar: this._avatar.src,
      _id: this.userId,
    };
  }

  setUserInfo(data) {
      this._userNameContainer.textContent = data.name;
      this._userAboutContainer.textContent = data.about;
      this._avatar.src = data.avatar;
      this._avatar.alt = this._userNameContainer.textContent;
      this.userId = data._id;
  }
}
