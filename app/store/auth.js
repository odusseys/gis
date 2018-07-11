export default (
  state = { phoneNumber: null, token: null, name: null },
  action,
) => {
  switch (action.type) {
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.phoneNumber };
    case 'SET_NAME':
      return { ...state, name: action.name };
    case 'LOGIN':
      return { ...state, token: action.token, name: action.name };
    default:
      return state;
  }
};
