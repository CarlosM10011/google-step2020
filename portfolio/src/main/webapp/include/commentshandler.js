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
import {CommentController} from '/include/commentcontroller.js';
import {CommentView} from '/include/commentview.js';

/**
 * Class to control all comments.
 * @public
 */
export class CommentsHandler {
  constructor() {
    /** @type {!Array<CommentController>} */
    this.comments_ = [];
  }

  async init() {
    try {
      const response = await fetch('/data');
      if (!response.ok) {
        throw new Error(
            'Error occurred while fetching comment data.', response.status,
            response.statusText);
      }
      const rawComments = await response.json();
      this.comments_ = rawComments.map((comment) => {
        const model =
            new Comment(comment.name, comment.created, comment.message);
        const view = new CommentView();
        const commentController = new CommentController(model, view);
        commentController.updateView();
        return commentController;
      });
    } catch (e) {
      console.error(e);
      const commentsContainer = document.getElementById('comments-container');
      commentsContainer.innerText =
          'An error occured loading comments. Please try again later.';
      return;
    }
  }
}
