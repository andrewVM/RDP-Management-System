import React from 'react';
import axios from 'axios';
import './LoginHome.css'
import{ Table } from 'react-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


class LoginHome extends React.Component {
    constructor(props){
        super(props);
        this.state={
            agriculture: sessionStorage.getItem('agriculture') ,
            health: sessionStorage.getItem('health'),
            livestock: sessionStorage.getItem('livestock'),
            fishing: sessionStorage.getItem('fishing'),
            education: sessionStorage.getItem('education'),
            infastructure: sessionStorage.getItem('infastructure'),
            firstName: sessionStorage.getItem('first_name'),
            lastName: sessionStorage.getItem('last_name')
        }
    }


    componentDidMount() {
        Promise.all([
            fetch('http://localhost:3001/projectz/Health').then(res => res.json()),
            fetch('http://localhost:3001/projectz/Agriculture').then(res => res.json()),
            fetch('http://localhost:3001/projectz/Livestock').then(res => res.json()),
            fetch('http://localhost:3001/projectz/Fishing').then(res => res.json()),
            fetch('http://localhost:3001/projectz/Education').then(res => res.json()),
            fetch('http://localhost:3001/projectz/Infastructure').then(res => res.json())
        ]).then(([urlOneData, urlTwoData, urlThreeData, urlFourData, urlFiveData, urlSixData]) => {
            
            sessionStorage.setItem('agriculture', urlTwoData.length)
            sessionStorage.setItem('health', urlOneData.length)
            sessionStorage.setItem('livestock', urlThreeData.length)
            sessionStorage.setItem('fishing', urlFourData.length)
            sessionStorage.setItem('education', urlFiveData.length)
            sessionStorage.setItem('infastructure', urlSixData.length)
            
        })

        let chart1 = am4core.create("chartdiv1", am4charts.PieChart);
            chart1.data = [{
                    "category": "Agriculture",
                    "amount": this.state.agriculture
                }, {
                    "category": "Health",
                    "amount": this.state.health
                }, {
                    "category": "Fishing",
                    "amount": this.state.fishing
                }, {
                    "category": "Livestock",
                    "amount": this.state.livestock
                }, {
                    "category": "Education",
                    "amount": this.state.education
                }, {
                    "category": "Infastructure",
                    "amount": this.state.infastructure
                }];

          chart1.radius = am4core.percent(45);

          let pieSeries = chart1.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "amount";
            pieSeries.dataFields.category = "category";
            pieSeries.labels.template.text = "{category}";

        this.chart1 = chart1;

    }

    componentWillUnmount() {
        if (this.chart1) {
          this.chart1.dispose();
        }
    }

    


    render(){
        return(
            <div className='LoginHome' style={{display: 'flex', width:'100%', justifyContent: 'start' }} >
                <table width= '60%' >
                    <tr>
                        <td valign='top' className='normal'>
                                <div className='normal' style={{width:'100%', padding: '15px 10px 15px 20px'}}>
                                    <table cellPadding='0' cellSpacing='0' border='0' width='100%'>
                                        <tr>
                                            <td className='f3' > <strong> Welcome:<i> {this.state.firstName} {this.state.lastName} </i> </strong> </td>
                                            &nbsp;
                                        </tr>
                                    </table>
                                    <hr noshade style={{color: 'black'}} size='1' />
        

                                        

                                    <b> You have successfully Logged into the Rural Development Projects Management System (RDPMS) </b> 
                                        <br />
                                        You can access functionalities by following appropriate links  on the left side menu.  Following is further information about the links :
                                        <br /> <br />
                                        
                                        
                                        <strong className='underline' >Projects</strong> <br />
                                        This functionality allows you as a user to view projects once they are published.<br />
                                        <br />
                                        
                                        <strong className='underline'>Organizations</strong> <br />
                                        This functionality allows you as a user to view organizations details once they are published.
                                        <br /> <br />
                                        
                                        <strong className='underline'>Projects Statistics</strong> <br />
                                        This functionality allows you to view the statistical comparison in number of projects in different locations.
                                        <br /><br />

                                    <hr noshade style={{color: 'black'}} size='1' />
                            
                                </div>
                        </td>
                    </tr>
                </table>
                <div class="col-md-auto" style={{width: '40%'}} >
                <br />
                    <Table  striped bordered >
                        <thead className='charttable' >
                            <tr>
                                <th>Projects According to Categories: </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >
                                <div id="chartdiv1" style={{ width: "100%", height: "400px" }}></div>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                    
                
            </div>
        );
    }
}

export default LoginHome;