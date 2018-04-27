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
        const {history, getUser} = this.props;
        getUser(history);
        let date = new Date().getFullYear();
        this.setState({
            currentDate: date
        })
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Profile;