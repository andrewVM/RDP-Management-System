import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Navtop from './components/Navtop/Navtop';
import Navleft from './components/Navleft/Navleft';
import Home from './components/Home/Home';
import LoginHome from './components/LoginHome/LoginHome';
import Project from './components/Project/Project';
import ViewProject from './components/ViewProject/ViewProject';
import ViewActivity from './components/ViewActivity/ViewActivity';
import LoginForm from './components/Login/LoginForm';
import AddProject from './components/AddProject/AddProject';
import AddProjectActivity from './components/AddProjectActivity/AddProjectActivity';
import RegisterOrganization from './components/RegisterOrganization/RegisterOrganization';
import RegisterUser from './components/RegisterUser/RegisterUser';
import Organization from './components/Organization/Organization';
import ViewOrganization from './components/ViewOrganization/ViewOrganization';
import ViewOrganizationA from './components/ViewOrganizationA/ViewOrganizationA';
import ModifyOrganization from './components/ModifyOrganization/ModifyOrganization';
import NavleftU from './components/NavleftU/NavleftU';
import NavtopU from './components/NavtopU/NavtopU';
import OrganizationU from './components/OrganizationU/OrganizationU';
import ProjectA from './components/ProjectA/ProjectA';
import NavleftAdmin from './components/NavleftAdmin/NavleftAdmin';
import OrganizationA from './components/OrganizationA/OrganizationA';
import Dashboard from './components/Dashboard/Dashboard';
import NavleftM from './components/NavleftM/NavleftM';
import ProjectN from './components/ProjectN/ProjectN';
import ViewProjectN from './components/ViewProjectN/ViewProjectN';
import ViewProjectA from './components/ViewProjectA/ViewProjectA';
import ViewActivityA from './components/ViewActivityA/ViewActivityA';
import ModifyProject from './components/ModifyProject/ModifyProject';
import OrganizationProjA from './components/OrganizationProjA/OrganizationProjA';
import OrganizationProjM from './components/OrganizationProjM/OrganizationProjM';
import OrganizationProj from './components/OrganizationProj/OrganizationProj';
import UserProfile from './components/UserProfile/UserProfile';
import ProjectStats from './components/ProjectStats/ProjectStats';
import ModifyActivity from './components/ModifyActivity/ModifyActivity';
import './App.css';


class App extends React.Component {
  constructor(){
    super();
    this.state =  {
      route: sessionStorage.getItem('route'),
      location:'',
      projectis: [],
      organizationis: [],
      users: [],
      searchfield: '',
      user: {
        username: '',
        first_name: '',
        last_name: '',
        user_privileges: '',
        userOrganization: '' }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        user_privileges: data.user_privileges,
        userOrganization: data.organization_id
      }
    })
    sessionStorage.setItem('first_name', this.state.user.first_name );
    sessionStorage.setItem('last_name', this.state.user.last_name );
    sessionStorage.setItem('username', this.state.user.username );
    sessionStorage.setItem('userOrganization', this.state.user.userOrganization );
    sessionStorage.setItem('user_privileges', this.state.user.user_privileges )
  }

  onLocation = (location) => {
    this.setState({location: location});
    console.log(location);
  }

  

  onChangeLogout = (logout) =>{
    this.setState({user: {user_privileges: logout}})
    sessionStorage.setItem('first_name', '' )
    sessionStorage.setItem('last_name', '' )
    sessionStorage.setItem('username', '' )
    sessionStorage.setItem('userOrganization', '' )
    sessionStorage.setItem('projOrganization', '' );
    sessionStorage.setItem('user_privileges', '' );
    
  }

  onRouteChange = (route) => {
    if (this.state.user.user_privileges === 'admin'){
      this.setState({route: 'admin'})
      sessionStorage.setItem( 'route', 'admin' );
    } else if (this.state.user.user_privileges === 'manager'){
      this.setState({route: 'manager'})
      sessionStorage.setItem( 'route', 'manager' );
    }else if(this.state.user.user_privileges === 'normal'){
      this.setState({route: 'normal'})
      sessionStorage.setItem( 'route', 'normal' );
    }
    else{
      this.setState({route: route });
      sessionStorage.setItem( 'route', route );
    }
   
    
  }

  // async componentDidMount() {
  //   const responsi = await axios.get('http://localhost:3001/projects');
  //   this.setState({projectis: responsi.data})
  // }

  componentDidMount() {
    Promise.all([
        fetch('http://localhost:3001/projects').then(res => res.json()),
        fetch('http://localhost:3001/organizations').then(res => res.json()),
        fetch('http://localhost:3001/userz').then(res => res.json())
    ]).then(([urlOneData, urlTwoData, urlThreeData]) => {
        this.setState({
            projectis: urlOneData,
            organizationis: urlTwoData,
            users: urlThreeData
        });
    })

}

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

 /* onCurrentState = (current) => {
    localStorage.setItem('route', true);
    this.setState({ route: localStorage.getItem('route') });
}; */

  /*getInitialState = () => {
    var routee = localStorage.getItem( 'route' ) ;

    return {
        route: routee
    };
  }*/

  /*setRoute = () => {
      localStorage.setItem( 'route', this.state.route );
      this.setState( { route: option } );
  };*/

  
  
  render(){
    const { projectis, searchfield, organizationis, users } = this.state;
    const filteredProjects = projectis.filter(project =>{
      return project.p_name.toLowerCase().includes(searchfield.toLowerCase()); })

    const filteredOrg = organizationis.filter(organ =>{
      return organ.organization_name.toLowerCase().includes(searchfield.toLowerCase()); })

    const filteredUsers = users.filter(userz =>{
      return userz.username.toLowerCase().includes(searchfield.toLowerCase()); })

    return (
      <div className="App" >
        
        {this.state.route === 'admin'
          ?<div>
              <Navtop searchChange={this.onSearchChange} />
              <div className='app-body'>
                <NavleftAdmin onRouteChange={this.onRouteChange} onChangeLogout={this.onChangeLogout} />
                <div className='content'>
                  <Switch>
                      <Route path='/organizations/registerorganization' component={RegisterOrganization} />
                      <AddProjectActivity path='/projects/addproject/addprojectactivity' projID={this.state.location} />
                      <Route path='/projects/addproject' component={AddProject} />
                      <ViewOrganizationA path='/organizationsa/:organization_id' onLocation={this.onLocation} />
                      <ModifyOrganization path='/organization/modifyorg' orgID={this.state.location} />
                      <ModifyProject path='/projecti/modifyproject' projID={this.state.location} />
                      <ModifyActivity path='/activity/modifyactivity' actID={this.state.location} />
                      <Dashboard path='/dashboard' userz={filteredUsers} />
                      <OrganizationA path='/organizationsa' orgFill={filteredOrg} />
                      <ViewActivityA path='/projectsm/:project_id/:activity_id' onLocation={this.onLocation} />
                      <ViewProjectA path='/projectsa/:project_id' onLocation={this.onLocation} />
                      <ProjectA path='/projectsa' projectiz={filteredProjects} />
                      <Route path='/organizationproja' component={OrganizationProjA} />
                      <Route path='/profile/username' component={UserProfile} />
                      <Route path='/registeruser' component={RegisterUser} />
                      <Route path='/projectstatistics' component={ProjectStats} />
                      <Route path='/'  component={LoginHome} />
                  </Switch>
                </div>
              </div>
            </div>
          
          


          :(
            this.state.route === 'manager'
            ?<div>
                <Navtop searchChange={this.onSearchChange} />
                <div className='app-body'>
                  <NavleftM onRouteChange={this.onRouteChange} onChangeLogout={this.onChangeLogout} />
                  <div className='content'>
                    <Switch>
                        <AddProjectActivity path='/projects/addproject/addprojectactivity' projID={this.state.location} />
                        <Route path='/projects/addproject' component={AddProject} />
                        <ModifyProject path='/projecti/modifyproject' projID={this.state.location} />
                        <ModifyActivity path='/activity/modifyactivity' actID={this.state.location} />
                        <Route path='/organizations/:organization_id' component={ViewOrganization} />
                        <Organization path='/organizations' orgFill={filteredOrg} />
                        <ViewActivityA path='/projectsm/:project_id/:activity_id' onLocation={this.onLocation} />
                        <ViewProject path='/projects/:project_id' onLocation={this.onLocation} />
                        <Route path='/organizationprojm' component={OrganizationProjM} />
                        <Route path='/profile/username' component={UserProfile} />
                        <Route path='/projectstatistics' component={ProjectStats} />
                        <Project path='/projects' projectiz={filteredProjects} />
                        <Route path='/' component={LoginHome} />
                    </Switch>
                  </div>
                </div>
              </div>
            :(
              this.state.route === 'normal'
              ?<div>
                  <Navtop searchChange={this.onSearchChange} />
                  <div className='app-body'>
                    <Navleft onRouteChange={this.onRouteChange} onChangeLogout={this.onChangeLogout} />
                    <div className='content'>
                      <Switch>
                          <Route path='/organizations/:organization_id' component={ViewOrganization} />
                          <Organization path='/organizations' orgFill={filteredOrg} />
                          <Route path='/projects/:project_id/:activity_id' component={ViewActivity} />
                          <Route path='/projectsn/project_id' component={ViewProjectN} />
                          <Route path='/organizationproj' component={OrganizationProj} />
                          <ProjectN path='/projectsn' projectiz={filteredProjects} />
                          <Route path='/profile/username' component={UserProfile} />
                          <Route path='/projectstatistics' component={ProjectStats} />
                          <Route path='/' component={LoginHome} />
                      </Switch>
                    </div>
                  </div>
                </div>
              :<div>
                  <NavtopU />
                      <div className='app-body'>
                        <NavleftU />
                        <div className='content'>
                        
                          <Switch>
                              <LoginForm path='/login' onRouteChange={this.onRouteChange} loadUser={this.loadUser}  />
                              <Route path='/home'  component={Home} />
                          </Switch>
                        </div>
                      </div>
                  </div>
            )
          )
        }
      </div>
    );
  };
  
}

export default App;
