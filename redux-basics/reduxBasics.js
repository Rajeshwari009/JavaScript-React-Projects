 import { configureStore } from "@reduxjs/toolkit";
//  configureStore= require('"@reduxjs/toolkit"')
const counterReducer = (state = {counter:0}, action) => {

    if(action.type==="increment"){
        return{
            counter: state.counter+5
        }
    }

    if(action.type==="decrement"){
        return{
            counter: state.counter-1
        }

    }
    return state

    }



const store = configureStore({
    reducer: {
        counter: counterReducer
    }
});


const counterSubscriber =()=>{
    const latestState = store.getState();
    console.log(latestState)
}
store.subscribe(counterSubscriber)

store.dispatch({type:"increment"});
store.dispatch({type:"decrement"})