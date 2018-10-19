const DEFAULT_STATE = {
  contacts: {
    asked: false,
    agreed: false,
  },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'ACCEPT_CONTACTS_PERMISSION':
      return { ...state, contacts: { asked: true, agreed: true } };
    case 'DECLINE_CONTACTS_PERMISSION':
      return { ...state, contacts: { asked: true, agreed: false } };
    case 'LOGOUT':
      return DEFAULT_STATE;
    default:
      return state;
  }
};
