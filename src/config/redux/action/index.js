import firebase, { database } from "../../firebase";

export const registerUserAPI = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });
  firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((success) =>
      dispatch({ type: "CHANGE_NOTIFICATION", value: "Register Successfully" })
    )
    .catch((error) =>
      dispatch({ type: "CHANGE_NOTIFICATION", value: error.message })
    )
    .finally(() => dispatch({ type: "CHANGE_ISLOADING", value: false }));
};

export const loginUserAPI = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: response.user });
        dispatch({
          type: "CHANGE_NOTIFICATION",
          value:
            "Login Successfully as " +
            response.user.email +
            " with id: " +
            response.user.uid,
        });
        resolve(response.user);
      })
      .catch((error) => {
        dispatch({ type: "CHANGE_NOTIFICATION", value: error.message });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      })
      .finally(() => dispatch({ type: "CHANGE_ISLOADING", value: false }));
  });

export const addDataToAPI =
  ({ userId, title, content, date }) =>
  (dispatch) => {
    database
      .ref("notes/" + userId)
      .push({
        title,
        content,
        date,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlNotes = database.ref("notes/" + userId);
  urlNotes.on("value", (snapshot) => {
    const noteData = snapshot.val();
    const data = Object.keys(noteData).map((key) => ({
      id: key,
      data: noteData[key],
    }));
    dispatch({ type: "CHANGE_NOTES", value: data });
  });
};

export const updateDataAPI = (data) => (dispatch) => 
new Promise((resolve, reject) => {
    const urlNotes = database.ref(`notes/${JSON.parse(localStorage.user).uid}/${data.id}`);
    urlNotes.set(data, (error) => {
        if (error) {
            reject(error)
        } else {
            resolve("Update Note Successfully")
        }
    })
})

export const deleteDataAPI = (data) => (dispatch) => 
new Promise((resolve, reject) => {
    const urlNotes = database.ref(`notes/${JSON.parse(localStorage.user).uid}/${data.id}`);
    urlNotes.remove() 
})
