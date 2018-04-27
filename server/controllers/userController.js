module.exports = {
    retrieveUsers:(req,res,next) => {
        const db = req.app.get('db');

        db.getUsers().then(users => {
            users = users.filter(user => {
                user.id !== req.session.passport.user
            });
            console.log('EVERYONE, GET IN HERE: ', users);
            res.status(200).send(users)
        }).catch(err => {console.log('dun goofd @ getusers: ', err)})
    },
    getPaginatedUsers:(req,res,next) => {
        const db = req.app.get('db');
        let {user} = req.session.passport;
        let userCount;

        db.pageCount(user).then(pages => {
            console.log('page count: ', pages[0].count);
            userCount = pages[0].count;
        });
        db.paginated(user, req.query.page).then(users => {
            console.log('paginated users: ', users);
            res.status(200).send([users, userCount]);
        }).catch(err => console.log('dun goofd @ pagination: ', err))
    },
    filterUsers:(req,res,next) => {
        const db = req.app.get('db');
        let {user} = req.session.passport;
        let {firstName, lastName, page} = req.query;

        firstName ? 
        db.get_by_first(user,firstName,page).then(users=>res.status(200).send(users)) :
        db.get_by_last(user,lastName,page).then(users=>res.status(200).send(users))
    },
    revitalizeUser:(req,res,next) => {
        const db = req.app.get('db');
        let {firstName, lastName, hairColor, eyeColor, gender, 
            hobby, birthDay, birthMonth, birthYear} = req.body;
        
            db.update_user([req.params.id, firstName, lastName, hairColor,
                            eyeColor, gender, hobby, birthDay, birthMonth, birthYear])
            .then(user => res.status(200).send(user))
            .catch(err => console.log('update fuckd up: ', err))
    }
}