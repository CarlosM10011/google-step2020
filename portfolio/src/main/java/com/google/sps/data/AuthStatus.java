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

package com.google.sps.data;

/** Class that holds user info */
public final class AuthStatus {

  private final String email;
  private final Boolean isLoggedIn;
  private final String nickname;
  private final String actionUrl;

  public AuthStatus(String email, Boolean isLoggedIn, String nickname, String actionUrl) {
    this.email = email;
    this.isLoggedIn = isLoggedIn;
    this.nickname = nickname;
    this.actionUrl = actionUrl;
  }

  public String getActionUrl() {
    return this.actionUrl;
  }

  public String getEmail() {
    return this.email;
  }

  public String getNickname() {
    return this.nickname;
  }

  public Boolean isLoggedIn() {
    return this.isLoggedIn;
  }
}
