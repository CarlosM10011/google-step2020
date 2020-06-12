// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* @fileoverview Module to help with user authentication. */

/** @const {!string} */
const AUTH_STATUS_URL = '/auth';
/** @const {!string} */
const QUERY_URL = `${AUTH_STATUS_URL}?redirect=${
    window.encodeURIComponent(window.location.href)}`;

/** Immutable class that holds user login information. */
export class AuthState {
  constructor() {
    return (async () => {
      try {
        const response = await fetch(QUERY_URL);
        if (!response.ok) {
          throw new Error(
              'Error occurred while fetching user data.', response.status,
              response.statusText);
        }
        const userData = await response.json();
        /** @private @const {!string|undefined} */
        this.actionUrl_ = userData.actionUrl;
        /** @private @const {!string|undefined} */
        this.email_ = userData.email;
        /** @private @const {!boolean} */
        this.isLoggedIn_ = userData.isLoggedIn;
        /** @private @const {!string|undefined} */
        this.nickname_ = userData.nickname;
      } catch (e) {
        console.error(e);
      }
      return this;
    })();
  }

  /** @return {!string} */
  getActionUrl() {
    return this.actionUrl_;
  }

  /** @return {!string|undefined} */
  getEmail() {
    return this.email_;
  }

  /** @return {!string|undefined} */
  getNickname() {
    return this.nickname_;
  }

  /** @return {!boolean} */
  isLoggedIn() {
    return this.isLoggedIn_;
  }
}
