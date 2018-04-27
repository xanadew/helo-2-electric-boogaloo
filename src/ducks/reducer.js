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
        case USER + '_FULFILLED':
            return {...state, user:payload};
        case FIRSTNAME + '_FULFILLED':
            return {...state, firstName:payload};
        case LASTNAME + '_FULFILLED':
            return {...state, lastName:payload};
        case GENDER + '_FULFILLED':
            return {...state, gender:payload};
        case HAIRCOLOR + '_FULFILLED':
            return {...state, hairColor:payload};
        case EYECOLOR + '_FULFILLED':
            return {...state, eyeColor:payload};
        case BIRTHDAY + '_FULFILLED':
            return {...state, birthDay:payload};
        case BIRTHMONTH + '_FULFILLED':
            return {...state, birthMonth:payload};
        case BIRTHYEAR + '_FULFILLED':
            return {...state, birthYear:payload};
        case ALLUSERS + '_FULFILLED':
            return {...state, allUsers:payload};
        case USERFRIENDS + '_FULFILLED':
            return {...state, userFriends:payload};
        case PAGINATEDUSERS + '_FULFILLED':
            return {...state, paginatedUsers:payload};
        default:
            return state
    }
}
export const getUser = (history) => {
    return {
        type: USER,
        payload: axios.get('/api/auth/authenticated').then(res => {
            res.data.id ? res.data : history.push('/');
        })
    }
}
export const updateFirstName = (firstName) => {
    return {
        type: FIRSTNAME,
        payload: firstName
    }
}
export const updateLastName = (lastName) => {
    return {
        type: LASTNAME,
        payload: lastName
    }
}
export const updateGender = (gender) => {
    return {
        type: GENDER,
        payload: gender
    }
}
export const updateHobby = (hobby) => {
    return {
        type: HOBBY,
        payload: hobby
    }
}
export const updateHairColor = (hairColor) => {
    return {
        type: HAIRCOLOR,
        payload: hairColor
    }
}
export const updateEyeColor = (eyeColor) => {
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