import React, { Component } from 'react';
import axios from 'axios';

class AddCommentForm extends Component {

    constructor() {
        super();
        this.addComment = this.addComment.bind(this);
        this.createComment = this.createComment.bind(this);
    }

    // a form submitja hívja
    createComment(event) {
        event.preventDefault();
        console.log(this.body.value);
        const comment = {
            body: this.body.value
        }

        this.addComment(comment);
        this.commentForm.reset();

        /* reload page
        const { match, location, history } = this.props;
        history.push(`//blogapi.app/api/posts/${this.props.postId}/comments`);
        */
    }

    addComment(comment) {
        axios.post(`//blogapi.app/api/posts/${this.props.postId}/comments`, comment, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            console.log(response);

            this.props.reloadComments();
        });
    }


    render() {
        return (
            <div>
                <h2>Add New Comment</h2>
                <form ref={(input) => this.commentForm = input} onSubmit={(e) => this.createComment(e)} >
                    <div className="form-group">
                        <textarea className="form-control" ref={(input) => this.body = input} placeholder="Body" />
                    </div>
                    <button className="btn btn-default" type="submit">Post</button>
                </form>
            </div>
        );
    }
}

export default AddCommentForm;

