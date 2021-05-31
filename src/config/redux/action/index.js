import firebase from "../../firebase"

export const registerUserAPI = (data) => dispatch => {
    dispatch({type : "CHANGE_ISLOADING", value : true})
    firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((success) => 
    dispatch({ type : "CHANGE_NOTIFICATION", value : "Register Successfully"}))
    .catch((error) => dispatch({type: "CHANGE_NOTIFICATION", value : error.message}))
    .finally(() => dispatch({type : "CHANGE_ISLOADING", value : false})
    );
}

export const loginUserAPI = (data) => dispatch => 
new Promise((resolve, reject) => {
    dispatch({type : "CHANGE_ISLOADING", value : true})
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {
          dispatch({ type : "CHANGE_ISLOGIN", value : true});
          dispatch({ type : "CHANGE_USER", value : response.user.email});
          dispatch({ type : "CHANGE_NOTIFICATION", value : "Login Successfully as " + response.user.email + " with id: " + response.user.uid});
          resolve(response.user);
        })
        .catch((error) => {
            dispatch({ type : "CHANGE_NOTIFICATION", value : error.message })
            dispatch({ type : "CHANGE_ISLOGIN", value : false});
            reject(false)
        })
      .finally(() => dispatch({type : "CHANGE_ISLOADING", value : false}))})