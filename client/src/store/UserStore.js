import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._IsAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._IsAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }

  get IsAuth() {
    return this._IsAuth;
  }
  get user() {
    return this._user;
  }
}
