export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_INTEREST":
      return { ...state, [action.eventId]: true };
    case "REMOVE_INTEREST":
      return { ...state, [action.eventId]: undefined };
    default:
      return state;
  }
};
