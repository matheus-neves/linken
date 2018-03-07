const initialState = {
  links: []
}

const links = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_LINKS':
      return {
        ...state,
        links: action.links.map(link => link.doc)
      }
    default:
      return state
  }
}

export default links
