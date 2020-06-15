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
import com.google.sps.data.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns all comment data. */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  private final ArrayList<Comment> comments = new ArrayList<Comment>();
  private final String GET_CONTENT_TYPE = "text/json;";
  private final Gson gson = new Gson();
  private final String POST_MESSAGE_PARAMETER = "body";
  private final String POST_NAME_PARAMETER = "name";
  private final String POST_REDIRECT_URL = "/";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String output = gson.toJson(this.comments);
    response.setContentType(this.GET_CONTENT_TYPE);
    response.getWriter().println(output);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    final String name = request.getParameter(POST_NAME_PARAMETER);
    final String body = request.getParameter(POST_MESSAGE_PARAMETER);
    if (!isSaneForm(name, body)) {
      response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid form input.");
      return;
    }
    this.comments.add(new Comment(name, new Date(), body));
    response.sendRedirect(this.POST_REDIRECT_URL);
  }

  /** Checks to see if the comment form sent via the html post is valid. */
  private Boolean isSaneForm(String name, String body) {
    return (name != null && !name.isEmpty())
        && (body != null && !body.isEmpty()); // Someone sending a bad form.
  }
}
