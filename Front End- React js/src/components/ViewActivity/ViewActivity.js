import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ Table } from 'react-bootstrap';

const ViewActivity = () => {

    let location = useLocation();

    const [activity, setActivity] = useState(null);

    const activityURL = 'http://localhost:3001/project_activity/' + location.state ;


    useEffect(() => {
        axios.get(activityURL)
                .then((response) => {
                    setActivity(response.data);
                })
    })


    return(
        <div className='ViewActivity' style={{display: 'flex', width: '100%' , justifyContent: 'start'}} >
            <div className='pa3' align='left' width='100%'>
                <hr  style={{color: 'black', width: '100%' }} size='1' />
                <div className='activity'>
                    { activity &&
                        activity.map((activityid) => {
                            const cleanDate1 = new Date(activityid.activity_starting_date).toDateString();
                            const cleanDate2 = new Date(activityid.activity_ending_date).toDateString();

                            return (
                                <div>
                                    <h4>ACTIVITY NAME: {activityid.activity_name} </h4>
                                    <hr noshade style={{color: 'black'}} size='1' /> 
                                    
                                    <Table striped bordered hover cellPadding='15' cellSpacing='' border='' >
                                        <tbody>
                                            <tr>
                                               <td> <strong>GOALS</strong></td> <td> {activityid.activity_goal}</td>
                                            </tr>
                                            <tr>
                                                <td><b>LOCATION: </b> </td> <td> {activityid.activity_region}, {activityid.activity_district} - {activityid.activity_ward} </td>
                                            </tr>
                                            <tr>
                                                <td><strong>IMPLEMENTATION STAGE</strong></td> <td> {activityid.implementation_stage}</td>
                                            </tr>
                                            <tr>
                                                <td><b>STARTING DATE: </b></td> <td>  {cleanDate1}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td><b>ENDING DATE: </b></td> <td>{cleanDate2} </td>
                                            </tr>
                                            <tr>
                                                <td><b>DURATION: </b></td> <td> {activityid.activity_duration}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td><strong>REMARKS</strong> </td> <td> {activityid.activity_remarks}</td>
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

export default ViewActivity;