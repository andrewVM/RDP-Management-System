import React from 'react';


class RegisterOrganization extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            organization_id: '',
            organization_name: '',
            organization_descript: '',
            organization_vission: '',
            organization_mission: '',
            area_of_operation: '',
            organization_phone:  '',
            organization_email: '',
            organization_website:'',
            orgIdError: '',
            orgNameError: '',
            emailError: '',
            respond: ''
        }
    }

    onOrganIdChange = (e) => {
        this.setState({organization_id: e.target.value});
    }

    onOrganizationNameChange =(e) => {
        this.setState({organization_name: e.target.value});
    }

    onOrganDescriptChange = (e) => {
        this.setState({organization_descript: e.target.value});
    }

    onOrganVisionChange = (e) => {
        this.setState({organization_vission: e.target.value});
    }


    onOrganMissionChange = (e) => {
        this.setState({organization_mission: e.target.value});
    }

    onOrganAreaOpChange = (e) => {
        this.setState({area_of_operation: e.target.value});
    }

    onOrganPhoneChange = (e) => {
        this.setState({organization_phone: e.target.value});
    }

    onOrganEmailChange = (e) => {
        this.setState({organization_email: e.target.value});
    }

    onOrganWebsitetChange = (e) => {
        this.setState({organization_website: e.target.value});
    }

    onValidReg = () => {

        this.setState({orgNameError: null})
        this.setState({orgIdError: null})
        this.setState({emailError: null})

        if(!this.state.organization_name){
            this.setState({orgNameError: '**Name Cannot be blank**'})
        }

        if(!this.state.organization_id){
            this.setState({orgIdError: "**Cannot be blank**"})
        }

        if(this.state.organization_id.includes('/')){
            this.setState({orgIdError: "**Invalid Organization_ID**"})
        }

        if(!this.state.organization_email){
            this.setState({emailError: "**Cannot be blank**"})
        }else if(!this.state.organization_email.includes('@')){
            this.setState({emailError: "**Invalid email**"})
        }else if(!this.state.organization_email.includes('.')){
            this.setState({emailError: "**Invalid email**"})
        }
        
        
    }

    onSubmitOrg = (event) => {
        event.preventDefault();
        this.onValidReg();

        fetch('http://localhost:3001/registerOrganization', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify({
            organization_id: this.state.organization_id,
            organization_name: this.state.organization_name,
            organization_descript: this.state.organization_descript,
            organization_mission: this.state.organization_mission,
            organization_vission: this.state.organization_vission,
            area_of_operation: this.state.area_of_operation,
            organization_phoneNumbber: this.state.organization_phone,
            organization_email: this.state.organization_email,
            organization_website: this.state.organization_website
          })
        })
          .then(response => response.json())
          .then(data => {
              console.log(data)
              this.setState({respond: data})
          } )
          .catch(err => {
              console.log(err.data)
            
          } )
    }

    render(){
        return(
            <div className='RegisterOrganization pa3' >
                <h2 className='underline'>Organization</h2>
                <form>
                    <div className="mb-4 row">
                        <label htmlFor="organization_id" className="col-auto col-form-label">Organization_ID:<b className='red'>**</b></label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="organization_id" onChange={this.onOrganIdChange} />
                            <b className='red' >{this.state.orgIdError}</b>
                        </div>
                    </div>
                     <br />
                    <div className="mb-4 row">
                        <label htmlFor="organization_name" className="col-auto col-form-label">Organization Name:<b className='red'>**</b></label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="organization_name" onChange={this.onOrganizationNameChange} />
                            <b className='red' >{this.state.orgNameError}</b>
                        </div>
                    </div>
                     <br />
                    <div className="mb-4 row">
                        <label htmlFor="organization_descript" className="col-auto col-form-label">Organization Description:</label>
                        <div className="col-sm-6">
                            <textarea type="text" className="form-control" id="organization_descript" onChange={this.onOrganDescriptChange} />
                        </div>
                    </div> <br />
                    <div className="mb-4 row">
                        <label htmlFor="organization_vision" className="col-auto col-form-label">Organization Vision:</label>
                        <div className="col-sm-6">
                            <textarea type="text" className="form-control" id="organization_vision" onChange={this.onOrganVisionChange} />
                        </div>
                    </div> <br />
                    <div className="mb-4 row">
                        <label htmlFor="organization_mission" className="col-auto col-form-label">Organization Mission:</label>
                        <div className="col-sm-6">
                            <textarea type="text" className="form-control" id="organization_mission" onChange={this.onOrganMissionChange} />
                        </div>
                    </div> <br />
                    <div className="mb-4 row">
                        <label htmlFor="area_of_operation" className="col-auto col-form-label">Area of Operation:</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="area_of_operation" onChange={this.onOrganAreaOpChange} />
                        </div>
                    </div> <br />
                    <div className="mb-4 row">
                        <label htmlFor="organization_phone" className="col-auto col-form-label">Organization Phone Number:</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="organization_phone" onChange={this.onOrganPhoneChange} />
                        </div>
                    </div> <br />
                    <div className="mb-4 row">
                        <label htmlFor="organization_email" className="col-auto col-form-label">Organization Email:<b className='red'>**</b></label>
                        <div className="col-sm-6">
                            <input type="email" className="form-control" id="organization_email" onChange={this.onOrganEmailChange} />
                            <b className='red' >{this.state.emailError}</b>
                        </div>
                    </div>
                     <br />
                    <div className="mb-4 row">
                        <label htmlFor="organization_website" className="col-auto col-form-label">Organization Website:</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="organization_website" onChange={this.onOrganWebsitetChange} />
                        </div>
                    </div>
                    <div className='row mb-4 col-auto'>
                        <button type='reset' className='btn btn-primary col-sm-3'>Cancel</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type='submit' className='btn btn-primary col-sm-3' onClick={this.onSubmitOrg} >Save</button>
                    </div> 
                    <br />
                    <div style={{color: 'red'}}>
                            {this.state.respond}
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterOrganization;