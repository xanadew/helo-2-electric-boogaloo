module.exports = {
    retrieveFriends:(req,res,next) => {
        const db = req.app.get('db');

        db.get_friends(req.user.id).then(friends => {
            console.log('get mah frondz: ', friends);
            res.status(200).send(friends);
        }).catch(err => console.log('dun goofd @ getfrondz: ', err))
    },
    conjureFriend:(req,res,next) => {
        const db = req.app.get('db');
        let {val} = req.body;

        db.add_friend(req.user.id, val).then(friends => {
            console.log('made a frond: ', friends);
            res.status(200).send(friends);
        }).catch(err => console.log('dun goofd @ addfrond: ', err))
    },
    banishFriend:(req,res,next) => {
        const db = req.app.get('db');
        const {val} = req.body;

        db.remove_friend(req.user.id, val).then(friends => {
            console.log('y u do this');
            res.status(200).send(friends);
        }).catch(err => console.log('dun goofd @ removefrond: ', err))
    }
}