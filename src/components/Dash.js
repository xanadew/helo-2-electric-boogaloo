import React from 'react';
import Nav from './Nav';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser,getAllUsers,getFriends} from '../ducks/reducer';
import '../App.css';


class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recUsers: [],
            friendList: [],
            selectedBox: ''
        };
        this.sortedBy = this.sortedBy.bind(this);
        this.addFriend = this.addFriend.bind(this);
    }

    componentDidMount(){
        let {getUser,getAllUsers,getFriends} = this.props;

        axios.all([
            axios.get('/api/auth/authenticated'),
            axios.get('/api/recommended'),
            axios.get('/api/friend/list')
        ]).then(res => {
            getUser(res[0].data);
            getAllUsers(res[1].data);
            getFriends(res[2].data);
        })
    }

    sortedBy(val){
        let {getAllUsers, allUsers, user, userFriends} = this.props;

        this.setState({selectedBox: val});

        axios.get('/api/recommended').then(res => {
            getAllUsers(res.data);
        });

        let filteredUsers = allUsers.filter(common => {
            return common[val] === user[val]
            });
        console.log('filtered fools: ', filteredUsers);
        let friendIds = userFriends.map((val,i) => {
           return friendIds.push(val.friend_id);
        });
        let superFiltered = filteredUsers.filter((uid, i) => {
            return friendIds.indexOf(uid.id) === -1;
        });
        this.setState({
            recUsers: superFiltered
        });
    }
    addFriend(friendId){
        let {user, history, userFriends} = this.props;
        let friend = {
            id: user.id,
            friend_id: friendId
        }
        axios.post('/api/friend/add', friend).then(res => {
            console.log('add friend @ dash: ', res.data);
            history.push('/dash');
            userFriends.push(res.data);
            this.sortedBy(this.state.selectedBox);
        })
    }

    render() {
        let userCards = this.state.recUsers.map((val, i) => {
            return <div key={i} className='recFriend'>
                <div className='imgNameContainer'>
                    <img className='recFriendPic' src={val.picture} alt=''/>
                    <div className='nameContainer'>
                        <h3 className='recFriendName'>{val.firstname}</h3> 
                        <h3 className='recFriendName'>{val.lastname}</h3> 
                    </div>
                </div>
                <button className='addFriendButton' value={val.id} onClick={(e) => this.addFriend(e.target.value)}>Add Friend</button>
            </div>
        })
        return(
            <div className='dash'>
                <Nav/>
                <div className='midDashContainer'>
                    <div className='top2Containers'>
                        <div className='dashNameImgContainer'>
                            <div className='dashProfileAvatar'>
                                <img className='avatarImg' src={this.props.user.picture} alt=''/>
                            </div>
                            <div className='dashProfileIcons'>
                                <h4>{this.props.user.firstname} {this.props.user.lastname}</h4>
                                <Link to='/profile'><button className='dashEditProfile'>Edit Profile</button></Link>
                            </div>
                        </div>
                        <div className='welcome'>
                            <p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
                        </div>
                    </div>
                    <div className='dashBottomContainer'>
                        <div className='dashTitleSelect'>
                            <h3 className='recFriends'>Recommended Friends</h3>
                            <div className='sortedBy'>
                                <h4>Sorted By</h4>
                                <select className='sortDropdown' onChange={(e) => this.sortedBy(e.target.value)}>
                                    <option value='firstname'>First Name</option>
                                    <option value='lastname'>Last Name</option>
                                    <option value='gender'>Gender</option>
                                    <option value='hobby'>Hobby</option>
                                    <option value='haircolor'>Hair Color</option>
                                    <option value='eyecolor'>Eye Color</option>
                                    <option value='birthday'>Birthday</option>
                                </select>
                            </div>
                        </div>
                        <div className='recFriendsContainer'>
                        {userCards}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
let mapStateToProps = state => {
    const {user, allUsers, userFriends} = state;
    return {
        user,
        allUsers,
        userFriends
    }
}
export default connect(mapStateToProps,{getUser, getAllUsers, getFriends})(Dash);