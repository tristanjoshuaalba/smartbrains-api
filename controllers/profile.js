const handleProfileGet = (req, res, db)=> {
    const { id } = req.params;

    // let found = false;

    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('not found')
        }   
    }).catch(err=>res.status(400).json('error getting user'))
    // database.users.forEach(users => {
    //     if (users.id === id) {
    //         found = true;
    //         return res.json(users)
    //     } 
    // })

    // Need to separate this because the else statement will break the forEach
    // if(!found) {
    //     res.status(400).json('not found')
    // }
}

module.exports = {
    handleProfileGet : handleProfileGet
}