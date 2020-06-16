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

/**
 * Comment Model.
 * @private @final
 */
class Comment {
  /**
   * @param {!string} name
   * @param {!string} date
   * @param {!string} message
   */
  constructor(name, date, message) {
    /** @private @type {!string} */
    this.name_ = name;
    /** @private @type {!string} */
    this.date_ = date;
    /** @private @type {!string} */
    this.message_ = message;
  }

  /** @return {!string} */
  getName() {
    return this.name_;
  }

  /** @return {!string} */
  getDate() {
    return this.date_;
  }

  /** @return {!string} */
  getMessage() {
    return this.message_;
  }

  /** @param {!string} name */
  setName(name) {
    this.name_ = name;
  }

  /** @param {!string} date */
  setDate(date) {
    this.date_ = date;
  }

  /** @param {!string} message */
  setMessage(message) {
    this.message_ = message;
  }
}

/**
 * Class to render a comment.
 * @private @final
 */
class CommentView {
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

/**
 * View controller for each comment.
 * @private @final
 */
class CommentController {
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
