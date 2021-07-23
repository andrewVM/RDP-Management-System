import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { reset } from 'axe-core';


/*async function loginUser(credentials) {
    return fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}*/




class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUsername: '',
            loginPassword: '',
            loginCorrect: '',
            usernameError: '',
            passwordError: '',
            loginError: ''
        }
    }

    onUsernameChange = (event) => {
        this.setState({ loginUsername: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ loginPassword: event.target.value })
    }


    onValidate = () => {
        let usernameError = '';
        let passwordError = '';
        

        if (!this.state.loginUsername || !this.state.loginPassword) {
            if (!this.state.loginUsername) {
                usernameError = 'username cannot be blank'
            }

            if (!this.state.loginPassword) {
                passwordError = 'Password cannot be blank'
            }
        } else {
            this.setState({usernameError: ''})
            this.setState({passwordError: ''})
        }


        if (usernameError || passwordError ) {
            this.setState({ usernameError, passwordError })
            
        }
       
    }



    onSubmitLogin = () => {


        fetch('http://localhost:3001/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.loginUsername,
                password: this.state.loginPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.username) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');

                } else if(!this.state.loginUsername || !this.state.loginPassword) {
                    this.setState({ loginError: '' }) 
                } else {
                    this.setState({ loginError: 'Wrong username or Password' })
                }
            })
            .catch(err => console.log(err.data))
        this.onValidate();

    }



    /*const [username, setUserName] = useState();
    const [password, setPassword] = useState();*/

    /*const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
      }*/

    render() {

        return (
            <div className='d-flex justify-content-center'>
                <article className="br3 bg-light-gray ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 left">
                    <div className='LoginForm pa3' >
                        <h1  >Login</h1>
                        <form  >
                            <div className='mb-3 '   >
                                <label className='d-flex justify-content-start' htmlFor='username'>Username:</label>
                                <input id='username' type='text' placeholder='Enter username' className='form-control' onChange={this.onUsernameChange} />
                            </div>
                            <div style={{ color: 'red' }} >
                                {this.state.usernameError}
                            </div> <br />
                            <div className='mb-3' >
                                <label className='d-flex justify-content-start' htmlFor='password'>Password:</label>
                                <input id='password' type='password' placeholder='Enter password' className='form-control' onChange={this.onPasswordChange} />
                            </div>
                            <div style={{ color: 'red' }} >
                                {this.state.passwordError}
                            </div>
                            <br />
                            <Link  >
                                <button type='submit' className='btn btn-primary' onClick={this.onSubmitLogin} >Login</button>
                            </Link>
                            <div style={{ color: 'red' }} >
                                {this.state.loginError}
                            </div> <br />
                            <div>
                                <a className='d-flex justify-content-end' href='' >Forgot Password?</a>
                            </div>
                        </form>
                    </div>
                </article>
            </div>
        );
    };


}

/*LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
  }*/

export default LoginForm;