import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ Table, Button } from 'react-bootstrap';

const ProjectA = ({projectiz}) => {

    // const [projects, setProjects] = useState(null);

    // const projectsURL = 'http://localhost:3001/projects';

    // useEffect(() => {
    //     axios.get(projectsURL)
    //             .then((response) => {
    //                 setProjects(response.data);
    //             })
    // })

   /* deleteProject(() => {
        fetch('http://localhost:3001/projectdelete/' + project.project_id, {
            method: "delete"
        }).catch(err => console.log(err))
    }) */


    const removeData = (project_id) => {
        if (window.confirm("Are you sure?")) {

            fetch('http://localhost:3001/projectdelete/' + project_id,
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
        <div className='ProjectA' style={{display: 'flex', width: '100%' , justifyContent: 'start'}}  >

            <div className='pa3' align='left' width='100%' >
                <div className='topa' align='right' >
                   
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to='/projects/addproject'>
                        <button type='button' className=' btn-primary pa2'>+Add New Project</button>
                    </Link>
                    <hr  style={{color: 'black', width: '100%' }} size='1' />
                </div>
            

                <div className='projects'>
                    <Table striped bordered hover cellPadding='15' cellSpacing='' >
                        <tbody>
                            { projectiz &&
                                projectiz.map((project, index) => {
                                    const cleanDate = new Date(project.p_starting_date).toDateString();
                                    let b = project.p_description;
                                    if(b.length > 100){
                                        b = b.substr(0, 100) + '...'
                                    }
                                    

                                    return (
                                        <tr>
                                            <td>
                                                <ul className='project' key={index} >
                                                    <li>
                                                        <Link to= {{pathname: "/projectsa/${project.project_id}", state: project.project_id }}  >
                                                            <b>PROJECT NAME: </b> {project.p_name}
                                                        </Link>
                                                    </li>
                                                    <li><b>LOCATION: </b> {project.p_region}, {project.p_district} </li>
                                                    <li><b>DATE: </b> {cleanDate} </li> 
                                                    <li><b>DESCRIPTION:</b> {b} </li>
                                                </ul> 
                                            </td>
                                            <td>
                                                <Button variant="danger" onClick={() => removeData(project.project_id)} >Delete</Button> 
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

export default ProjectA;