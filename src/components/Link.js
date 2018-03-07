import React from 'react'
import PropTypes from 'prop-types'

const Link = ({title, description, url}) => (

  <li className="link">
    <img className="link__thumb" />
    <h2 className="link__title">{title}</h2>
    <p className="link__description"> {description} </p>
    <a className="link__url" target="_blank" > {url} </a>
  </li>

)

Link.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default Link
