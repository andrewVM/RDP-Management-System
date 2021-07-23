import React from 'react';
import Moment from 'moment';
import axios from 'axios';



class ModifyActivity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            project_id: '',
            activity_id: this.props.actID,
            activity_name: '',
            activity_goal: '',
            activity_region: '',
            activity_district: '',
            activity_ward: '',
            implementation_stage: '',
            activity_starting_date: '',
            activity_ending_date: '',
            activity_duration: '',
            activity_remarks: '',
            regions: [],
            districts: [],
            selectreg:'',
            nameError: '',
            regionError: '',
            districtError: '',
            startdateError: '',
            
            respond: ''

        }

    }

    async componentDidMount() {
        const responsi = await axios.get('http://localhost:3001/project_activity/' + this.state.activity_id);
        
        this.setState({project_id: responsi.data[0].project_id})
        this.setState({activity_name: responsi.data[0].activity_name})
        this.setState({activity_goal: responsi.data[0].activity_goal})
        this.setState({activity_region: responsi.data[0].activity_region})
        this.setState({activity_district: responsi.data[0].activity_district})
        this.setState({activity_ward: responsi.data[0].activity_ward})
        this.setState({implementation_stage: responsi.data[0].implementation_stage})
        this.setState({activity_starting_date: responsi.data[0].activity_starting_date})
        this.setState({activity_ending_date: responsi.data[0].p_ending_date})
        this.setState({activity_duration: responsi.data[0].activity_duration})
        this.setState({activity_remarks: responsi.data[0].activity_remarks})

    }
    

    onActivityName = (event) => {
        this.setState({activity_name: event.target.value})
    }

    onActivityGoal = (event) => {
        this.setState({activity_goal: event.target.value})
    }

    onActivityRegion = (event) => {
        this.setState({activity_region: event.target.value})
        this.setState({selectreg: event.target.value})
        this.setState({ districts: this.state.regions.find(x => x.name === event.target.value).districts })
    }

    onActivityDistrict = (event) => {
        this.setState({activity_district: event.target.value})
    }

    onActivityWard = (event) => {
        this.setState({activity_ward: event.target.value})
    }

    onImplementationStage = (event) => {
        this.setState({implementation_stage: event.target.value})
    }
    
    onStartingDate = (event) => {
        this.setState({activity_starting_date: Moment(event.target.value).format('YYYY-MM-DD')})
    }

    onEndingDate = (event) => {
        this.setState({activity_ending_date: Moment(event.target.value).format('YYYY-MM-DD')})
    }

    onActivityDuration = (event) => {
        this.setState({activity_duration: event.target.value})
    }

    onActivityRemarks = (event) => {
        this.setState({activity_remarks: event.target.value})
    }

    onValidsub = () => {
        this.setState({nameError: null})
        this.setState({regionError: null})
        this.setState({districtError: null})
        this.setState({startdateError: null})

        if(!this.state.activity_name){
            this.setState({nameError: '**Activity name cannot be blank**'})
        }

        if(!this.state.activity_region){
            this.setState({regionError: '**Cannot be blank**'})
        }

        if(!this.state.activity_district){
            this.setState({districtError: '**Cannot be blank**'})
        }

        if(!this.state.activity_starting_date){
            this.setState({startdateError: '**Cannot be blank**'})
        }

        if(this.state.activity_starting_date > this.state.activity_ending_date){
            this.setState({startdateError: '**Starting Date must be smaller than Ending Date**'})
        }

    }


    componentWillMount() {
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

    onSubmitActivity = (event) => {
        event.preventDefault()
        this.onValidsub();

        fetch('http://localhost:3001/updateProject-activity/' + this.state.activity_id, {
          method: 'PUT',
          headers: {'Accept':'application/json', 'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify({
            project_id: this.state.project_id,
            activity_name: this.state.activity_name,
            activity_goal: this.state.activity_goal,
            activity_region: this.state.activity_region,
            activity_district: this.state.activity_district,
            activity_ward: this.state.activity_ward,
            implementation_stage: this.state.implementation_stage,
            activity_starting_date: this.state.activity_starting_date,
            activity_ending_date: this.state.activity_ending_date,
            activity_duration: this.state.activity_duration,
            activity_remarks: this.state.activity_remarks
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
            <div className='ModifyActivity pa3' >
                <h2 className='underline' >Update Activity</h2>
                <form>
                    <div className="mb-4 row">
                        <label htmlFor="activity_name" className="col-auto col-form-label">Activity Name:</label>
                        <div className="col-sm-6">
                            <input type="text"  className="form-control" id="activity_name" value={this.state.activity_name} onChange={this.onActivityName} />
                            <b className='red' >{this.state.nameError}</b>
                        </div>
                    </div>
                     <br />
                    <div className="mb-4 row">
                        <label htmlFor="activity_goal" className="col-auto col-form-label">Activity Goals:</label>
                        <div className="col-sm-6">
                            <textarea type="text" className="form-control" id="activity_goal" value={this.state.activity_goal} onChange={this.onActivityGoal} />
                        </div>
                    </div>
                    <div className='row mb-4' >
                        <label htmlFor='' className="col-auto col-form-label">Activity Location:</label> 
                        <div className='row col-auto' >
                            <select className="form-select form-select-lg" aria-label=".form-select-lg example" value={this.state.selectreg} onChange={this.onActivityRegion.bind(this)} >
                                <option selected>{this.state.activity_region}</option>
                                {this.state.regions.map(x => {
                                    return <option> {x.name} </option>
                                })}
                            </select>
                            <div style={{color: 'red'}}>
                                {this.state.regionError}
                            </div>
                             &nbsp;&nbsp; &nbsp; &nbsp;

                            <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={this.onActivityDistrict} >
                                <option selected disabled>{this.state.activity_district}</option>
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
                                <input className="form-control" type="text" placeholder="Enter Ward" aria-label=".form-control-sm example" value={this.state.activity_ward} onChange={this.onActivityWard} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="implementation stage" className="col-auto col-form-label">Implementation Stage:</label>
                        <div className="col-sm-6">
                            <textarea type="text" className="form-control" id="implementation stage" value={this.state.implementation_stage} onChange={this.onImplementationStage} />
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="astarting_date" className="col-auto col-form-label">Activity Starting_date :</label>
                        <div className="col-sm-6">
                            <input type="date"  className="form-control" id="astarting_date"  value={Moment(this.state.activity_starting_date).format('YYYY-MM-DD')} onChange={this.onStartingDate} />
                            <b className='red' >{this.state.startdateError}</b>
                        </div>
                    </div>
                     <br />
                    <div className="mb-4 row">
                        <label htmlFor="aending_date" className="col-auto col-form-label">Activity Ending_date :</label>
                        <div className="col-sm-6">
                            <input type="date"  className="form-control" id="aending_date"  value={Moment(this.state.activity_ending_date).format('YYYY-MM-DD')} onChange={this.onEndingDate} />
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="activity_duration" className="col-auto col-form-label">Ativity Duration:</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="activity_duration" value={this.state.activity_duration} onChange={this.onActivityDuration} />
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="activity_remarks" className="col-auto col-form-label">Activity Remarks:</label>
                        <div className="col-sm-6">
                            <textarea type="text" className="form-control" id="activity_remarks" value={this.state.activity_remarks} onChange={this.onActivityRemarks} />
                        </div>
                    </div>
                    <div className='row mb-4 col-auto'>
                        <button type='reset' className='btn btn-primary col-sm-3'>Cancel</button> &nbsp;&nbsp;&nbsp;
                        <button type='submit' className='btn btn-primary col-sm-3' onClick={this.onSubmitActivity} >Save</button>
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

export default ModifyActivity;