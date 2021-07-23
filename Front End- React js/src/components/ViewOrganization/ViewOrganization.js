import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ Table } from 'react-bootstrap';

const ViewOrganization = () => {
    let location = useLocation();

    const [privlege, setPrivilege] = useState(sessionStorage.getItem('user_privileges'))

    const [organization, setOrganization] = useState(null);

    const [projectsi, setProjects] = useState(null);

    const projectsURL = 'http://localhost:3001/projectsorg/' + location.state;

    const organizationURL = 'http://localhost:3001/organization/' + location.state ;


    useEffect(() => {
        axios.get(organizationURL)
                .then((response) => {
                    setOrganization(response.data);
                });
        
        axios.get(projectsURL)
                .then((res) => {
                    setProjects(res.data.length);
                });
    })


    return(
        <div className='ViewOrganization' style={{display: 'flex', width: '100%' , justifyContent: 'start'}} >
            <div className='pa3' align='left' width='100%'>
                <hr  style={{color: 'black', width: '100%' }} size='1' />
                
                <div className='activity'>
                    { organization &&
                        organization.map((organ) => {
                            
                            return (
                                <div>
                                    <h4>ORGANIZATION NAME: {organ.organization_name} </h4>
                                    <hr noshade style={{color: 'black'}} size='1' /> 
                                    
                                    <Table striped bordered hover cellPadding='15' cellSpacing='' border='' >
                                        <tbody>
                                            <tr>
                                               <td> <strong>DESCRIPTION:</strong></td> <td> {organ.organization_descript}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>MISSION:</strong> </td> <td> {organ.organization_mission} </td>
                                            </tr>
                                            <tr>
                                                <td><strong>VISSION:</strong></td> <td> {organ.organization_vission}</td>
                                            </tr>
                                            <tr>
                                                <td><b>AREA OF OPERATION: </b></td> <td>  {organ.area_of_operation}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td><b>TELEPHONE No: </b></td> <td>{organ.organization_phonenumbber} </td>
                                            </tr>
                                            <tr>
                                                <td><b>Email: </b></td> <td> {organ.organization_email}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td><b>WEBSITE: </b> </td> <td> {organ.organization_website}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    { privlege === 'manager'
                                                    ?<td> <Link to={{pathname: '/organizationprojm', state: organ.organization_id}}> <b>No. OF PROJECTS: </b> </Link> </td> 
                                                    :<td> <Link to={{pathname: '/organizationproj', state: organ.organization_id}}> <b>No. OF PROJECTS: </b> </Link> </td> 
                                                    }
                                                </td>
                                                <td>{projectsi} </td>
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

export default ViewOrganization;