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

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

const addComments =
    async () => {
  try {
    const commentTemplate = document.getElementById('comment-template');
    const commentsContainer = document.getElementById('comments-container');
    const response = await fetch('/data');
    if (response.status < 200 ||
        response.status > 299) {  // HTTP error codes in the 200 range are okay.
      throw response.status;
    }
    const rawComments = await response.json();
    for (let i = 0; i < rawComments.length; i++) {
      const newComment = commentTemplate.content.cloneNode(true);
      const subjectElement = newComment.getElementById('subject');
      const bodyElement = newComment.getElementById('body');
      subjectElement.textContent =
          rawComments[i].name + ' on ' + rawComments[i].created;
      bodyElement.textContent = rawComments[i].message;
      commentsContainer.appendChild(newComment);
    }
  } catch (e) {
    console.error('Error:');
    console.error(e);
    commentsContainer.innerText =
        'An error occured loading comments. Please try again later.';
    return;
  }
}

                /** At the monent, this only loads comments */
                window.onload = () => {
  addComments();
}
