const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "FOLLOW":
      return {

        ...state,
        user: {
          ...state.user, 
          following:[...state.user.following ,action.payload]   //correcttion
        }
      };
      case "UnFOLLOW":
      return ({
        ...state,
        user: {
          ...state.user, 
          following: state.user.following.filter(item => item !== action.payload)   //correcttion
        
        }
      });
      default:  return null
  }

  
  
};

export default AuthReducer;
