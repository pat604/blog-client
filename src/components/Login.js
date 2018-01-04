import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, logout } from 'redux-implicit-oauth2'
import { connect } from 'react-redux'


class Login extends Component {

    render() {
        const { isLoggedIn, login, logout } = this.props;

        const button = isLoggedIn ? <button type='button' onClick={logout} >Logout</button> :
            <button type='button' onClick={login} className="btn btn-primary btn-lg btn-raised btn-block">Sign In</button>

        if (isLoggedIn) {
            return (
                <div>
                    <Link to="/posts"><button>Posts</button></Link>
                    {button}
                </div>
            )
        }
        return (
            <div>
                {button}
            </div>
        )
    }

}
const mapStateToProps = ({ auth }) => ({
    isLoggedIn: auth.isLoggedIn
});

const mapDispatchToProps = {
    login: () => login(tokenConfig),
    logout
};

const tokenConfig = {
    url: 'http://blogapi.app/oauth/authorize',
    client: 1,
    redirect: 'http://localhost:3000/posts',
    scope: '',
    width: 400, // Width (in pixels) of login popup window. Optional, default: 400
    height: 400
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);




