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

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that generates a random quote. */
@WebServlet("/random-fact")
public class RandomFactServlet extends HttpServlet {

  private final String CONTENT_TYPE = "text/html;";
  private List<String> facts =
      Arrays.asList(
          new String[] {
            "Our air is composed of mostly nitrogen.",
            "Moore's Law is an observation.",
            "The Summit supercomputer can reach up to 200 petaFLOPS."
          });
  private final Random rand = new Random();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType(CONTENT_TYPE);
    response.getWriter().println(facts.get(rand.nextInt(facts.size())));
  }
}
