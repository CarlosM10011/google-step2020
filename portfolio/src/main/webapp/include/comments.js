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

  /** @return {!string|undefined} */
  getDate() {
    return this.date_;
  }

  /** @return {!string|undefined} */
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
    /** @private @const {!string} */
    this.elementId_ =
        btoa(Math.random() + Date.now())
            .substring(0, 12);  // Try to create id using base64 encoding.
    const commentTemplate = document.getElementById('comment-template');
    /** @private @const {!Object} */
    this.newComment_ = commentTemplate.content.cloneNode(true);
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.appendChild(this.newComment_);
    const idAttrib = document.createAttribute('id');
    idAttrib.value = this.elementId_;
    this.newComment_.setAttributeNode(idAttrib_);
  }

  /**
   * Updates the comment's displayed content.
   * @param {!string} name
   * @param {!string} date
   * @param {!string} message
   */
  updateView(name, date, message) {
    const subjectElement = this.newComment_.getElementById('subject');
    subjectElement.textContent = `${name} on ${date}`;
    const bodyElement = this.newComment_.getElementById('body');
    bodyElement.textContent = message;
  }
}
