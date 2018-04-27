require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      dotenv = require('dotenv'),
      friendCtrl = require('./controllers/friendController'),
      userCtrl = require('./controllers/userController');
const {
    SESSION_SECRET,
    CONNECTION_STRING,
    AUTH_DOMAIN,
    AUTH_SECRET,
    AUTH_CLIENT_ID,
    CALLBACK_URL,
    SERVER_PORT
} = process.env;

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

massive(CONNECTION_STRING).then(db => {
    const port = SERVER_PORT;
    console.log('WE OUT HERE');
    app.set('db', db);
    app.listen(port, () => {
        console.log(`${port} H4XX0R`)
    });
});

passport.use(new Auth0Strategy({
    domain: AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID,
    clientSecret: AUTH_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get('db');
    let {nickname, name, auth_id, picture, user_id} = profile;
    db.find_user([user_id]).then(user => {
        if (user[0]) {
            console.log('found user: ', user[0].id);
            return done(null, user[0].id, user[0].firstname, user[0].lastname);
        } else {
            db.create_user([nickname, user_id, name.givenName, name.familyName, 'https://robohash.org/me'])
            .then(user => {
                console.log('fresh meat: ', user);
                return done(null, user[0].id, user[0].firstname, user[0].lastname);
            })
        }
    })
}));

app.get('/auth/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dash',
    failureRedirect: 'http://localhost:3000/#/'
}));

app.get('/api/auth/authenticated', (req,res) => {
    if (!req.user){
        res.status(403).send('NOT IN MY HOUSE');
    } else {
    console.log('req.user: ', req.user);
    res.status(200).send(req.user);
}});

app.post('/auth/logout', (req,res) => {
    req.session.destroy();
    res.status(200).send('GTFO');
});

passport.serializeUser((user,done) => {
    done(null, user);
});

passport.deserializeUser((id,done) => {
    app.get('db').find_session([id])
    .then(user => {
        done(null,user[0])
    });
});

// friendpointz
app.get('/api/friend/list', friendCtrl.retrieveFriends);
app.post('/api/friend/add', friendCtrl.conjureFriend);
app.post('/api/friend/remove', friendCtrl.banishFriend);

// userpointz
app.patch('/api/user/patch/:id', userCtrl.revitalizeUser);
app.get('/api/user/list', userCtrl.getPaginatedUsers);
app.get('/api/user/search', userCtrl.filterUsers);
app.post('/api/recommended', userCtrl.retrieveUsers);