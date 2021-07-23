import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ComposedChart, Line, Area, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


class ProjectStats extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            regions: [],
            districts: [],
            selectreg:'',
            project_region: '',
            project_district: ''
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
    
      onProjectRegionChange = (event) => {
        this.setState({project_region: event.target.value})
        this.setState({selectreg: event.target.value})
        this.setState({ districts: this.state.regions.find(x => x.name === event.target.value).districts })
    }

    onProjectDistrictChange = (event) => {
        this.setState({project_district: event.target.value})
    }

  

    render( ){ 

        const list1 = this.state.districts.map(x => {
                           return {name: x, Projects: Math.floor(Math.random() * 11) }
                        } )
                

        const data =  list1;
            
                // this.state.districts.map(x => {
                //     return [{name: {x},
                //              Projects: 40}] 
                // })
            
            
            
            
           
            

            // {
            //   name: 'Babati',
            //   Projects: 2,
            // },
            // {
            //   name: 'Hanang',
            //   Projects: 1,
            // },
            // {
            //   name: 'Mbulu',
            //   Projects: 2,
            // },
            // {
            //   name: 'Simanjiro',
            //   Projects: 2,
            // },
            // {
            //   name: 'Kiteto',
            //   Projects: 1,
            // }
            
        

        return(
            <div className= 'ProjectStats ' style={{width: '100%'}} > 
                <h4>Projects Statisticts.. </h4> 
               
                <Container  >
                    <Row   >
                        <Col >
                            <Card border="dark" style={{ width: '100%' }} >
                                <Card.Header className='d-flex justify-content-start bg' style={{backgroundColor: 'lightblue'}} >
                                    <h5> Projects According to Location: </h5> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                                    <select className="form-select form-select-lg" aria-label=".form-select-lg example" value={this.state.selectreg} onChange={this.onProjectRegionChange.bind(this)} >
                                        <option selected>Select Region</option>
                                        {this.state.regions.map(x => {
                                            return <option> {x.name} </option>
                                        })}
                                    </select>
                                </Card.Header>
                                <Card.Body  >
                                        <ComposedChart 
                                        layout="vertical"
                                        width={950}
                                        height={400}
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 20,
                                            bottom: 20,
                                            left: 40,
                                        }}
                                        >
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" scale="band" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Projects" barSize={30} fill="#413ea0" />
                                        </ComposedChart>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        );
    }
}

export default ProjectStats;