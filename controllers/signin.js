const handleSignin = (req,res, db, bcrypt)=>{
    // bcrypt.compare("apples", "$2a$10$X2XEEx5VezITZ2hdP9EVTuVJtGbv1JQ7KkM7MooUqFPH.jSQP4y.S", function(err, res) {
    //         console.log('first guess', res)
    // });
    // bcrypt.compare("cinnamon", "$2a$10$X2XEEx5VezITZ2hdP9EVTuVJtGbv1JQ7KkM7MooUqFPH.jSQP4y.S", function(err, res) {
    //     console.log('first guess', res)
    // });
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission')
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            console.log(isValid)
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        console.log(user)
                        res.json(user[0])
                    })
                    .catch(error => res.status(400).json('unable to get user'))
                
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(error => res.status(400).json('wrong credentials'))
    
    // if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    //     // res.json('success')
    //     res.json(database.users[0])
    // } else {
    //     res.status(400).json('error logging in')
    // }
    // console.log('POST REQUEST SIGNIN', req.body.email, req.body.password)

}

module.exports = {
    handleSignin:handleSignin
}