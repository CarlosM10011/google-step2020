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

/** Adds a random fact to the page. */
const addRandomFact = async () => {
  const factContainer = document.getElementById('fact-container');
  const response = await fetch('/random-fact');
  try {
    if (response.status < 200 ||
        response.status > 299) {  // HTTP codes in the 200 range are okay.
      throw response.status;
    }
    const fact = await response.text();
    // Add it to the page.
    factContainer.innerText = fact;
  } catch (e) {
    console.error('Exception thrown.');
    console.error(e);
    factContainer.innerText =
        'Sorry, an error occured. Please try again later.';
  }
}

const addComments = async () => {
  const commentsContainer = document.getElementById('comments-container');
  try {
    const response = await fetch('/data');
    if (!response.ok) {
      throw new Error(
          'Error occurred while fetching comment data.', response.status,
          response.statusText);
    }
    const rawComments = await response.json();
    const commentTemplate = document.getElementById('comment-template');
    for (let i = 0; i < rawComments.length; i++) {
      const newComment = commentTemplate.content.cloneNode(true);
      const subjectElement = newComment.getElementById('subject');
      subjectElement.textContent =
          `${rawComments[i].name} on ${rawComments[i].created}`;
      const bodyElement = newComment.getElementById('body');
      bodyElement.textContent = rawComments[i].message;
      commentsContainer.appendChild(newComment);
    }
  } catch (e) {
    console.error(e);
    commentsContainer.innerText =
        'An error occured loading comments. Please try again later.';
    return;
  }
};

/** At the monent, this only loads comments. */
window.onload = () => {
  addComments();
};
