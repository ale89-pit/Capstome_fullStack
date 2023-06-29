const initailState = {
    nome:[],
    cognome:[],
    userName:[],
    email:[],
    password:[]
}

const userReducer = (state = initailState,action)=>{
    switch(action.type){
        default:
            return state;
    }
}

export default userReducer;