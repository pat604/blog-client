import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import configureStore from './store/configureStore';

import Posts from './components/Posts';
import Post from './components/Post';
import Comments from './components/Comments';
import Login from './components/Login';
import './App.css';


const store = configureStore();

//   <Route exact path="/posts/:postId/comments/:commentId" component={Comment} />


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <h1>Blog</h1>
                        <div className="container">
                            <Switch>
                                {/* a React elv legenerál ez alapján egy postId-t és egy commentId-t */}
                                <Route exact path="/" component={Posts} />
                                <Route exact path="/posts" component={() => <Posts />} />
                                <Route exact path="/posts/:postId" component={Post} />
                                <Route exact path="/posts/:postId/comments" component={Comments} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </div>
                    </div>
                </Router>

            </Provider>
        );
    }
}

export default App;