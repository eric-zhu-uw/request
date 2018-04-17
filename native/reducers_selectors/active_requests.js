export default function(state = {}, action) {
  const { type } = action;
  switch (type) {
    case 'TMP_REPLACE':
      return { ...state };
    default:
      return state;
  }
}

export const selectors = (state = {}) => ({
  getActiveRequests: () => state
});
