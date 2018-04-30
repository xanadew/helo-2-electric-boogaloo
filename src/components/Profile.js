import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser, updateFirstName, updateLastName, updateGender, updateHairColor, updateEyeColor, updateHobby, updateBirthDay, updateBirthMonth, updateBirthYear} from '../ducks/reducer';
import Nav from './Nav';
import '../App.css';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            userInfo: {
                firstName: this.props.user.firstname,
                lastName: '',
                gender: '',
                hairColor: '',
                eyeColor: '',
                hobby: '',
                birthDay: '', 
                birthMonth: '', 
                birthYear: ''
            },
            currentDate: 0
        }
        this.updateShmupdate = this.updateShmupdate.bind(this);
    }
    componentDidMount(){
        // const {history, getUser} = this.props;
        // getUser(history);
        // console.log(this.props);
        if (!this.props.user){
            this.props.history.push('/');
        }
        let date = new Date().getFullYear();
        this.setState({
            currentDate: date
        })
    }
    changeFirst(firstName){
        this.props.updateFirstName(firstName);
    }
    changeLast(lastName){
        this.props.updateLastName(lastName);
    }
    changeGender(gender){
        this.props.updateGender(gender);
    }
    changeHairColor(hairColor){
        this.props.updateHairColor(hairColor);
    }
    changeEyeColor(eyeColor){
        this.props.updateEyeColor(eyeColor);
    }
    changeHobby(hobby){
        this.props.updateHobby(hobby);
    }
    changeBirthDay(birthDay){
        this.props.updateBirthDay(birthDay);
    }
    changeBirthMonth(birthMonth){
        this.props.updateBirthMonth(birthMonth);
    }
    changeBirthYear(birthYear){
        this.props.updateBirthYear(birthYear);
    }
    updateShmupdate(){
        let {firstName, lastName, gender, hairColor,
            eyeColor, hobby, birthDay, birthMonth, birthYear} = this.props;
        let user = {
            firstName: firstName,
            lastName: lastName,
            hairColor: hairColor,
            eyeColor: eyeColor,
            gender: gender,
            hobby: hobby,
            birthDay: birthDay,
            birthMonth: birthMonth,
            birthYear: birthYear
        }
        axios.patch(`/api/user/patch/${this.props.user.id}`, user).then(res => {
            console.log('patchin: ', res.data);
            this.props.history.push('/dash')});
    }
    render() {
        let daySelect = this.state.days.map((day,i) => {
            return <option value={day} key={i}>{day}</option>
        })
        let monthSelect = this.state.months.map((month,i) => {
            return <option value={month} key={i}>{month}</option>
        })
        let year = parseInt(this.state.currentDate+1);
        let yearSelect = this.state.days.map((val,i) => {
            year--;
            return <option value={year} key={i}>{year}</option>
        })
        console.log("user.id: ",this.props.user.id);
        return (
            <div className='dash'>
                <Nav/>
                <div className='midDashContainer'>
                    <div className='topContainer'>
                        <div className='profileAvatarContainer'>
                            <img className='profileAvatar' src={this.props.user.picture} alt='pic'/>
                            <h4 className='profileUsername'>{this.props.user.firstname}</h4>
                        </div>
                        <div className='profileButtonContainer'>
                            <button className='updateButton' onClick={() => this.updateShmupdate()}>Update</button>
                            <Link to='/dash'><button className='cancelButton'>Cancel</button></Link>
                        </div>
                    </div>
                    <div className='profileBottomContainer'>
                        <div>
                            <h4 className='profileInfoTitles'>First Name</h4>
                            <input onChange={(e) => this.changeFirst(e.target.value)}/>
                            <h4 className='profileInfoTitles'>Last Name</h4>
                            <input onChange={(e) => this.changeLast(e.target.value)}/>
                            <h4 className='profileInfoTitles'>Gender</h4>
                            <select onChange={(e) => this.changeGender(e.target.value)}>
                                <option selected>--SELECT--</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            <h4 className='profileInfoTitles'>Hair Color</h4>
                            <select onChange={(e) => this.changeHairColor(e.target.value)}>
                                <option selected>--SELECT--</option>
                                <option value='Purple'>Purple</option>
                                <option value='black'>Black</option>
                                <option value='orange'>Orange</option>
                                <option value='blue'>Blue</option>
                                <option value='yellow'>Yellow</option>
                                <option value='green'>Green</option>
                                <option value='white'>White</option>
                                <option value='brown'>Brown</option>
                            </select>
                            <h4 className='profileInfoTitles'>Eye Color</h4>
                            <select onChange={(e) => this.changeEyeColor(e.target.value)}>
                                <option selected>--SELECT--</option>
                                <option value='blue'>Blue</option>
                                <option value='brown'>Black</option>
                                <option value='green'>Green</option>
                                <option value='hazel'>Grey</option>
                                <option value='white'>White</option>
                            </select>
                        </div>
                        <div>
                        <h4 className='profileInfoTitles'>Hobby</h4>
                        <select onChange={(e) => this.changeHobby(e.target.value)}>
                                <option selected>--SELECT--</option>
                                <option value='apple picking'>Apple-Picking</option>
                                <option value='help-desk'>Help Desk</option>
                                <option value='pickling'>Pickling</option>
                                <option value='powerpoint'>Powerpoint</option>
                                <option value='success'>Success!!</option>
                                <option value='singing'>Singing</option>
                                <option value='synergy'>Synergy</option>
                            </select>
                            <h4 className='ProfileInfoTitles'>Birth Day</h4>
                            <select onChange={(e) => this.changeBirthDay(e.target.value)}>
                                <option selected>--SELECT--</option>
                                {daySelect}
                            </select>
                            <h4 className='ProfileInfoTitles'>Birth Month</h4>
                            <select onChange={(e) => this.changeBirthMonth(e.target.value)}>
                                <option selected>--SELECT--</option>
                                {monthSelect}
                            </select>
                            <h4 className='ProfileInfoTitles'>Birth Year</h4>
                            <select onChange={(e) => this.changeBirthYear(e.target.value)}>
                                <option selected>--SELECT--</option>
                                {yearSelect}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
let mapStateToProps = state => {
    let {user,firstName,lastName,gender,hairColor,eyeColor,
        hobby,birthDay,birthMonth,birthYear} = state;
    return {
        user,
        firstName,
        lastName,
        gender,
        hairColor,
        eyeColor,
        hobby,
        birthDay,
        birthMonth,
        birthYear
    }
}

export default connect(mapStateToProps, {getUser,updateFirstName,updateLastName,updateGender,updateHairColor,updateEyeColor,updateHobby,updateBirthDay,updateBirthMonth,updateBirthYear})(Profile);