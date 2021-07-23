import React from 'react';
import { Link } from 'react-router-dom';
import{ Table, Button } from 'react-bootstrap';
import axios from 'axios';



  
 
class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            projects: '',
            organizations:'',
            users: '',
            userlist: []
            
        }
    }

    
    componentDidMount() {
        Promise.all([
            fetch('http://localhost:3001/projects').then(res => res.json()),
            fetch('http://localhost:3001/organizations').then(res => res.json()),
            fetch('http://localhost:3001/userz').then(res => res.json())
        ]).then(([urlOneData, urlTwoData, urlThreeData]) => {
            this.setState({
                projects: urlOneData.length,
                organizations: urlTwoData.length,
                users: urlThreeData.length
            });
        })

    }

    onUserList =  () => {
        // const responsi = await axios.get('http://localhost:3001/userz');
       this.setState({userlist: this.props.userz})
    }

     removeData =  (username) => {
        if (window.confirm("Are you sure?")) {

            fetch('http://localhost:3001/userdelete/' + username,
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'content-Type': 'application/json'
                    }
                })

                .then(console.log("Deleted"))
                .catch(err => console.log(err));
        } }


    render(){
        return(
            <div className='Dashboard pa3' style={{display: 'flex', width: '100%' , justifyContent: 'start'}}>
                <div className='pa3' align='left' style={{width: '100%'}} >
                    <div className='justi' align='left' >
                        <Link to='/registeruser' >
                            <Button type='button' className='btn btn-primary col-auto' >+Register User</Button>
                        </Link>
                    </div>
                    <hr /> <br />

                    <div style={{width: '100%'}} >
                        

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th align='left' >Contents</th>
                                <th><b>PROJECTS:</b></th>
                                <th><b>ORGANIZATIONS:</b></th>
                                <th> <Link onClick={this.onUserList} > <b>USERS:</b> </Link> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td align='left' >No.</td>
                                <td>{this.state.projects}</td>
                                <td> {this.state.organizations} </td>
                                <td> {this.state.users} </td>
                                </tr>
                                
                            </tbody>
                        </Table> <br /> <br />

                        <Table striped bordered hover>
                            <tbody>
                                {this.state.userlist.map(x => {
                                        return <tr>
                                            <td align='left'> <ul>
                                                    <li> <b>NAME: </b> {x.first_name}  {x.last_name} </li>
                                                    <li> <b>Username: </b> {x.username} </li>
                                                    <li> <b>Email: </b> {x.user_email} </li>
                                                </ul> 
                                            </td> 
                                            <td><Button type='button' className='btn btn-primary col-auto' >Modify</Button></td>
                                            <td><Button variant="danger" onClick={() => this.removeData(x.username)}  >Delete</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    
                    </div>
                </div>
            </div>
        );
    }
}



export default Dashboard;