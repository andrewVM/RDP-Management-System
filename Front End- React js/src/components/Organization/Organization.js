import React from 'react';
import './Organization.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ Table } from 'react-bootstrap';

 const Organization = ({orgFill}) => {

    // const [organizations, setOrganizations] = useState(null);

    // const organizationsURL = 'http://localhost:3001/organizations';

    // useEffect(() => {
    //     axios.get(organizationsURL)
    //             .then((response) => {
    //                 setOrganizations(response.data);
    //             } )
    // });

   
        return(
            <div className='Organization' style={{display: 'flex', width: '100%' , justifyContent: 'start'}}  >
                <div className='pa3' align='left'  >
                    
                    <hr  style={{color: 'black', width: '100%' }} size='1' />
                    <div className='organizations' > 
                        <Table striped bordered hover cellPadding='15' cellSpacing='' >
                            <tbody>
                                {orgFill &&
                                    orgFill.map((organization, index) => {
                                        return(
                                                <tr>
                                                    <td>
                                                        <ul>
                                                            <li><Link to={{pathname: "/organizations/:organization_id", state: organization.organization_id }} >
                                                            <b>ORGANIZATION NAME:   </b> {organization.organization_name} </Link>
                                                            </li>
                                                            <li><b>LOCATION:   </b> {organization.area_of_operation}</li>
                                                            <li><b>WEBSITE:  </b>{organization.organization_website} </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                        );
                                        
                                    })
                                
                                } 
                            </tbody>
                        </Table>
                        
                    </div>
                    
                </div>      
            </div>
        );
    
    
}

export default Organization;