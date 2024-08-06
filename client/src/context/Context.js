import {createContext,useEffect,useReducer} from 'react';
import Reducer from './Reducer';
const INTITAL_STATE={
    user:JSON.parse(localStorage.getItem("user"))||null,
    isFetching:false,
    error:false,
};
export const Context=createContext(INTITAL_STATE);

export const ContextProvider=({children})=>{
    const [state,dispatch]=useReducer(Reducer,INTITAL_STATE);
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));
    },[state.user]);
    return (
        <Context.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
            }}
        >
            {children}
        </Context.Provider>
    )
}