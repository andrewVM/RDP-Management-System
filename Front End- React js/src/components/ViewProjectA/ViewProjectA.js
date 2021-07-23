import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ Table, Button } from 'react-bootstrap';


const ViewProjectA = (props) => {

    let location = useLocation();

    const locale = () => {
        props.onLocation(location.state);
    }
    

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


    const removeData = (activity_id) => {
        if (window.confirm("Are you sure?")) {

            fetch('http://localhost:3001/activitydelete/' + activity_id,
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
        <div className='ViewProjectA' style={{display: 'flex', width: '100%' , justifyContent: 'start'}} >
            <div className='pa3' align='left' width='100%'>
                <div className='pa1' align='right' >
                    <Link to='/projecti/modifyproject'>
                        <button type='button' className=' btn-primary pa2' onClick={locale} >Modify</button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to='/projects/addproject/addprojectactivity'>
                        <button type='button' className=' btn-primary pa2' onClick={locale} >+Add Project Activity</button>
                    </Link>
                    <hr  style={{color: 'black', width: '100%' }} size='1' />
                </div>
                <div className='project'>
                    { project &&
                        project.map((projectid) => {
                            const cleanDate1 = new Date(projectid.p_starting_date).toDateString();
                            const cleanDate2 = new Date(projectid.p_ending_date).toDateString();

                            return (
                                <div>
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
                                    <br /> <br />
                                    <hr  style={{color: 'black', width: '100%' }} size='1' />

                                    <div className='pa1' align='left' >
                                        <button className="fetch-button btn-primary pa2" onClick={fetchActivities} >Project Activities</button>
                                        
                                        
                                        <hr  style={{color: 'black', width: '100%' }} size='1' />
                                    </div>

                                </div>   
                            ); 
                        })
                            
                    }

                    <Table striped bordered hover cellPadding='15' cellSpacing='' >
                        <tbody>
                            {activities &&
                                activities.map((activ, index) => {
                                    const cleanD = new Date(activ.activity_starting_date).toDateString();

                                    return ( 
                                        
                                            <tr>
                                                <td>
                                                    <ul className='activity' key={index} >
                                                        <li>
                                                            <Link to= {{pathname: "/projectsm/:project_id/:activity_id", state: activ.activity_id }}  >
                                                                <b>ACTIVITY NAME: </b> {activ.activity_name}
                                                            </Link>
                                                        </li>
                                                        <li><b>LOCATION: </b> {activ.activity_district} - {activ.activity_ward} </li>
                                                        <li><b>DATE: </b> {cleanD} </li>
                                                    </ul> 
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => removeData(activ.activity_id)} >Delete</Button>
                                                </td>  
                                            </tr> 
                                            
                                    
                                    ); 
                                }) 
                            
                            }
                            <tr >
                                <td align='right' colSpan='2' >
                                    <div className='pa1 ' align='left' >
                                    <Button onClick={() => window.print()}>Print Report</Button>
                                        
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default ViewProjectA;