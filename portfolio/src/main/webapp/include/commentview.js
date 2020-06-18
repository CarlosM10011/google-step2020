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

/* @fileoverview Module to help with rendering user comments. */

import {Comment} from '/include/comment.js';

/**
 * Class to render a comment.
 * @private @final
 */
export class CommentView {
  constructor() {
    const commentTemplate = document.getElementById('comment-template');
    const newComment = commentTemplate.content.cloneNode(true);
    /** @private @const {!Object} */
    this.subjectElement_ = newComment.getElementById('subject');
    /** @private @const {!Object} */
    this.bodyElement_ = newComment.getElementById('body');
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.appendChild(newComment);
  }

  /**
   * Updates the comment's displayed content.
   * @param {!string} name
   * @param {!string} date
   * @param {!string} message
   */
  render(name, date, message) {
    this.subjectElement_.textContent = `${name} on ${date}`;
    this.bodyElement_.textContent = message;
  }
}
