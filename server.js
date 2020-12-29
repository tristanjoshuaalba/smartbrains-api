const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');



const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-clear-57746',
      user : 'talba',
      password : 'talba',
      database : 'smartbrains'
    }
  });

// console.log(postgres.select('*').from('users'));

// db.select('*').from('users').then(data => {
//     console.log(data);
// })

const app = express();
app.use(bodyParser.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         }, 
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }, 
//     ]
// }

app.get('/', (req, res)=>{
    res.send('It is working!')
})

app.post('/signin', (req,res)=>{ signin.handleSignin(req, res, db, bcrypt) })
app.post('/register',(req, res)=>{ register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res)=> { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



app.listen(process.env.PORT, ()=>{
    console.log(`app is running on Port ${process.env.PORT}`)
}) 


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

