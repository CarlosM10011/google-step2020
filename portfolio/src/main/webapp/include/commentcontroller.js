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

import {CommentView} from '/include/commentview.js';

/**
 * View controller for each comment.
 * @private @final
 */
export class CommentController {
  /**
   * @param {!Comment} model
   * @param {!CommentView} view
   */
  constructor(model, view) {
    /** @private @const {!Comment} */
    this.model_ = model;
    /** @private @const {!CommentView} */
    this.view_ = view;
  }

  /** Updates the view. */
  updateView() {
    this.view_.render(
        this.model_.getName(), this.model_.getDate(), this.model_.getMessage());
  }

  /** @return {!string} */
  getCommentName() {
    return this.model_.getName();
  }

  /** @return {!string} */
  getCommentDate() {
    return this.model_.getDate();
  }

  /** @return {!string} */
  getCommentMessage() {
    return this.model_.getMessage();
  }

  /** @param {!string} name */
  setCommentName(name) {
    this.model_.setName(name);
  }

  /** @param {!string} date */
  setCommentDate(date) {
    this.model_.setDate(date);
  }

  /** @param {!string} message */
  setCommentMessage(message) {
    this.model_.setMessage(message);
  }
}
