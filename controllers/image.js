const  Clarifai = require('clarifai');


const faceDetect = new Clarifai.App({
    apiKey: 'ff14243b7b7c4f3a9881939a8a93de6a'
  })

const handleApiCall = (req, res) => {
    faceDetect.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => { res.json(data)})
    .catch(err => res.status(400).json('Unable to work with API'))
}
const { handleProfileGet } = require("./profile");

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id).increment('entries',1).returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err=> res.status(400).json('unable to get entries'))

    // let found = false;
    // database.users.forEach(users => {
    //     if (users.id === id) {
    //         found = true;
    //         users.entries++
    //         return res.json(users.entries)
    //     } 
    // })

    // // Need to separate this because the else statement will break the forEach
    // if(!found) {
    //     res.status(400).json('not found')
    // }
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}