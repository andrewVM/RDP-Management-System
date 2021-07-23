import React from 'react';
import{ Table } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizationProj = () => {

    let location = useLocation();

    const [projects, setProjects] = useState(null);

    const projectsURL = 'http://localhost:3001/projectsorg/' + location.state ;

    useEffect(() => {
        axios.get(projectsURL)
                .then((response) => {
                    setProjects(response.data);
                })
    })


 
    return(
        <div className='OrganizationProj' style={{display: 'flex', width: '100%' , justifyContent: 'start'}}  >

            <div className='pa3' align='left' width='100%' >
                
                <hr  style={{color: 'black', width: '100%' }} size='1' />
               
            

                <div className='projects'>
                    <Table striped bordered hover cellPadding='15' cellSpacing='' >
                        <tbody>
                            { projects &&
                                projects.map((project, index) => {
                                    const cleanDate = new Date(project.p_starting_date).toDateString();

                                    

                                    return (
                                        <tr>
                                            <td>
                                                <ul className='project' key={index} >
                                                    <li>
                                                        <Link to= {{pathname: "/projectsn/project_id", state: project.project_id }}  >
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

export default OrganizationProj;