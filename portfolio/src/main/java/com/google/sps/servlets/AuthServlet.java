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

package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.auth.AuthState;
import com.google.sps.auth.AuthStateFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that handles authentication. */
@WebServlet(Constants.AUTH_SERVLET_PATH)
public class AuthServlet extends HttpServlet {

  private final Gson gson = new Gson();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    final AuthState authState = AuthStateFactory.getState();
    final String redirectUrl = request.getParameter(Constants.REDIRECT_AUTH_URL_PARAMETER_NAME);
    authState.setRedirectUrl(
        redirectUrl != null ? redirectUrl : Constants.DEFAULT_AUTH_REDIRECT_URL);
    response.setContentType(Constants.JSON_GET_CONTENT_TYPE);
    response.getWriter().println(this.gson.toJson(authState.getStatus()));
  }
}
