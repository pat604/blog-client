import React, { Component } from 'react';

class AddPostForm extends Component {

    // a form submitja hívja
    createPost(event) {
        event.preventDefault();
        const post = {
            title: this.title.value,
            body: this.body.value,
        }

        this.props.addPost(post);
        this.postForm.reset();       
    }


    render() {
        return (
            <div>
                <h2>Add New Post</h2>
                <form ref={(input) => this.postForm = input} onSubmit={(e) => this.createPost(e)} >
                    <div className="form-group">
                        <input className="form-control" ref={(input) => this.title = input} type="text" placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" ref={(input) => this.body = input} placeholder="Body" />
                    </div>
                    <button className="btn btn-default" type="submit">Post</button>
                </form>
            </div>
        );
    }
}

export default AddPostForm;

