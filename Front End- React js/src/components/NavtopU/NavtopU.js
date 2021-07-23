import React from 'react';
import Coat_of_arms from './Coat_of_arms.png';
import './NavtopU.css';
import { Link } from 'react-router-dom';



const NavtopU = () => {
    return (
        <div className='NavtopU' style={{display: 'flex', width: '100%' }} >
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
                                <td className='pa3' style={{ color: 'black'}} align='left' width='30%'>
                                    <div className='pa2'></div>
                                </td>
                                <td width='10%' > </td>       
                                <td style={{backgroundColor:'lightblue', color: 'black'}} align='centre' width='10%'>
                                    <Link className='link dim black underline pointer' to='/login' > <b>LOGIN</b> </Link>
                                </td>        
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default NavtopU;