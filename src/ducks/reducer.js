// import axios from 'axios';

const initState = {
    user: [],
    firstName: '',
    lastName: '',
    gender: '',
    hairColor: '',
    eyeColor: '',
    hobby: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    allUsers: [],
    userFriends: [],
    paginatedUsers: [],
}

const USER = 'USER',
      FIRSTNAME = 'FIRSTNAME',
      LASTNAME = 'LASTNAME',
      GENDER = 'GENDER',
      HAIRCOLOR = 'HAIRCOLOR',
      EYECOLOR = 'EYECOLOR',
      HOBBY = 'HOBBY',
      BIRTHDAY = 'BIRTHDAY',
      BIRTHMONTH = 'BIRTHMONTH',
      BIRTHYEAR = 'BIRTHYEAR',
      ALLUSERS = 'ALLUSERS',
      USERFRIENDS = 'USERFRIENDS',
      PAGINATEDUSERS = 'PAGINATEDUSERS';

const reducer = (state = initState, action) => {
    const {payload} = action;
    switch (action.type) {
        case USER:
            return {...state, user:payload};
        case FIRSTNAME:
            return {...state, firstName:payload};
        case LASTNAME:
            return {...state, lastName:payload};
        case GENDER:
            return {...state, gender:payload};
        case HAIRCOLOR:
            return {...state, hairColor:payload};
        case EYECOLOR:
            return {...state, eyeColor:payload};
        case BIRTHDAY:
            return {...state, birthDay:payload};
        case BIRTHMONTH:
            return {...state, birthMonth:payload};
        case BIRTHYEAR:
            return {...state, birthYear:payload};
        case ALLUSERS:
            return {...state, allUsers:payload};
        case USERFRIENDS:
            return {...state, userFriends:payload};
        case PAGINATEDUSERS:
            return {...state, paginatedUsers:payload};
        default:
            return state
    }
}
export const getUser = (user) => {
    console.log('reducer getuser hit');
    return {
        type: USER,
        payload: user//axios.get('/api/auth/authenticated').then(res => {
 //          return res.data.id ? res.data : history.push('/');
 //       }).catch(err => console.log('reducer fuckup: ', err))
    }
}
export const updateFirstName = (firstName) => {
    console.log('reducer updatefn hit');
    return {
        type: FIRSTNAME,
        payload: firstName
    }
}
export const updateLastName = (lastName) => {
    console.log('reducer updateln hit');
    return {
        type: LASTNAME,
        payload: lastName
    }
}
export const updateGender = (gender) => {
    console.log('reducer updategender hit');
    return {
        type: GENDER,
        payload: gender
    }
}
export const updateHobby = (hobby) => {
    console.log('reducer hobby hit');
    return {
        type: HOBBY,
        payload: hobby
    }
}
export const updateHairColor = (hairColor) => {
    console.log('reducer hair hit');
    return {
        type: HAIRCOLOR,
        payload: hairColor
    }
}
export const updateEyeColor = (eyeColor) => {
    console.log('reducer eye hit');
    return {
        type: EYECOLOR,
        payload: eyeColor
    }
}
export const updateBirthDay = (birthDay) => {
    return {
        type: BIRTHDAY,
        payload: birthDay
    }
}
export const updateBirthMonth = (birthMonth) => {
    return {
        type: BIRTHMONTH,
        payload: birthMonth
    }
}
export const updateBirthYear = (birthYear) => {
    return {
        type: BIRTHYEAR,
        payload: birthYear
    }
}
export const getAllUsers = (allUsers) => {
    return {
        type: ALLUSERS,
        payload: allUsers
    }
}
export const getFriends = (userFriends) => {
    return {
        type: USERFRIENDS,
        payload: userFriends
    }
}
export const getPaginatedUSers = (paginatedUsers) => {
    return {
        type: PAGINATEDUSERS,
        payload: paginatedUsers
    }
}


export default reducer;