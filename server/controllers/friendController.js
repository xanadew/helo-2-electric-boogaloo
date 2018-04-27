module.exports = {
    retrieveFriends:(req,res,next) => {
        const db = req.app.get('db');
        let {user} = req.session.passport;

        db.get_friends().then(friends => {
            console.log('get mah frondz: ', friends);
            friends ? friends.filter(val => {val.match_id === user}) : console.log('no frondz D:');
            res.status(200).send(friends);
        }).catch(err => console.log('dun goofd @ getfrondz: ', err))
    },
    conjureFriend:(req,res,next) => {
        const db = req.app.get('db');
        let {id, friend_id} = req.body;

        db.add_friend(id, friend_id).then(friends => {
            console.log('made a frond: ', friends);
            res.status(200).send(friends);
        }).catch(err => console.log('dun goofd @ addfrond: ', err))
    },
    banishFriend:(req,res,next) => {
        const db = req.app.get('db');

        db.remove_friend(friend_id).then(friends => {
            console.log('y u do this');
            res.status(200).send();
        }).catch(err => console.log('dun goofd @ removefrond: ', err))
    }
}