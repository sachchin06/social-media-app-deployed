const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});


// make this Follow, UnFollow as another Action ex: UserAction
const Follow = (userId)=> ({
    type: "FOLLOW",
    payload: userId,
})

const UnFollow = (userId)=> ({
    type: "UnFOLLOW",
    payload: userId,
})


export {
    LoginStart,
    LoginSuccess,
    LoginFailure,
    Follow,
    UnFollow
  }
