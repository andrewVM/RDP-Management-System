import React from 'react';
import { Link } from 'react-router-dom';



class Navleft extends React.Component {
    constructor(props){
        super(props);
    }

    onLogout = () => {
        this.props.onChangeLogout('home')
        this.props.onRouteChange('home')
    }

   
    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='Navleft' style={{display: 'flex', justifyContent: 'start' }}  >

                <table cellSpacing="0" cellPadding="0" border="0" width='180' height='100%'>
                    <tr>
                        <td rowSpan='2' width='100%' valign='top' align='center' style={{padding: '5px', backgroundColor: 'silver'}} >
                            <table cellSpacing="0" cellPadding="0" border="0">
                                <tr>
                                    <td align="left" style={{paddingLeft: '1px'}} valign='top' height='600px' >
                
                                        <div class="EnclosureBox">
                                            <div className="SectionEnclosureBox bg-lightest-blue pa2"><a  href="/">HOME</a></div>
                                            <div> &nbsp; </div>
                                            <div className="SectionEnclosureBox bg-lightest-blue pa2"><a href="/projectsn">PROJECTS</a></div>
                                            <div> &nbsp; </div>
                                            <div className="SectionEnclosureBox bg-lightest-blue pa2"><Link to="/organizations" >ORGANIZATIONS</Link></div>
                                            <div> &nbsp; </div>
                                            <div className="SectionEnclosureBox bg-lightest-blue pa2"><Link to="/projectstatistics">PROJECTS STATISTICS</Link></div>
                                            <div> &nbsp; </div>
                                            <div> &nbsp; </div>
                                            <div className="SectionEnclosureBox bg-lightest-blue pa2"><Link to="/home" onClick={this.onLogout} >LOGOUT</Link></div>		
                                        </div>
                                        <div> &nbsp; </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Navleft;