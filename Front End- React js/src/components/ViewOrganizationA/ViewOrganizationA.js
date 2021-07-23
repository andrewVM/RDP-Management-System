import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ Table } from 'react-bootstrap';

const ViewOrganizationA = (props) => {
    let location = useLocation();

    const locali = () => {
        props.onLocation(location.state);
    }

    const [organization, setOrganization] = useState(null);

    const [projectsi, setProjects] = useState(null);

    const projectsURL = 'http://localhost:3001/projectsorg/' + location.state

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
        <div className='ViewOrganizationA' style={{display: 'flex', width: '100%' , justifyContent: 'start'}} >
            <div className='pa3' align='left' width='100%'>
                <div className='button' align='right' >
                        
                        
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <Link to='/organization/modifyorg'>
                            <button type='button' className=' btn-primary pa2' onClick={locali} >Modify</button>
                        </Link>
                </div>
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
                                               <td> <strong>ORGANIZATION_ID:</strong></td> <td> {organ.organization_id}</td>
                                            </tr>
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
                                                <td> <Link to={{pathname: '/organizationproja', state: organ.organization_id}}> <b>No. OF PROJECTS: </b> </Link> </td> <td> {projectsi}</td>
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

export default ViewOrganizationA;