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
    case 'ADD_LINK':
      return {
        links: [
          ...state.links,
          {
            _id: action.link.id,
            _rev: action.link.rev,
            title: action.link.title,
            description: action.link.description,
            url: action.link.url
          }
        ]
      }
    default:
      return state
  }
}

export default links
