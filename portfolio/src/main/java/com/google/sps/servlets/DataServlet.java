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
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns all comment data. */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  // Hard coded comment data for now.
  private final List<Comment> comments =
      Collections.unmodifiableList(
          Arrays.asList(
              new Comment[] {
                new Comment("Fred", new Date(), "This is comment number 1"),
                new Comment("George", new Date(), "This is comment number 2"),
                new Comment("Ron", new Date(), "This is comment number 3")
              }));

  private final String CONTENT_TYPE = "text/json;";
  private final Gson gson = new Gson();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String output = gson.toJson(this.comments);
    response.setContentType(this.CONTENT_TYPE);
    response.getWriter().println(output);
  }
}
