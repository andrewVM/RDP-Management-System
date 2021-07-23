import React from 'react';
import axios from 'axios';
import {Form, Button, Col} from 'react-bootstrap';

class RegisterUser extends React.Component {
    constructor(){
        super();
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            confPassword: '',
            user_email: '',
            user_privilege: '',
            organization_id: '',
            respond: '',
            firstNameErr: '',
            lastNameErr: '',
            usernameErr: '',
            passwordErr: '',
            password2Err: '',
            emailErr: '',
            privilegeErr: '',
            checki: '',
            organID: []
        }
    }

    async componentDidMount() {
        const responsi = await axios.get('http://localhost:3001/organizations');
        this.setState({organID: responsi.data})
    }

    onFirstNameChange = (e) => {
        this.setState({first_name: e.target.value});
    }

    onLastNameChange = (e) => {
        this.setState({last_name: e.target.value});
    }

    onUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    onConfPasswordChange = (e) => {
        this.setState({confPassword: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({user_email: e.target.value});
    }

    onPrivilegeChange = (e) => {
        this.setState({user_privilege: e.target.value});
    }

    onOrganizationChange = (e) => {
        this.setState({organization_id: e.target.value});
    }

    onValidReg = () => {

        this.setState({firstNameErr: ''})
        this.setState({lastNameErr: ''})
        this.setState({usernameErr:''})
        this.setState({passwordErr: ''})
        this.setState({password2Err: ''})
        this.setState({emailErr: ''})
        this.setState({privilegeErr: ''})
        this.setState({respond: ''}) 
        /*this.setState({checki: '1'})*/

        if(!this.state.first_name){
            this.setState({firstNameErr: '**Name Cannot be blank**'})
            this.setState({checki: null })
        }

        if(!this.state.last_name){
            this.setState({lastNameErr: "**Name Cannot be blank**"})
            this.setState({checki: null })
        }

        if(!this.state.username){
            this.setState({usernameErr: '**Cannot be blank**'})
            this.setState({checki: null })
        }

        if(this.state.username.includes('/')){
            this.setState({usernameErr: '**Invalid username**'})
            this.setState({checki: null })
        }

        if(!this.state.password && !this.state.confPassword){
            this.setState({passwordErr: '**Cannot be blank**'})
            this.setState({password2Err: '**Cannot be blank**'})
            this.setState({checki: null })
        }else if(!this.state.password){
            this.setState({passwordErr: '**Cannot be blank**'})
            this.setState({checki: null })
        } else if(!this.state.confPassword){
            this.setState({password2Err: '**Cannot be blank**'})
            this.setState({checki: null })
        }else if (this.state.password !== this.state.confPassword){
            this.setState({password2Err: '**Passwords must match**'})
            this.setState({checki: null })
        }

        if(!this.state.user_email){
            this.setState({emailErr: "**Cannot be blank**"})
            this.setState({checki: null })
        }else if(!this.state.user_email.includes('@')){
            this.setState({emailErr: "**Invalid email**"})
            this.setState({checki: null })
        }else if(!this.state.user_email.includes('.')){
            this.setState({emailErr: "**Invalid email**"})
            this.setState({checki: null })
        }
        
        if(!this.state.user_privilege){
            this.setState({privilegeErr: '**Cannot be blank**'})
            this.setState({checki: null })
        }


    }

    onSubmitRegister = (event) => {
        event.preventDefault();
        this.onValidReg();
            fetch('http://localhost:3001/registerUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                username: this.state.username,
                user_email: this.state.user_email,
                password: this.state.password,
                confPassword: this.state.confPassword,
                user_privileges: this.state.user_privilege,
                organization_id: this.state.organization_id
            })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({respond: data})
            } )
            .catch(err => {
                console.log(err.data)
                
            } )
        
    }

    


    render(){
        return(
            <div className='RegisterUser pa4' style={{ width: '100%'}} >
                <h2 className='underline'>New User</h2>  <br /> 

                {/* <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="first_name">
                        <Form.Label style={{alignItems: 'start'}} >First Name:</Form.Label>
                        <Form.Control type="text"  />
                        </Form.Group>

                        <Form.Group as={Col} controlId="last_name">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text"  />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="username">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control  />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password"  />
                        </Form.Group>

                        <Form.Group as={Col} controlId="confPassword">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password"  />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="user_privilege">
                        <Form.Label>User Privilege:</Form.Label>
                        <Form.Control as="select" defaultValue="Select Privilege">
                            <option value="admin">admin</option>
                            <option value="manager">manager</option>
                            <option value="normal">normal</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="select_organization">
                        <Form.Label>Organization:</Form.Label>
                        <Form.Control as="select" defaultValue="Select Organization">
                        {this.state.organID.map(x => {
                                    return <option value={x.organization_id} > {x.organization_name} </option>
                                })}
                        </Form.Control>
                        </Form.Group>
                    </Form.Row >

                    

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form> */}


                <form>
                    <div className="mb-4 row">
                        <label htmlFor="first_name" className="col-auto col-form-label">First Name:<b className='red'>**</b></label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="first_name" onChange={this.onFirstNameChange} />
                            <b className='red' >{this.state.firstNameErr}</b>
                        </div>
                    </div>
                    <br />
                    <div className="mb-4 row">
                        <label htmlFor="last_name" className="col-auto col-form-label">Last Name:<b className='red'>**</b></label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="last_name"  onChange={this.onLastNameChange} />
                            <b className='red' >{this.state.lastNameErr}</b>
                        </div>
                    </div>
                    <br />
                    <div className="mb-4 row">
                        <label htmlFor="username" className="col-auto col-form-label">Username:<b className='red'>**</b></label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="username" onChange={this.onUsernameChange} />
                            <b className='red' >{this.state.usernameErr}</b>
                        </div>
                    </div>
                    <br />
                    <div className="mb-4 row">
                        <label htmlFor="password" className="col-auto col-form-label">Password:<b className='red'>**</b></label>
                        <div className="col-sm-5">
                            <input type="password" className="form-control" id="password" onChange={this.onPasswordChange} />
                            <b className='red' >{this.state.passwordErr}</b>
                        </div>
                    </div>
                    <br />
                    <div className="mb-4 row">
                        <label htmlFor="password2" className="col-auto col-form-label">Confirm Password:<b className='red'>**</b></label>
                        <div className="col-sm-5">
                            <input type="password" className="form-control" id="password2" onChange={this.onConfPasswordChange} />
                            <b className='red' >{this.state.password2Err}</b>
                        </div>
                    </div>
                    <br />
                    <div className="mb-4 row">
                        <label htmlFor="user_email" className="col-auto col-form-label">Email:<b className='red'>**</b></label>
                        <div className="col-sm-5">
                            <input type="email" className="form-control" id="user_email" onChange={this.onEmailChange} />
                            <b className='red' >{this.state.emailErr}</b>
                        </div>
                    </div>
                    <br />
                    <div className="mb-4 row">
                        <label htmlFor="user_privilege" className="col-auto col-form-label">User Privilege:<b className='red'>**</b></label>
                        <div className="col-sm-auto">
                            <select className="form-select pa2" id='user_privilege'  onChange={this.onPrivilegeChange} >
                                <option selected>Select Privilege</option>
                                <option value="admin">admin</option>
                                <option value="manager">manager</option>
                                <option value="normal">normal</option>
                            </select>
                            <b className='red' >{this.state.privilegeErr}</b>
                        </div>
                    </div>
                     <br />
                    <div className="mb-4 row">
                        <label htmlFor="organization_id" className="col-auto col-form-label">Organization:</label>
                        <div className="col-sm-auto">
                            <select className="form-select pa2" id='organization_id' onChange={this.onOrganizationChange}  >
                                <option selected>Select Organization</option>
                                {this.state.organID.map(x => {
                                    return <option value={x.organization_id} > {x.organization_name} </option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='row mb-4 col-auto'>
                        <button type='reset' className='btn btn-primary col-sm-3'>Cancel</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type='submit' className='btn btn-primary col-sm-3' onClick={this.onSubmitRegister} >Register</button>
                    </div>
                    <br />
                    <div  style={{color: 'red'}}>
                            {this.state.respond}
                    </div>  
                </form>
            </div>
        );
    }
}

export default RegisterUser;