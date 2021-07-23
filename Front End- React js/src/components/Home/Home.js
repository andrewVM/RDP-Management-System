import React from 'react';


const Home = () => {
    return(
        <div className='Home' style={{display: 'flex', width:'100%', justifyContent: 'center' }} >
            <table>
                <tr>
                    <td valign='top' className='normal'>
                            <div className='normal' style={{width:'100%', padding: '15px 10px 15px 20px'}}>
                                <table cellPadding='0' cellSpacing='0' border='0' width='100%'>
                                    <tr>
                                        <td className="h2">.....Welcome..... </td>
                                        &nbsp;
                                    </tr>
                                </table>
                                <hr noshade style={{color: 'black'}} size='1' />
    

                                    <br />

                                    You have entered the Rural Development Projects Management System (RDPMS)<br />
                                    <br />
                                    You can access functionalities by following appropriate links  on the left side menu.  Following is further information about the links :
                                    <br /> <br />
                                    
                                    
                                    <strong>Projects</strong> <br />
                                    This functionality allows you as a user to view projects once they are published.<br />
                                    <br />
                                    
                                    <strong>Organizations</strong> <br />
                                    This functionality allows you as a user to view organizations details once they are published.
                                    <br /> <br />
                                    
                                    <strong>Projects Statistics</strong> <br />
                                    This functionality allows you to view the statistical comparison in number of projects in different locations.
                                    <br /><br />

                                <hr noshade style={{color: 'black'}} size='1' />
                        
                            </div>
                        </td>
                </tr>
            </table>
        </div>
    );
}

export default Home;