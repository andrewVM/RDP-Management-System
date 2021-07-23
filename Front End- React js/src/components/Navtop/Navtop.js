import React from 'react';
import { useState, useEffect } from 'react';
import Coat_of_arms from './Coat_of_arms.png';
import './Navtop.css';
import { Link } from 'react-router-dom';



const Navtop = ({searchChange}) => {
    

    const [ first_name, setFName ] = useState(sessionStorage.getItem('first_name'))
    const [ last_name, setLName ] = useState(sessionStorage.getItem('last_name'))

    
        return (
            <div className='Navtop' style={{display: 'flex', width: '100%' }} >
                <table cellSpacing="0" cellPadding="0" border="0" width='100%'>
                    
                    <tr>
                        <div className='container1' >
                            <td colSpan="2" height='100' style={{ padding: '5px', width: '100%' }}>
                                <table cellSpacing="3" cellpadding="0" border="0" width='100%' >
                                    <tr>
                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                        <td align="left" width='7%' > <img src={Coat_of_arms} width="100%" height="100" alt="" /> </td>
                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                        <td align="left" width='45%' > <h1 className="ttu light-blue" >Rural Development Projects Management System (RDPMS)</h1> </td>
                                        <td align="right" width='48%' > </td>
                                    </tr>
                                </table>
                            </td>
                        </div>                    
                    </tr>

                    <tr>
                        <td colSpan='2' height='30' style={{backgroundColor: 'gray', width: '100%' }} >
                            <table cellSpacing="3" cellPadding="0" border="0" width='100%'>
                                <tr>
                                    <td align='left' width='50%' > </td>
                                    <td style={{ color: 'black'}} align='left' width='30%'>
                                        <input className='pa3 ba b--green bg-lightest-blue'
                                                type='search'
                                                placeholder='Search'
                                                onChange={searchChange} />
                                    </td>
                                    <td width='10%' > </td>       
                                    <td style={{ color: 'black'}} align='centre' width='10%'>
                                       <Link className='black underline' to='/profile/username' > <b>{first_name} {last_name}</b> </Link>
                                    </td>        
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        );
    
}

export default Navtop;