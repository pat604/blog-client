import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dateFormat from 'dateformat';

import AddPostForm from '../components/AddPostForm';


class Posts extends Component {

    constructor() {
        super();
        this.renderPost = this.renderPost.bind(this);
        this.addPost = this.addPost.bind(this);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('//blogapi.app/api/posts', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            this.setState({ posts: response.data.data });
            console.log(this.state.posts)
        });
    }

    addPost(post) {
        axios.post('//blogapi.app/api/posts', post, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
            
            // fetch posts again 
            axios.get('//blogapi.app/api/posts', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                this.setState({ posts: response.data.data });
                console.log(this.state.posts)
            });


        }).catch((error) => console.log(error));
    
    }


    // Link: params={{post: post}}
    renderPost(key) {
        const post = this.state.posts[key];
        console.log(post);

        return (
            <div key={key}>
                <Link to={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
                <p>{post.body}</p>
                <p>Posted on {dateFormat(post.created_at.date, "dddd, mmmm dS, yyyy")} by <strong>{post.author.name}</strong></p>
                <hr />
            </div>
        )
    }


    render() {
        const postIds = Object.keys(this.state.posts);

        return (
            <div>
                {postIds.map(this.renderPost)}
                <AddPostForm addPost={this.addPost} />

            </div>
        );
    }
}

export default Posts;


