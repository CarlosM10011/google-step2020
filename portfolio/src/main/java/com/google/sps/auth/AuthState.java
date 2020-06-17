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

package com.google.sps.auth;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.sps.data.AuthStatus;

/** Abstract class of state of logged in user */
public abstract class AuthState {

  protected String redirectUrl = null;
  protected final UserService userService = UserServiceFactory.getUserService();

  /**
   * Returns an object with info of the logged in user. Useful for serializing to json.
   *
   * @return an object of AuthStatus.
   */
  public abstract AuthStatus getStatus();

  /** Returns true if the user is logged in. */
  public boolean isLoggedIn() {
    return this.userService.isUserLoggedIn();
  }

  /** Sets the redirect url for the browser post login/logout. */
  public void setRedirectUrl(String url) {
    this.redirectUrl = url;
  }
}