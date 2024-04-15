
// based on this it is implemented : https://medium.com/how-to-react/how-to-setup-redux-in-nextjs-5bce0d82b8de

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";

// import {  persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// const persistConfig = {
//     key:'root',
//     storage,
//     stateReConciler : autoMergeLevel2
//   };
// const persistedReducer = persistReducer(persistConfig , rootReducer);

const initialState = {};
const middleware = [thunk];

export const store = createStore(
    // persistedReducer,
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    // compose(
    //     applyMiddleware(...middleware),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

// export default store;

// let envMode = process && process.env && process.env.NODE_ENV ? process.env.NODE_ENV : '';
// let envMode = 'Testing';
// // let envMode = 'Development';

// if (envMode === "Testing" || envMode === "production") {
//     store = createStore(
//         rootReducer,
//         initialState,
//         compose(
//             applyMiddleware(...middleware)
//         )
//     );
// } else {
//     store = createStore(
//         rootReducer,
//         initialState,
//         compose(
//             applyMiddleware(...middleware),
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//         )
//     );
// }