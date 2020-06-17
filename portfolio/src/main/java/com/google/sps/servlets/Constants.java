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

/** Class holding shared constants across all servlets. */
public final class Constants {

  // Authentication.
  public static final String AUTH_SERVLET_PATH = "/auth";
  public static final String DEFAULT_AUTH_REDIRECT_URL = "/";
  public static final String REDIRECT_AUTH_URL_PARAMETER_NAME = "redirect";

  // User comments.
  public static final String COMMENT_ENTITY_NAME = "Comment";
  public static final String COMMENT_POST_MESSAGE_PARAMETER = "body";
  public static final String COMMENT_POST_NAME_PARAMETER = "name";
  public static final String DATA_SERVLET_PATH = "/data";
  public static final String DEFAULT_POST_REDIRECT_URL = "/";
  public static final String PROPERTY_COMMENT_CREATED_NAME = "created";
  public static final String PROPERTY_COMMENT_MESSAGE_NAME = "message";
  public static final String PROPERTY_COMMENT_NAME = "name";

  // Random facts.
  public static final String RANDOM_FACT_SERVLET_PATH = "/random-fact";

  // Content types.
  public static final String HTML_CONTENT_TYPE = "text/html;";
  public static final String JSON_GET_CONTENT_TYPE = "text/json;";

  private Constants() {}
}
