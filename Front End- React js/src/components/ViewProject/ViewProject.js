import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ Table, Button } from 'react-bootstrap';


const ViewProject = (props) => {

    let location = useLocation();

    const locale = () => {
        props.onLocation(location.state);
    }
    
    const [ orgID, setOrg ] = useState(sessionStorage.getItem('userOrganization'))

    const [project, setProject] = useState(null);

    const projectURL = 'http://localhost:3001/project/' + location.state ;


    useEffect(() => {
        axios.get(projectURL)
                .then((response) => {
                    setProject(response.data);
                })
    })


    const [activities, setActivities] = useState(null);

    const activitiesURL = 'http://localhost:3001/project_activities/' + location.state ;

    const fetchActivities = async () => {
        const response = await axios.get(activitiesURL)
        setActivities(response.data)
    }

    

    return(
        <div className='ViewProject' style={{display: 'flex', width: '100%' , justifyContent: 'start'}} >
            <div className='pa3' align='left' width='100%'>
                
                
                <div className='project'>
                    { project &&
                        project.map((projectid) => {
                            const cleanDate1 = new Date(projectid.p_starting_date).toDateString();
                            const cleanDate2 = new Date(projectid.p_ending_date).toDateString();
                            sessionStorage.setItem('projOrganization', projectid.organization_id );

                            return (
                                <div>
                                    { orgID === projectid.organization_id
                                    ?<div className='pa1' align='right' >
                                        <Link to='/projecti/modifyproject'>
                                            <Button type='button' className=' btn-primary pa2' onClick={locale} >Modify</Button>
                                        </Link>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link to='/projects/addproject/addprojectactivity'>
                                            <Button type='button' className=' btn-primary pa2' onClick={locale} >+Add Project Activity</Button>
                                        </Link>
                                        <hr  style={{color: 'black', width: '100%' }} size='1' />
                                    </div>
                                    :<div className='pa1' align='right' >
                                        <hr  style={{color: 'black', width: '100%' }} size='1' />
                                    </div> 
                                    }
                                    
                                    <h4>PROJECT NAME: {projectid.p_name} </h4>
                                    <hr noshade style={{color: 'black'}} size='1' /> 
                                    <Table striped bordered hover cellPadding='15' cellSpacing='' >
                                        <tbody>
                                            <tr>
                                               <td> <b>PROJECT ID: </b></td> <td> {projectid.project_id}</td>
                                            </tr>
                                            <tr>
                                               <td> <b>CATEGORY: </b></td> <td> {projectid.p_category}</td>
                                            </tr>
                                            <tr>
                                                <td><b>LOCATION: </b> </td> <td> {projectid.p_region}, {projectid.p_district} - {projectid.p_ward} </td>
                                            </tr>
                                            <tr>
                                                <td><strong>DESCRIPTION:</strong></td> <td> {projectid.p_description}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>GOALS:</strong></td> <td> {projectid.p_goals}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>TARGET:</strong></td> <td> {projectid.p_target}</td>
                                            </tr>
                                            <tr>
                                                <td><b>DONOR: </b></td> <td> {projectid.p_donor}</td>
                                            </tr>
                                            <tr>
                                                <td><b>STARTING DATE: </b></td> <td>{cleanDate1}</td>
                                            </tr>
                                            <tr>
                                                <td><b>ENDING DATE: </b></td> <td> {cleanDate2} </td>
                                            </tr>
                                            <tr>
                                                <td><b>DURATION: </b></td> <td> {projectid.p_duration}</td>
                                            </tr>
                                            <tr>
                                                <td><b>STATUS: </b></td> <td> {projectid.p_status}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>REMARKS:</strong> </td> <td> {projectid.p_remarks}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <br /> 
                                    <hr  style={{color: 'black', width: '100%' }} size='1' />

                                    <div className='pa1' align='left' >
                                        <button className="fetch-button btn-primary pa2" onClick={fetchActivities} >Project Activities</button>
                                        
                                        
                                        <hr  style={{color: 'black', width: '100%' }} size='1' />
                                    </div>

                                </div>   
                            ); 
                        })
                            
                    }
                    {activities &&
                        activities.map((activ, index) => {
                            const cleanD = new Date(activ.activity_starting_date).toDateString();

                            return (
                                <ul className='activity' key={index} >
                                    <li>
                                        <Link to= {{pathname: "/projectsm/:project_id/:activity_id", state: activ.activity_id }}  >
                                            <b>ACTIVITY NAME: </b> {activ.activity_name}
                                        </Link>
                                    </li>
                                    <li><b>LOCATION: </b> {activ.activity_district} - {activ.activity_ward} </li>
                                    <li><b>DATE: </b> {cleanD} </li>
                                    <hr  style={{color: 'black', width: '100%' }} size='1' />
                                </ul>        
                            ); 
                        })
                    
                    }
                </div>
            </div>
        </div>
    );
}

export default ViewProject;