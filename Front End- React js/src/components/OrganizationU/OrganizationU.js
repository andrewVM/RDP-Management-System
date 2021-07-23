import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

 const OrganizationU = (props) => {

    const [organizations, setOrganizations] = useState(null);

    const organizationsURL = 'http://localhost:3001/organizations';

    useEffect(() => {
        axios.get(organizationsURL)
                .then((response) => {
                    setOrganizations(response.data);
                } )
    });

   
        return(
            <div className='OrganizationU' style={{display: 'flex', width: '100%' , justifyContent: 'start'}}  >
                <div className='pa3' align='left'  >
                    
                    <hr  style={{color: 'black', width: '100%' }} size='1' />

                    <p> {props.data} </p>

                    <div className='organizations' > 
                        
                        {organizations &&
                            organizations.map((organization, index) => {
                                return(
                                    <ul>
                                        <li><Link to='/login' >
                                        <b>ORGANIZATION NAME:   </b> {organization.organization_name} </Link>
                                        </li>
                                        <li><b>LOCATION:   </b> {organization.area_of_operation}</li>
                                        <li><b>WEBSITE:  </b>{organization.organization_website} </li>
                                        <hr  style={{color: 'black', width: '100%' }} size='2' />
                                    </ul>
                                );
                                
                            })
                        
                        }  
                            
                    </div>
                    
                </div>      
            </div>
        );
    
    
}

export default OrganizationU;