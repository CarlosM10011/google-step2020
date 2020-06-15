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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
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
@WebServlet(Constants.DATA_SERVLET_PATH)
public class DataServlet extends HttpServlet {

  private final ArrayList<Comment> comments = new ArrayList<Comment>();
  private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  private final Gson gson = new Gson();
  private final Query query =
      new Query(Constants.COMMENT_ENTITY_NAME)
          .addSort(Constants.PROPERTY_COMMENT_CREATED_NAME, SortDirection.DESCENDING);

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    this.comments.clear();
    PreparedQuery results = this.datastore.prepare(this.query);
    for (Entity comment : results.asIterable()) {
      final String name = (String) comment.getProperty(Constants.PROPERTY_COMMENT_NAME);
      final Date created =
          new Date((long) comment.getProperty(Constants.PROPERTY_COMMENT_CREATED_NAME));
      final String message = (String) comment.getProperty(Constants.PROPERTY_COMMENT_MESSAGE_NAME);
      this.comments.add(new Comment(name, created, message));
    }
    String output = gson.toJson(this.comments);
    response.setContentType(Constants.JSON_GET_CONTENT_TYPE);
    response.getWriter().println(output);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    final String name = request.getParameter(Constants.COMMENT_POST_NAME_PARAMETER);
    final String body = request.getParameter(Constants.COMMENT_POST_MESSAGE_PARAMETER);
    if (!isSaneForm(name, body)) {
      response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid form input.");
      return;
    }
    final long created = System.currentTimeMillis();
    final Entity commentEntity = new Entity(Constants.COMMENT_ENTITY_NAME);
    commentEntity.setProperty(Constants.PROPERTY_COMMENT_NAME, name);
    commentEntity.setProperty(Constants.PROPERTY_COMMENT_CREATED_NAME, created);
    commentEntity.setProperty(Constants.PROPERTY_COMMENT_MESSAGE_NAME, body);
    this.datastore.put(commentEntity);
    response.sendRedirect(Constants.DEFAULT_POST_REDIRECT_URL);
  }

  /** Checks to see if the comment form sent via the html post is valid. */
  private Boolean isSaneForm(String name, String body) {
    return (name != null && !name.isEmpty())
        && (body != null && !body.isEmpty()); // Someone sending a bad form.
  }
}
