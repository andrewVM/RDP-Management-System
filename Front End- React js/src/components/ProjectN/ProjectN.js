import React from 'react';
import{ Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectN = ({projectiz}) => {

    // const [projects, setProjects] = useState(null);

    // const projectsURL = 'http://localhost:3001/projects';

    // useEffect(() => {
    //     axios.get(projectsURL)
    //             .then((response) => {
    //                 setProjects(response.data);
    //             })
    // })


 
    return(
        <div className='ProjectN' style={{display: 'flex', width: '100%' , justifyContent: 'start'}}  >

            <div className='pa3' align='left' width='100%' >
                
                <hr  style={{color: 'black', width: '100%' }} size='1' />
               
            

                <div className='projects'>
                    <Table striped bordered hover cellPadding='15' cellSpacing='' >
                        <tbody>
                            { projectiz &&
                                projectiz.map((project, index) => {
                                    const cleanDate = new Date(project.p_starting_date).toDateString();
                                    let b = project.p_description;
                                    if(b.length > 110){
                                        b = b.substr(0, 110) + '...'
                                    }
                                    

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
                                                    <li><b>DESCRIPTION:</b> {b} </li>
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

export default ProjectN;