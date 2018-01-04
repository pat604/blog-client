import React, { Component } from 'react';
import AddCommentForm from '../components/AddCommentForm';

import axios from 'axios';
import dateFormat from 'dateformat';


class Comments extends Component {

    constructor() {
        super();
        this.reloadComments = this.reloadComments.bind(this);

        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        axios.get(`//blogapi.app/api/posts/${this.props.match.params.postId}/comments`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            this.setState({ comments: response.data.data });
            console.log(this.state.comments)
        });
    }

    reloadComments() {
        axios.get(`//blogapi.app/api/posts/${this.props.match.params.postId}/comments`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            this.setState({ comments: response.data.data });
            console.log(this.state.comments)
        });
    }

    deleteComment(comment) {
        axios.delete(`//blogapi.app/api/posts/${this.props.match.params.postId}/comments/${comment.id}`, comment, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            console.log(response);

            axios.get(`//blogapi.app/api/posts/${this.props.match.params.postId}/comments`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                this.setState({ comments: response.data.data });
                console.log(this.state.comments)
            });
        });
    }


    render() {
        const comments = this.state.comments;
        console.log(comments);

        return (
            <div>
                <h2>Comments</h2>

                {comments.map(comment => (
                    <div key={comment.id}>
                        <strong> {comment.author.name}</strong>: {comment.body}     <br />      
                        On {dateFormat(comment.created_at.date, "mmmm dS, yyyy")}    <br />
                        <button className="btn" onClick={() => this.deleteComment(comment)}>Delete</button>
                    </div>
                ))}

                <hr />
                <AddCommentForm postId={this.props.match.params.postId} reloadComments={this.reloadComments}/>
            </div>
        )

    }
}


export default Comments;