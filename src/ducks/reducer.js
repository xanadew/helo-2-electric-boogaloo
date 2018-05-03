import axios from 'axios';

const initState = {
    user: [],
    friends: []
}

const GET_USER = 'GET_USER',
      GET_FRIENDS = 'GET_FRIENDS';

const reducer = (state = initState, action) => {
    const {payload} = action;
    console.log('action.type: ', action.type);
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            console.log('case getuser hit');
            return {...state, user:payload};
        case GET_FRIENDS + '_FULFILLED':
            return {...state, friends:payload};
        default:
            return state
    }
}
export const getUser = (history) => {
    console.log('reducer getuser hit');
    return {
        type: GET_USER,
        payload: axios.get('/api/user').then(res => {
            console.log('reducer res.data: ', res.data);
           if(res.data[0].id !== 0){
               return res.data}
        //    } else {
        //        history.push('/')
        //    }
        }).catch(err => console.log('reducer fuckup: ', err))
    }
}
export const getFriends = () => {
    console.log('reducer getFriends hit');
    return {
        type: GET_FRIENDS,
        payload: axios.get('/api/friend/list').then(res => res.data)
    }
}



export default reducer;