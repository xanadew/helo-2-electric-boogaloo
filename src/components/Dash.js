import React from 'react';
import Nav from './Nav';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../ducks/reducer';
import '../App.css';


class Dash extends React.Component {
    constructor() {
        super();
        this.state = {
            view: 'Dashboard',
            users: [],
            filter: 'First',
            value: 'first_name'
        };
        this.handleChange = this.handleChange.bind(this);
        this.addFriend = this.addFriend.bind(this);
    }

    componentDidMount(){
        let {history} = this.props;
        this.props.getUser(history);
        axios.get('/api/recommended').then(res => {
            console.log(res.data);
            this.setState({users: res.data});
        })
    }
    handleChange(e){
        this.setState({
            value: e.target.value
        });
    }
    addFriend(val){
        axios.post('/api/friend/add', {val}).then(res => {
            axios.get('/api/recommended').then(res => {
                this.setState({
                    users: res.data
                });
            }).catch(err => console.log('addfriend fuck: ', err))
        })
    }

    render() {
        let {user} = this.props;
        let {value} = this.state;
        if(user[0]){
            var filterRec = this.state.users.filter( people => people[value] === user[0][value] && people.id !== user[0].id)
            var friendBoxes = filterRec.map( (people, i) => {
                return (
                    <div key={i} className="friendBox">

                        <img width="100px" src={people.img} alt="not found"/>

                        <div className="friendBox_name">
                            <span>{people.first_name} </span>
                            <span>{people.last_name}</span>
                        </div>

                        <button className="friendBox_button" onClick={() => this.addFriend(people.id)}>add friend</button>

                    </div>
                )
            })
        }
        return (
            <div>
                <Nav>{this.state.view}</Nav>
                <div className="pagebody">
                    <div className="dashcontent">
                        <div className="top2">
                            <div className="user_element">
                                <div>
                                    { user[0] ? <div>{<img id="profile_img_dashboard" className="profile_img" alt="profile_img" src={user[0].img}/>}</div> :   <img id="profile_img_dashboard" className="profile_img" alt="profile_img"/>}
                                </div>
                                <div>
                                { user[0] ? <div>{<h3>{user[0].first_name || "firstName"}</h3>}</div> : <h3>firstName</h3>}
                                { user[0] ? <div>{<h3>{user[0].last_name || "lastName"}</h3>}</div> : <h3>lastName</h3>}
                                <Link to="/profile"><button id="greybutton" className="search_button">Edit Profile</button></Link>
                                </div>
                            </div>
                            <div className="welcomebox">
                                <span className="welcomespan">Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</span>
                            </div>
                        </div>
                        <div className="bottom_contents">
                            <div className="bottomtop_conts">
                            </div>
                            <div className="recommended">
                                <div className="friendsLine">
                                    <span className="friendsText">Recommended Friends</span>
                                    <div>
                                        <span className="sortText">Sorted by</span>
                                        <select value={this.state.value} onChange={this.handleChange} className="search_select">
                                        <option value='first_name'>First Name</option>
                                        <option value='last_name'>Last Name</option>
                                        <option value='gender'>Gender</option>
                                        <option value='hobby'>Hobby</option>
                                        <option value='hair_color'>Hair Color</option>
                                        <option value='eye_color'>Eye Color</option>
                                        <option value='bday'>Birthday</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="recommendedFriends">
                                {friendBoxes}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect( state => state, { getUser } )(Dash);