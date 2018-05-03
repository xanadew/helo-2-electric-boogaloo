module.exports = {
    retrieveUsers:(req,res,next) => {
        const db = req.app.get('db');
        const {value, limit} = req.query;

        db.get_all_users(req.user.id, value, limit).then(users => {
            console.log('EVERYONE, GET IN HERE: ', users);
            res.status(200).send(users)
        }).catch(err => {console.log('dun goofd @ getusers: ', err)})
    },
    getUserCount:(req,res,next) => {
        const db = req.app.get('db');

        db.pageCount(req.user.id).then(pages => {
            console.log('page count: ', pages[0].count);
            res.status(200).send(pages);
        }).catch(err => console.log('fuckd up usercount: ', err));
    },
    revitalizeUser:(req,res,next) => {
        const db = req.app.get('db');
        let {firstName, lastName, gender, hairColor, eyeColor, 
            hobby, birthDay, birthMonth, birthYear} = req.body;
        
            db.update_user(req.user.id, firstName, lastName, gender, hairColor,
                            eyeColor, hobby, birthDay, birthMonth, birthYear)
            .then(user => res.status(200).send(user))
            .catch(err => console.log('update fuckd up: ', err))
    },
    getUser:(req,res,next) => {
        req.user ? res.status(200).send([req.user]) : res.status(200).send([{id:0}])
    },
    getEnemies:(req,res,next) => {
        const db = req.app.get('db');

        db.get_enemies(req.user.id).then(users => {
            res.status(200).send(users)
        }).catch(err => console.log('sdfsdfsfsd', err));
    }
    // getLoggedInUser:(req,res,next) => {
    //     const db = req.app.get('db');

    //     db.getLoggedInUser().then(user => {
    //         res.status(200).send(user);
    //     })
    // }
}