import React from "react";

export default class Question {
    constructor(text, images, fields, answers) {
        this.text = text;
        this.images = images;
        this.fields = fields;
        this.answers = answers;
    }
}