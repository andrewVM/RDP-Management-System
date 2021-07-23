import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ Table, Button } from 'react-bootstrap';

const OrganizationProjM = () => {

    let location = useLocation();

    const [projects, setProjects] = useState(null);

    const [usrOrg, setOrg] = useState(sessionStorage.getItem('userOrganization'))

    const projectsURL = 'http://localhost:3001/projectsorg/' + location.state ;

    useEffect(() => {
        axios.get(projectsURL)
                .then((response) => {
                    setProjects(response.data);
                })
    })


 
    return(
        <div className='OrganizationProjM' style={{display: 'flex', width: '100%' , justifyContent: 'start'}}  >

            <div className='pa3' align='left' width='100%' >
                { usrOrg === location.state
                    ?<div className='pa1' align='right' >
                    
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to='/projects/addproject'>
                            <Button type='button' className=' btn-primary pa2'>+Add New Project</Button>
                        </Link>
                        <hr  style={{color: 'black', width: '100%' }} size='1' />
                    </div>
                    :<div className='pa1' align='right' >
                        <hr  style={{color: 'black', width: '100%' }} size='1' />
                    </div>
                }
                
            

                <div className='projects'>
                    <Table striped bordered hover cellPadding='1' cellSpacing='' >
                        <tbody>
                            { projects &&
                                projects.map((project, index) => {
                                    const cleanDate = new Date(project.p_starting_date).toDateString();

                                    

                                    return (
                                        <tr>
                                            <td>
                                                <ul className='project' key={index} >
                                                    <li>
                                                        <Link to= {{pathname: "/projects/${project.project_id}", state: project.project_id }}  >
                                                            <b>PROJECT NAME: </b> {project.p_name}
                                                        </Link>
                                                    </li>
                                                    <li><b>LOCATION: </b> {project.p_region}, {project.p_district} </li>
                                                    <li><b>DATE: </b> {cleanDate} </li> 
                                                    <li><b>DESCRIPTION:</b> {project.p_description} </li>
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

export default OrganizationProjM;