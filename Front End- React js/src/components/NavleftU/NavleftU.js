import React from 'react';
import { Link } from 'react-router-dom';



const NavleftU = () => {

   

    return (
        <div className='NavleftU' style={{display: 'flex', justifyContent: 'start' }}  >

            <table cellSpacing="0" cellPadding="0" border="0" width='180' height='100%'>
                <tr>
                    <td rowSpan='2' width='100%' valign='top' align='center' style={{padding: '5px', backgroundColor: 'silver'}} >
                        <table cellSpacing="0" cellPadding="0" border="0">
		                    <tr>
		                        <td align="left" style={{paddingLeft: '1px'}} valign='top' height='600px' >
			
			                        <div class="EnclosureBox">
                                        <div className=" bg-lightest-blue pa2 " width='150' ><Link to="/home">HOME</Link></div>
                                        <div> 
                                            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>
                                        		
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

export default NavleftU;