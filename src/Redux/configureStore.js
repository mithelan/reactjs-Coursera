import {createStore} from "redux";
import {Reducer,intialState} from "./reducers";


export const ConfigureStore=()=>{

    const store=createStore(

        Reducer,
        intialState
    )

    return store;
}
