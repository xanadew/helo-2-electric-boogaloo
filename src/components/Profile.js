import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../ducks/reducer';
import Nav from './Nav';
import '../App.css';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            view: 'Profile',
                firstName: '',
                lastName: '',
                gender: 'male',
                hairColor: 'Brown',
                eyeColor: 'Brown',
                hobby: 'Pickling',
                birthDay: 1, 
                birthMonth: 'Jan', 
                birthYear: 2018,
                firstNameTitle: '',
                lastNameTitle: '',
                picture: '',
                user: []
            }
            this.handleChange = this.handleChange.bind(this);
            this.cancelUpdates = this.cancelUpdates.bind(this);
            this.updateShmupdate = this.updateShmupdate.bind(this);
        } 
    componentDidMount(){
        // const {history, getUser} = this.props;
        // getUser(history);
        // console.log(this.props);
        const {history, getUser} = this.props;
        getUser(history);
        axios.get('/api/user').then(user =>{
            let {first_name, last_name, gender, hair_color, eye_color,
                hobby, bday, bmonth, byear, img} = user.data[0];
            this.setState({
                firstName: first_name || '',
                firstNameTitle: first_name || '',
                lastName: last_name || '',
                lastNameTitle: last_name || '',
                gender: gender || '',
                hairColor: hair_color || '',
                eyeColor: eye_color || '',
                hobby: hobby || '',
                birthDay: bday || 0,
                birthMonth: bmonth || '',
                birthYear: byear || 0,
                picture: img || '',
                user: user.data
            })
        }).catch(err => console.log('profile get fuckd: ', err))
    }
    handleChange(val, val2){
        this.setState({[val2]: val})
    }
    cancelUpdates(){
        const {user} = this.state;
        let {first_name, last_name, gender, hair_color, eye_color,
            hobby, bday, bmonth, byear, img} = user[0];
        this.setState({
            firstName: first_name || '',
            firstNameTitle: first_name || '',
            lastName: last_name || '',
            lastNameTitle: last_name || '',
            gender: gender || '',
            hairColor: hair_color || '',
            eyeColor: eye_color || '',
            hobby: hobby || '',
            birthDay: bday || 0,
            birthMonth: bmonth || '',
            birthYear: byear || 0,
            picture: img || '',
        });
        this.props.history.push('/dash');
    }
    updateShmupdate(){
        const {firstName, lastName, gender, hairColor, eyeColor,
                hobby, birthDay, birthMonth, birthYear} = this.state;
       
        
        axios.put('/api/user/put', {firstName, lastName, gender, hairColor, eyeColor, hobby, birthDay, birthMonth, birthYear}).then(user => {
            let {first_name, last_name, gender, hair_color, eye_color, hobby, bday, bmonth, byear, img} = user.data[0];
        this.setState({
            firstName: first_name || '',
            firstNameTitle: first_name || '',
            lastName: last_name || '',
            lastNameTitle: last_name || '',
            gender: gender || '',
            hairColor: hair_color || '',
            eyeColor: eye_color || '',
            hobby: hobby || '',
            birthDay: bday || 0,
            birthMonth: bmonth || '',
            birthYear: byear || 0,
            picture: img || '',
            user: user.data
        })
        })
        this.props.history.push('/dash');
    }
    render(){
        return(
            <div>
                <Nav>{this.state.view}</Nav>
                <div className='pagebody'>
                <div className='dashcontent'>
                    <div className='profile_info'>
                        <div className='profileImgName'>
                            <img src={this.state.picture} className='profileImg' alt='img'/>
                            <div>
                                <h2>{this.state.firstNameTitle}</h2>
                                <h2>{this.state.lastNameTitle}</h2>
                            </div>
                        </div>
                        <div className='profileButtons'>
                            <button id='blackButton' className='searchButton' onClick={this.updateShmupdate}>Update</button>
                            <button id='greyButton' className='searchButton' onClick={this.cancelUpdates}>Cancel</button>
                        </div>
                    </div>
                    <div id='profileEdits' className='bottomContents'>
                        <div className='profEdits'>
                            <div className='profEditColumn'>
                                <p className='profileText'>First Name</p>
                                <input value={this.state.firstName} className='profileInput' onChange={(e) => this.handleChange(e.target.value, 'firstName')}/>
                                <p className='profileText'>Last Name</p>
                                <input value={this.state.lastName} className='profileInput' onChange={(e) => this.handleChange(e.target.value, 'lastName')}/>
                                <p className='profileText'>Gender</p>
                                <select value={this.state.gender} className='profileSelect' onChange={(e) => this.handleChange(e.target.value, 'gender')}>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                                <p className='profileText'>Hair Color</p>
                                <select value={this.state.hairColor} className='profileSelect' onChange={(e) => this.handleChange(e.target.value, 'hairColor')}>
                                    <option value='Brown'>Brown</option>
                                    <option value='Blue'>Blue</option>
                                    <option value='Green'>Green</option>
                                    <option value='Red'>Red</option>
                                    <option value='Blonde'>Blonde</option>
                                    <option value='White'>White</option>
                                </select>
                                <p className='profileText'>Eye Color</p>
                                <select value={this.state.eyeColor} className='profileSelect' onChange={(e) => this.handleChange(e.target.value, 'eyeColor')}>
                                    <option value='Brown'>Brown</option>
                                    <option value='Blue'>Blue</option>
                                    <option value='Green'>Green</option>
                                </select>
                            </div>
                            <div className='profEditColumn'>
                            <p className='profileText'>Hobby</p>
                                <select value={this.state.hobby} className='profileSelect' onChange={(e) => this.handleChange(e.target.value, 'hobby')}>
                                    <option value='Video Games'>Video Games</option>
                                    <option value='Hiking'>Hiking</option>
                                    <option value='Rafting'>Rafting</option>
                                    <option value='Fishing'>Fishing</option>
                                </select>
                            <p className='profileText'>Birth Day</p>
                                <select value={this.state.birthDay} className='profileSelect' onChange={(e) => this.handleChange(e.target.value, 'birthDay')}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                    <option value='8'>8</option>
                                    <option value='9'>9</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                    <option value='13'>13</option>
                                    <option value='14'>14</option>
                                    <option value='15'>15</option>
                                    <option value='16'>16</option>
                                    <option value='17'>17</option>
                                    <option value='18'>18</option>
                                    <option value='19'>19</option>
                                    <option value='20'>20</option>
                                    <option value='21'>21</option>
                                    <option value='22'>22</option>
                                    <option value='23'>23</option>
                                    <option value='24'>24</option>
                                    <option value='25'>25</option>
                                    <option value='26'>26</option>
                                    <option value='27'>27</option>
                                    <option value='28'>28</option>
                                    <option value='29'>29</option>
                                    <option value='30'>30</option>
                                    <option value='31'>31</option>
                                </select>
                            <p className='profileText'>Birth Month</p>
                                <select value={this.state.birthMonth} className='profileSelect' onChange={(e) => this.handleChange(e.target.value, 'birthMonth')}>
                                    <option value='Jan'>Jan</option>
                                    <option value='Feb'>Feb</option>
                                    <option value='Mar'>Mar</option>
                                    <option value='Apr'>Apr</option>
                                    <option value='May'>May</option>
                                    <option value='Jun'>Jun</option>
                                    <option value='Jul'>Jul</option>
                                    <option value='Aug'>Aug</option>
                                    <option value='Sep'>Sep</option>
                                    <option value='Oct'>Oct</option>
                                    <option value='Nov'>Nov</option>
                                    <option value='Dec'>Dec</option>
                                </select>
                            <p className='profileText'>Birth Year</p>
                                <select value={this.state.birthYear} className='profileSelect' onChange={(e) => this.handleChange(e.target.value, 'birthYear')}>
                                    <option value='2018'>2018</option>
                                    <option value='2017'>2017</option>
                                    <option value='2016'>2016</option>
                                    <option value='2015'>2015</option>
                                    <option value='2014'>2014</option>
                                    <option value='2013'>2013</option>
                                    <option value='2012'>2012</option>
                                    <option value='2011'>2011</option>
                                    <option value='2010'>2010</option>
                                    <option value='2009'>2009</option>
                                    <option value='2008'>2008</option>
                                    <option value='2007'>2007</option>
                                    <option value='2006'>2006</option>
                                    <option value='2005'>2005</option>
                                    <option value='2004'>2004</option>
                                    <option value='2003'>2003</option>
                                    <option value='2002'>2002</option>
                                    <option value='2001'>2001</option>
                                    <option value='2000'>2000</option>
                                    <option value='1999'>1999</option>
                                    <option value='1998'>1998</option>
                                    <option value='1997'>1997</option>
                                    <option value='1996'>1996</option>
                                    <option value='1995'>1995</option>
                                    <option value='1994'>1994</option>
                                    <option value='1993'>1993</option>
                                    <option value='1992'>1992</option>
                                    <option value='1991'>1991</option>
                                    <option value='1990'>1990</option>
                                    <option value='1989'>1989</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default connect(state => state, {getUser})(Profile);