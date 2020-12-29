const handleRegister = (req, res, db, bcrypt)=>{
    // Using destructuring to get the contents of req.body
    const {email, name, password} = req.body;

    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);

    // bcrypt.hash(password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash)
    // });
    // Communicate with the database and insert 
    db.transaction(trx => {
        trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                    return trx('users')
                    // Return all the columns inserted
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch(err=> res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}



