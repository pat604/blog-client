import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';
import dateFormat from 'dateformat';
import { EditableTextField } from 'react-bootstrap-xeditable';
import { isEmpty } from 'lodash';

class Post extends Component {

    constructor() {
        super();
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updatePost = this.updatePost.bind(this);

        this.state = {
            post: {}
        }
    }
    // ${this.props.params.postId}
    componentDidMount() {
        axios.get(`//blogapi.app/api/posts/${this.props.match.params.postId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log(response);
            this.setState({ post: response.data.data });
            console.log(this.state.post)
        });
    }

    handleUpdate(name, value) {
        var updatedPost = this.state.post;

        if (name === "body")
            updatedPost.body = value;
        else
            updatedPost.title = value;

        this.setState({ post: updatedPost });
        this.updatePost();
    }



    updatePost() {
        axios.patch(`//blogapi.app/api/posts/${this.props.match.params.postId}`, this.state.post, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            console.log(response);
        });
    }

    deletePost() {
        // delete comments first
        

        axios.delete(`//blogapi.app/api/posts/${this.props.match.params.postId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            console.log(response);
            if (response.status === 200)
                this.props.history.push('/posts')

        });
    }


    render() {
        const post = this.state.post;
        console.log('POST:', post);

        if (!isEmpty(post)) // ha már betöltődött a post
         {
             if (post.comments.length > 0)
             {
                return (
                    <div>
                        <div className="post-title">
                            <EditableTextField name="title" value={post.title} onUpdate={(name, value) => this.handleUpdate(name, value)} placeholder={post.title} />
                        </div>
                        <div className="post-body">
                            <EditableTextField name="body" value={post.body} onUpdate={(name, value) => this.handleUpdate(name, value)} placeholder={post.body} />
                        </div>
                        <p>Posted on {dateFormat(post.created_at.date, "dddd, mmmm dS, yyyy")} by <strong>{post.author.name}</strong></p>
                        <Link to={`/posts/${post.id}/comments`}><p>View Comments</p></Link>
                        <button onClick={() => this.deletePost()}>Delete Post</button>
                        <hr />                   
                    </div>
                )}
                else              {
                    return (
                        <div>
                            <div className="post-title">
                                <EditableTextField name="title" value={post.title} onUpdate={(name, value) => this.handleUpdate(name, value)} placeholder={post.title} />
                            </div>
                            <div className="post-body">
                                <EditableTextField name="body" value={post.body} onUpdate={(name, value) => this.handleUpdate(name, value)} placeholder={post.body} />
                            </div>
                            <p>Posted on {dateFormat(post.created_at.date, "dddd, mmmm dS, yyyy")} by <strong>{post.author.name}</strong></p>
                            <Link to={`/posts/${post.id}/comments`}><p>View Comments</p></Link>
                            <button onClick={() => this.deletePost()}>Delete Post</button>
                            <hr />                 
                        </div>
                    )}

            }       
            else
                return (
                    <div></div>
                );
            
    }
}

export default withRouter(Post);