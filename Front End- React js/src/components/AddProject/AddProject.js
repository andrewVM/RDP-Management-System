import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';



   

class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project_id: '',
            project_name: '',
            project_descript: '',
            project_goal: '',
            project_target: '',
            organization_id: sessionStorage.getItem('userOrganization'),
            project_donor: '',
            project_category: '',
            project_region: '',
            project_district: '',
            project_ward: '',
            starting_date: '',
            ending_date: '',
            project_duration: '',
            project_status: '',
            project_remarks: '',
            regions: [],
            districts: [],
            selectreg:'',
            idError: '',
            nameError: '',
            regionError: '',
            districtError: '',
            startDateError: '',
            respond: ''
        }
    }

    

    onProjectIdChange = (event) => {
        this.setState({project_id: event.target.value})
    }

    onProjectNameChange = (event) => {
        this.setState({project_name: event.target.value})
    }

    onProjectDescriptChange = (event) => {
        this.setState({project_descript: event.target.value})
    }

    onProjectGoalChange = (event) => {
        this.setState({project_goal: event.target.value})
    }

    onProjectTargetChange = (event) => {
        this.setState({project_target: event.target.value})
    }

    

    onProjectDonorChange = (event) => {
        this.setState({project_donor: event.target.value})
    }

    onProjectCategoryChange = (event) => {
        this.setState({project_category: event.target.value})
    }

    onProjectRegionChange = (event) => {
        this.setState({project_region: event.target.value})
        this.setState({selectreg: event.target.value})
        this.setState({ districts: this.state.regions.find(x => x.name === event.target.value).districts })
    }

    onProjectDistrictChange = (event) => {
        this.setState({project_district: event.target.value})
    }

    onProjectWardChange = (event) => {
        this.setState({project_ward: event.target.value})
    }

    onStartingDateChange = (event) => {
        this.setState({starting_date: Moment(event.target.value).format('YYYY-MM-DD')})
    }

    onEndingDateChange = (event) => {
        this.setState({ending_date: Moment(event.target.value).format('YYYY-MM-DD')})
    }

    onProjectDurationChange = (event) => {
        this.setState({project_duration: event.target.value})
    }

    onProjectStatusChange = (event) => {
        this.setState({project_status: event.target.value})
    }

    onProjectRemarksChange = (event) => {
        this.setState({project_remarks: event.target.value})
    }

    onValidsub = () => {
        this.setState({idError: null})
        this.setState({nameError: null})
        this.setState({regionError: null})
        this.setState({districtError: null})
        this.setState({startDateError: null})
        

        if (!this.state.project_id){
            this.setState({idError: '**Project_id cannot be blank**'})
        }

        if (this.state.project_id.includes('/')){
            this.setState({idError: '**Invalid Project_id**'})
        }

        if(!this.state.project_name){
            this.setState({nameError: '**Project name cannot be blank**'})
        }

        if(!this.state.project_region){
            this.setState({regionError: '**Cannot be blank**'})
        }

        if(!this.state.project_district){
            this.setState({districtError: '**Cannot be blank**'})
        }

        if(!this.state.starting_date){
            this.setState({startDateError: '**Cannot be blank**'})
        }

        if(this.state.starting_date > this.state.ending_date){
            this.setState({startDateError: '**Starting Date must be smaller than Ending Date**'})
        }

        

        

    }

    componentDidMount() {
        this.setState({
            regions: [
                { name: 'Arusha', districts: ['Meru', 'Arusha City', 'Arusha District', 'Karatu', 'Longido', 'Monduli', 'Ngorongoro'] },
                {name: 'Manyara', districts: ['Babati', 'Mbulu', 'Hanang', 'Kiteto', 'Simanjiro'] },
                {name: 'Kilimanjaro', districts: ['Moshi', 'Hai', 'Mwanga', 'Rombo', 'Same', 'Siha'] },
                {name: 'Dar es Salaam', districts: ['Ilala', 'Kinondoni', 'Ubungo', 'Temeke','Kigamboni']},
                {name: 'Dodoma', districts: ['Bahi', 'Chamwino', 'Chemba', 'Dodoma Municipal', 'Kondoa', 'Kondoa', 'Mpwapwa']},
                {name: 'Geita', districts: ['Bukombe', 'Chato', 'Geita', 'Mbogwe', "Nyang'hwale"]},
                {name: 'Iringa', districts: ['Iringa District', 'Iringa Municipal', 'Kilolo', 'Mafinga', 'Mufindi']},
                {name: 'Kagera', districts: ['Biharamulo', 'Bukoba District', 'Bukoba Municipal', 'Karagwe', 'Kyerwa', 'Missenyi', 'Muleba', 'Ngara District']},
                {name: 'Katavi', districts: ['Mlele', 'Mpanda', 'Mpanda Town']},
                {name: 'Kigoma', districts: ['Buhigwe', 'Kakonko', 'Kasulu', 'Kasulu Town', 'Kibondo', 'Kigoma District', 'Kigoma-Ujiji Municipal', 'Uvinza']},
                {name: 'Pemba Kusini', districts: ['Chake Chake', 'Mkoani']},
                {name: 'Unguja Kusini', districts: ['Kati District', 'Kusini District']},
                {name: 'Lindi', districts: ['Kilwa District',
                                            'Lindi District',
                                            'Lindi Municipal',
                                            'Liwale District',
                                            'Nachingwea District',
                                            'Ruangwa District']},
                {name: 'Mara', districts: ['Bunda District',
                                            'Butiama District',
                                            'Musoma District',
                                            'Musoma Municipal',
                                            'Rorya District',
                                            'Serengeti District',
                                            'Tarime District']},
                {name: 'Mbeya', districts: ['Busokelo District',
                                            'Chunya District',
                                            'Kyela District',
                                            'Mbarali City',
                                            'Mbeya District',
                                            'Mbeya District',
                                            'Rungwe']},
                {name: 'Unguja Mjini Magharibi Region', districts: ['Magharibi District',
                                                                    'Mjini District',
                                                                    'Unguja Magharibi District',
                                                                    'Unguja Mjini District']},
                {name: 'Morogoro', districts: ['Gairo District',
                                                'Kilombero District',
                                                'Kilosa District',
                                                'Morogoro District',
                                                'Morogoro Municipal',
                                                'Mvomero District',
                                                'Ulanga District',
                                                'Malinyi District',
                                                'Ifakara Township']},
                {name: 'Mtwara', districts: ['Masasi District',
                                            'Masasi Town',
                                            'Mtwara District',
                                            'Mtwara Municipal',
                                            'Nanyumbu District',
                                            'Newala District',
                                            'Tandahimba District']},
                {name: 'Mwanza', districts: ['Ilemela Municipal',
                                            'Kwimba District',
                                            'Magu District',
                                            'Misungwi District',
                                            'Nyamagana Municipal',
                                            'Sengerema District',
                                            'Ukerewe District']},
                {name: 'Njombe', districts: ['Ludewa District',
                                            'Makambako Town',
                                            'Makete District',
                                            'Njombe District',
                                            'Njombe Town',
                                            "Wanging'ombe District"]},
                {name: 'Pwani', districts: ['Bagamoyo District',
                                            'Kibaha District',
                                            'Kibaha Town',
                                            'Kisarawe District',
                                            'Mafia District',
                                            'Mkuranga District',
                                            'Rufiji District']},
                {name: 'Ruvuma', districts: ['Mbinga District',
                                            'Songea District',
                                            'Songea Municipal',
                                            'Tunduru District',
                                            'Namtumbo District',
                                            'Nyasa District']},
                {name: 'Shinyanga', districts: ['Kahama Town',
                                                'Kahama District',
                                                'Kishapu District',
                                                'Shinyanga District',
                                                'Shinyanga Municipal']},
                {name: 'Singida', districts: ['Ikungi District',
                                                'Iramba District',
                                                'Manyoni District',
                                                'Mkalama District',
                                                'Singida District',
                                                'Singida Municipal']},
                {name: 'Tabora', districts: ['Igunga District',
                                                'Kaliua District',
                                                'Nzega District',
                                                'Sikonge District',
                                                'Tabora Municipal',
                                                'Urambo District',
                                                'Uyui District']},
                {name: 'Tanga', districts: ['Handeni District',
                                            'Handeni Town',
                                            'Kilindi District',
                                            'Korogwe Town',
                                            'Korogwe District',
                                            'Lushoto District',
                                            'Muheza District',
                                            'Mkinga District',
                                            'Pangani District',
                                            'Tanga City']},
                {name: 'Pemba Kusini Region', districts: ['Chake Chake District',
                                                            'Mkoani District',
                                                            'Micheweni District',
                                                            'Wete District']}
            ]
        })
    }

    onSubmitAddProject = (event) => {
        event.preventDefault()
        this.onValidsub();

        fetch('http://localhost:3001/addProject', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify({
            project_id: this.state.project_id,
            p_name: this.state.project_name,
            p_description: this.state.project_descript,
            p_goals: this.state.project_goal,
            p_target: this.state.project_target,
            p_region: this.state.project_region,
            p_district: this.state.project_district,
            p_ward: this.state.project_ward,
            p_donor: this.state.project_donor,
            p_starting_date: this.state.starting_date,
            p_ending_date: this.state.ending_date,
            p_duration: this.state.project_duration,
            p_status: this.state.project_status,
            p_remarks: this.state.project_remarks,
            p_category: this.state.project_category,
            organization_id: this.state.organization_id
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
            <div className='AddProject pa3'>
                <h2 className='underline' >New Project</h2>
                <form onSubmit={this.onSubmitAddProject} >
                    <div className="mb-4 row">
                        <label htmlFor="project_id" className="col-auto col-form-label">Project_ID:<b className='red'>**</b> </label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="project_id" onChange={this.onProjectIdChange} />
                            <b className='red' >{this.state.idError}</b>
                        </div>
                        
                    </div>
                    <br />
                    <div className="mb-4 row">
                        <label htmlFor="project_name" className="col-auto col-form-label">Project Name:<b className='red'>**</b></label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="project_name" onChange={this.onProjectNameChange} />
                            <b className='red' >{this.state.nameError}</b>
                        </div>
                        
                    </div>
                     <br />
                    <div className="mb-4 row">
                        <label htmlFor="project_descript" className="col-auto col-form-label">Project Description:</label>
                        <div className="col-sm-7">
                            <textarea type="text" className="form-control" id="project_descript" onChange={this.onProjectDescriptChange} />
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="project_goal" className="col-auto col-form-label">Project Goals:</label>
                        <div className="col-sm-7">
                            <textarea type="text" className="form-control" id="project_goal" onChange={this.onProjectGoalChange} />
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="project_target" className="col-auto col-form-label">Project Target:</label>
                        <div className="col-sm-7">
                            <textarea type="text" className="form-control" id="project_target" onChange={this.onProjectTargetChange} />
                        </div>
                    </div>
                   
                    <div className="mb-4 row">
                        <label htmlFor="project_donor" className="col-auto col-form-label">Project Donor:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="project_donor" onChange={this.onProjectDonorChange} />
                        </div>
                    </div>
                    <div className='mb-4 row' >
                        <label htmlFor='project_category' className="col-auto col-form-label" >Project Category:</label>
                        <div className='row col-auto'>
                            <select className="form-select" id='project_category' onChange={this.onProjectCategoryChange} >
                                <option selected>Select Category</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Health">Health</option>
                                <option value="Livestock">Livestock</option>
                                <option value="Fishing">Fishing</option>
                                <option value="Education">Education</option>
                                <option value="Infastructure">Infastructure</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-4' >
                        <label htmlFor='' className="col-auto col-form-label">Project Location:<b className='red'>**</b></label> 
                        <div className='row col-auto' >
                            <select className="form-select form-select-lg" aria-label=".form-select-lg example" id='project_region' value={this.state.selectreg} onChange={this.onProjectRegionChange.bind(this)} >
                                <option selected>Select Region</option>
                                {this.state.regions.map(x => {
                                    return <option> {x.name} </option>
                                })}
                                
                            </select>
                            <div style={{color: 'red'}}>
                                {this.state.regionError}
                            </div>
                             &nbsp;&nbsp; &nbsp; &nbsp;

                            <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='project_district' onChange={this.onProjectDistrictChange} >
                                <option selected disabled>Select District</option>
                                {
                                    this.state.districts.map(x => {
                                        return <option> {x} </option>
                                    })
                                }
                            </select>
                            <div style={{color: 'red'}}>
                                {this.state.districtError}
                            </div> 
                            <div className='col-auto' >
                                <input className="form-control" type="text" placeholder="Enter Ward" aria-label=".form-control-sm example" id='project_ward' onChange={this.onProjectWardChange} />
                            </div>
                        </div>

                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="starting_date" className="col-auto col-form-label">Project Starting_date:<b className='red'>**</b></label>
                        <div className="col-sm-6">
                            <input type="date"  className="form-control" id="starting_date" onChange={this.onStartingDateChange} />
                            <b className='red' > {this.state.startDateError} </b>
                        </div>
                    </div>
                    {/* <div style={{color: 'red'}}>
                            {this.state.startDateError}
                    </div> <br /> */}
                    <div className="mb-4 row">
                        <label htmlFor="ending_date" className="col-auto col-form-label">Project Ending_date:</label>
                        <div className="col-sm-6">
                            <input type="date"  className="form-control" id="ending_date" onChange={this.onEndingDateChange} />
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="project_duration" className="col-auto col-form-label">Project Duration:</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="project_duration" onChange={this.onProjectDurationChange} />
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="project_status" className="col-auto col-form-label">Project Status:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="project_status" onChange={this.onProjectStatusChange} />
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="project_remarks" className="col-auto col-form-label">Project Remarks:</label>
                        <div className="col-sm-7">
                            <textarea type="text" className="form-control" id="project_remarks" onChange={this.onProjectRemarksChange} />
                        </div>
                    </div>
                    <div className='row mb-4 col-auto'>
                        <button type='reset' className='btn btn-primary col-sm-3'>Cancel</button> &nbsp;&nbsp;&nbsp;
                         <button type='submit' className='btn btn-primary col-sm-3' onClick={this.onSubmitAddProject} >Save</button> 
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

export default AddProject;