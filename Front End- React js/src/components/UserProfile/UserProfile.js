import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ Table } from 'react-bootstrap';

const UserProfile = (props) => {
    

    const [user, setUser] = useState(null);

    const [currentUser, setCurrrent] = useState(sessionStorage.getItem('username'))

    const userURL = 'http://localhost:3001/profile/' + currentUser ;


    useEffect(() => {
        axios.get(userURL)
                .then((response) => {
                    setUser(response.data);
                });
    })


    return(
        <div className='UserProfile' style={{display: 'flex', width: '100%' , justifyContent: 'start'}} >
            <div className='pa3' align='left' width='100%'>
                <div className='button' align='right' >
                        
                        
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        {/* <Link to='/organization/modifyorg'>
                            <button type='button' className=' btn-primary pa2' onClick={locali} >Modify</button>
                        </Link> */}
                </div>
                <hr  style={{color: 'black', width: '100%' }} size='1' />
                <div className='user'>
                    { user &&
                        user.map((userz) => {
                            
                            return (
                                <div>
                                    
                                    <hr noshade style={{color: 'black'}} size='1' /> 
                                    
                                    <Table striped bordered hover cellPadding='15' cellSpacing='' border='' >
                                        <tbody>
                                            <tr>
                                               <td> <strong>FIRST NAME:</strong></td> <td> {userz.first_name}</td>
                                            </tr>
                                            <tr>
                                               <td> <strong>LAST NAME:</strong></td> <td> {userz.last_name}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>USERNAME:</strong> </td> <td> {userz.username} </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Email:</strong></td> <td> {userz.user_email}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </Table>
                                </div>   
                            ); 
                        })
                            
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default UserProfile;