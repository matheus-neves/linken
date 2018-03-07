import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from './Link'


class LinkList extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.sync()
  }


  render() {

    return (
      <ul>
        {
          this.props.links.map((link, index) => {
            return <Link key={link._id} {...link} />
          })
        }
      </ul>

    )

  }


}


// LinkList.propTypes = {
//   links: PropTypes.arrayOf(PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired
//   }).isRequired).isRequired
// }

export default LinkList
