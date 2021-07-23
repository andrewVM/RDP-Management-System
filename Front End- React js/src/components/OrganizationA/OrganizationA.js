import React from 'react';
import{ Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

 const OrganizationA = ({orgFill}) => {

    // const [organizations, setOrganizations] = useState(null);

    // const organizationsURL = 'http://localhost:3001/organizations';

    // useEffect(() => {
    //     axios.get(organizationsURL)
    //             .then((response) => {
    //                 setOrganizations(response.data);
    //             } )
    // });


    const removeData = (organization_id) => {
        if (window.confirm("Are you sure?")) {

            fetch('http://localhost:3001/organizationdelete/' + organization_id,
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

   
        return(
            <div className='OrganizationA' style={{display: 'flex', width: '100%' , justifyContent: 'start'}}  >
                <div className='pa3' align='left'  >
                    <div className='pa1' align='right' >
                        
                        
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <Link to='/organizations/registerorganization'>
                            <button type='button' className=' btn-primary pa2'>+Register Organization</button>
                        </Link>
                    </div>
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
                                                            <li><Link to={{pathname: "/organizationsa/:organization_id", state: organization.organization_id }} >
                                                            <b>ORGANIZATION NAME:   </b> {organization.organization_name} </Link>
                                                            </li>
                                                            <li><b>LOCATION:   </b> {organization.area_of_operation}</li>
                                                            <li><b>WEBSITE:  </b>{organization.organization_website} </li>
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => removeData(organization.organization_id)} >Delete</Button> 
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

export default OrganizationA;