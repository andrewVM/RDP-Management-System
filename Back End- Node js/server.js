const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const tanzaniageodata = require("tanzaniageodata");

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'databasepost',
      database : 'rdpms'
    }
  });



const sys = express();

/* Middleware */
sys.use(bodyParser.json());
sys.use(cors());



/* Home page endpoint */
sys.get('/', (req, res) => {
    res.send('The system is working');
})


/*function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }*/


/*login trial with token */
sys.use('/loginR', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

/* login endpoint */
sys.post('/login', (req, res) => {
    database.select('username', 'password').from('users')
            .where('username', '=', req.body.username)
            .then(data => {
                const isValid = bcrypt.compareSync(req.body.password, data[0].password);
                if(isValid) {
                    return database.select('*').from('users')
                        .where('username', '=', req.body.username)
                        .then(user => {
                            res.json(user[0])
                        })
                        .catch(err => res.status(400).json('unable to get user'))

                } else{
                    res.status(400).json('Wrong username or password')
                }
            })
            
            .catch(err => res.status(400).json('Wrong Credentials'))
    
})


/* Register-user Endpoint */
sys.post('/registerUser', (req, res) => {
    const { first_name, last_name, username, user_email, password, confPassword, user_privileges, organization_id } = req.body;
    const hash = bcrypt.hashSync(password);

    /*const token = generateAccessToken({ username: req.body.username });*/
    
    if(!user_email.includes('@') || !first_name || !last_name || !username || username.includes('/') || !user_email || !password || !confPassword || !user_privileges || (confPassword !== password)   ){
        res.status(400).json('unable to register..')
    } else{

    database('users')
    .insert({
        first_name: first_name,
        last_name: last_name,
        username: username,
        user_email: user_email,
        password: hash,
        user_privileges: user_privileges,
        organization_id: organization_id
    })
    .then(response => {
        console.log(response)
        res.json('User added Successfully');
    })
    .catch(err => {
        console.log(err)
        res.status(400).json('unable to register')
    }) }

   /* bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
    }); */
    

})


/*Register-organization Endpoint */
sys.post('/registerOrganization', (req, res) => {
    const {organization_id,
            organization_name,
            organization_descript,
            organization_mission,
            organization_vission,
            area_of_operation,
            organization_phoneNumbber,
            organization_email,
            organization_website} = req.body;
            console.log(req.body)

    if( !organization_id || organization_id.includes('/') || !organization_name || !organization_descript || !area_of_operation || !organization_email || !organization_email.includes('@') ){
        res.status(400).json('cannot register organization...')
    } else{
    
    database('organization')
    .insert({
            organization_id: organization_id,
            organization_name: organization_name,
            organization_descript: organization_descript,
            organization_mission: organization_mission,
            organization_vission: organization_vission,
            area_of_operation: area_of_operation,
            organization_phonenumbber: organization_phoneNumbber,
            organization_email: organization_email,
            organization_website: organization_website
    })
    .then(response => {
        console.log(response)
        res.json('Organization registered successfully');
    })
    .catch(err => {
        console.log(err)
        res.status(400).json('cannot register organization')
    } )
    }
})


/* add-project Endpoint */
sys.post('/addProject', (req, res) => {
    const {project_id,
            p_name,
            p_description,
            p_goals,
            p_target,
            p_region,
            p_district,
            p_ward,
            p_donor,
            p_starting_date,
            p_ending_date,
            p_duration,
            p_status,
            p_remarks,
            p_category,
            organization_id} = req.body;
            console.log(req.data);
    
    if(!project_id || project_id.includes('/') || !p_name || !p_region || !p_district || !p_starting_date || !p_category || !organization_id || (p_starting_date > p_ending_date) ){
        res.status(400).json('cannnot add project..')
    }else{
    database('project')
    .insert({project_id: project_id,
            p_name: p_name,
            p_description: p_description,
            p_goals: p_goals,
            p_target: p_target,
            p_region: p_region,
            p_district: p_district,
            p_ward: p_ward,
            p_donor: p_donor,
            p_starting_date: p_starting_date,
            p_ending_date: p_ending_date,
            p_duration: p_duration,
            p_status: p_status,
            p_remarks: p_remarks,
            p_category: p_category,
            organization_id: organization_id
    })
    .then(response => {
        console.log(response)
        res.json('Project added successfully');
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json('cannnot add project...')
    }) 
    }

})

/* add-project_activity endpoint */
sys.post('/addProject-activity', (req, res) => {
    const {activity_id,
        activity_name,
        activity_goal,
        activity_region,
        activity_district,
        activity_ward,
        implementation_stage,
        activity_starting_date,
        activity_ending_date,
        activity_duration,
        activity_remarks,
        project_id} = req.body;
        console.log(req.body);
        
    if(!activity_name || !activity_region || !activity_district || !activity_starting_date || !project_id || (activity_starting_date > activity_ending_date) ){
        res.status(400).json('cannot add activity..')
    }else{
    database('project_activity')
    .insert({
        activity_id: activity_id,
        activity_name: activity_name,
        activity_goal: activity_goal,
        activity_region: activity_region,
        activity_district: activity_district,
        activity_ward: activity_ward,
        implementation_stage: implementation_stage,
        activity_starting_date: activity_starting_date,
        activity_ending_date: activity_ending_date,
        activity_duration: activity_duration,
        activity_remarks: activity_remarks,
        project_id: project_id
    })
    .then(response => {
        res.json('activity added successfully');
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json('cannot add activity')
    } )
    }

})


/* view users */
sys.get('/userz', (req, res) => {
    const {users} = req.params;
    database.select('*').from('users')
    .then(users => {
        res.json(users)
        
    })
    .catch(err => res.status(400).json('Error getting Users'))

})


/* get user profile endpoint */
sys.get('/profile/:usernamey', (req, res) => {
    const {usernamey} = req.params;
    database.select('*').from('users').where({ 'username': usernamey})
    .then(user => {
        if(user.length) {
            res.json(user)
        } else {
            res.status(400).json('user not found')
        }
        
    })
    .catch(err => res.status(400).json('Error getting user'))
})

/* view organizations */
sys.get('/organizations', (req, res) => {
    const {organizations} = req.params;
    database.select('*').from('organization')
    .then(organization => {
        res.json(organization)
    })
    .catch(err => res.status(400).json('Error getting projects'))

})


/* view organization-profile endpoint */
sys.get('/organization/:organization_idz', (req, res) => {
    const {organization_idz} = req.params;
    database.select('*').from('organization').where({ 'organization_id': organization_idz})
    .then(organization => {
        if(organization.length) {
            res.json(organization)
        } else {
            res.status(400).json('Organization not found')
        }
    })
    .catch(err => res.status(400).json('Error getting organization'))

})

/* view projects */
sys.get('/projects', (req, res) => {
    const {projects} = req.params;
    database.select('*').from('project').orderBy('p_name', 'desc ')
    .then(project => {
        res.json(project)
    })
    .catch(err => res.status(400).json('Error getting projects'))

})

// View projects by organization
sys.get('/projectsorg/:organization_idi', (req, res) => {
    const {organization_idi} = req.params;
    database.select('*').from('project').where({ 'organization_id': organization_idi})
    .then(project => {
            res.json(project)
        
    })
    .catch(err => res.status(400).json('Error getting project'))

})


/* view project/:category endpoint*/
sys.get('/projectz/:p_categori', (req, res) => {
    const {p_categori} = req.params;
    database.select('*').from('project').where({ 'p_category': p_categori})
    .then(project => {
            res.json(project)
        
    })
    .catch(err => res.status(400).json('Error getting project'))

})


/* view project/:id  endpoint*/
sys.get('/project/:project_idz', (req, res) => {
    const {project_idz} = req.params;
    database.select('*').from('project').where({ 'project_id': project_idz})
    .then(project => {
        if(project.length) {
            res.json(project)
        } else {
            res.status(400).json('Project not found')
        }
    })
    .catch(err => res.status(400).json('Error getting project'))

})

/*view activities endpoint */
sys.get('/project_activities/:project_ida', (req, res) => {
    const {project_ida} = req.params;
    database.select('*').from('project_activity').where({ 'project_id': project_ida})
    .then(activities => {
        if(activities.length) {
            res.json(activities)
        } else{
            res.status(400).json('Activities not found')
        } 
    })
    .catch(err => res.status(400).json('Error getting projects'))

})


/*view project-activity endpoint*/
sys.get('/project_activity/:activity_idi', (req, res) => {
    const {activity_idi} = req.params;
    database.select('*').from('project_activity').where({ 'activity_id': activity_idi})
    .then(activity => {
        if(activity.length) {
            res.json(activity)
        } else {
            res.status(400).json('Project not found')
        }
    })
    .catch(err => res.status(400).json('Error getting project'))

})


/* update user info */
sys.put('/profile/:username', (req, res) => {
    const {username, first_name, last_name, user_email, password, user_privileges, organization_id} = req.body;
    const hash = bcrypt.hashSync(password);
    
    if(!user_email.includes('@') || !first_name || !last_name || !username || username.includes('/') || !user_email || !password || !confPassword || !user_privileges || (confPassword !== password)   ){
        res.status(400).json('unable to register..')
    } else{
    database('users').where({username:req.params.username})
    .update({
        first_name: first_name,
        last_name: last_name,
        user_email: user_email,
        password: hash,
        user_privileges: user_privileges,
        organization_id: organization_id
    }).then(updates => {
        console.log(updates)
        res.status(200).json(updates);
    }).catch(err => {
        console.log(err)
        res.status(400).json('cannot update user')
    } )
    }
})


/* update organization info */
sys.put('/organizationz/:organization_id', (req, res) => {
    const {organization_id,
            organization_name,
            organization_descript,
            organization_mission,
            organization_vission,
            area_of_operation,
            organization_phoneNumbber,
            organization_email,
            organization_website} = req.body;
    
    if( !organization_id || organization_id.includes('/') || !organization_name || !organization_descript || !area_of_operation || !organization_email || !organization_email.includes('@') ){
        res.status(400).json('cannot register organization...')
    } else{
    database('organization').where({organization_id:req.params.organization_id})
    .update({
        organization_id: organization_id,
        organization_name: organization_name,
        organization_descript: organization_descript,
        organization_mission: organization_mission,
        organization_vission: organization_vission,
        area_of_operation: area_of_operation,
        organization_phonenumbber: organization_phoneNumbber,
        organization_email: organization_email,
        organization_website: organization_website
    }).then(updates => {
        console.log(updates)
        res.status(200).json('Organization updated Successfully...');
    }).catch(err => {
        console.log(err)
        res.status(400).json('cannot update organization')
    } ) 
    }
})


/* update project info */
sys.put('/projecti/:project_id', (req, res) => {
    const {project_id,
            p_name,
            p_description,
            p_goals,
            p_target,
            p_region,
            p_district,
            p_ward,
            p_donor,
            p_starting_date,
            p_ending_date,
            p_duration,
            p_status,
            p_remarks,
            p_category,
            organization_id} = req.body;
    
    if(!project_id || project_id.includes('/') || !p_name || !p_region || !p_district || !p_starting_date || !p_category || !organization_id || (p_starting_date > p_ending_date) ){
        res.status(400).json('cannnot add project..')
    }else{
    database('project').where({project_id:req.params.project_id})
    .update({
            project_id: project_id,
            p_name: p_name,
            p_description: p_description,
            p_goals: p_goals,
            p_target: p_target,
            p_region: p_region,
            p_district: p_district,
            p_ward: p_ward,
            p_donor: p_donor,
            p_starting_date: p_starting_date,
            p_ending_date: p_ending_date,
            p_duration: p_duration,
            p_status: p_status,
            p_remarks: p_remarks,
            p_category: p_category,
            organization_id: organization_id
    }).then(updates => {
        console.log(updates)
        res.status(200).json('Project updated Successfully...');
    }).catch(err => {
        console.log(err)
        res.status(400).json('cannot update Project')
    } )
    }
})

// update project-activity endpoint
sys.put('/updateProject-activity/:activity_id', (req, res) => {
    const {activity_id,
        activity_name,
        activity_goal,
        activity_region,
        activity_district,
        activity_ward,
        implementation_stage,
        activity_starting_date,
        activity_ending_date,
        activity_duration,
        activity_remarks,
        project_id} = req.body;
        
    if(!activity_name || !project_id || !activity_region || !activity_district || !activity_starting_date || (activity_starting_date > activity_ending_date) ){
        res.status(400).json('cannot add activity..')
    }else{
    database('project_activity').where({activity_id: req.params.activity_id})
    .update({
        activity_id: activity_id,
        activity_name: activity_name,
        activity_goal: activity_goal,
        activity_region: activity_region,
        activity_district: activity_district,
        activity_ward: activity_ward,
        implementation_stage: implementation_stage,
        activity_starting_date: activity_starting_date,
        activity_ending_date: activity_ending_date,
        activity_duration: activity_duration,
        activity_remarks: activity_remarks,
        project_id: project_id
    })
    .then(response => {
        res.json('activity Updated successfully');
    })
    .catch(err =>{
        console.log(err)
        res.status(400).json('cannot update activity')
    } )
    }
})


/* Delete project endpoint */
sys.delete('/projectdelete/:project_id', (req, res) => {
    const {project_id} = req.params;
    database.delete().from('project').where({project_id})
    .then(del => {
        console.log(del)
        res.status(200).json('Project deleted Successfully...');
    }).catch(err => {
        console.log(err)
        res.status(400).json('cannot delete Project') })
} )

/* Delete activity endpoint */
sys.delete('/activitydelete/:activity_id', (req, res) => {
    const {activity_id} = req.params;
    database.delete().from('project_activity').where({activity_id})
    .then(del => {
        console.log(del)
        res.status(200).json('Activity deleted Successfully...');
    }).catch(err => {
        console.log(err)
        res.status(400).json('cannot delete Activity') })
} )

/* Delete organization endpoint */
sys.delete('/organizationdelete/:organization_id', (req, res) => {
    const {organization_id} = req.params; 
    database.delete().from('organization').where({organization_id})
    .then(del => {
        console.log(del)
        res.json('Organization deleted Successfully...');
    }).catch(err => {
        console.log(err)
        res.status(400).json('cannot delete Organization') })
} )

/* Delete user endpoint */
sys.delete('/userdelete/:username', (req, res) => {
    const {username} = req.params;
    database.delete().from('users').where({username})
    .then(del => {
        console.log(del)
        res.json('User deleted Successfully...');
    }).catch(err => {
        console.log(err)
        res.status(400).json('cannot delete User') })
} )




sys.listen(3001, () => {
    console.log("The system is running on port 3001")
})

/*
***End Points***
/home  -res = some data
/login  ---> POST  resp 'fail/success'
/register-user  --> POST  res "user added successfully"
/register-organization  --> POST res "organization added successfully"
/projects  -->GET res = list of projects
/add-project  --> POST res  "project added successfully"
/update-project  --> PUT  res "project updated successfully"
/organization --> GET resp list of organization. */
