import React, {Component} from 'react'
import ListLinks from '../containers/SyncLinks'
import AddLink from '../containers/AddLink'
import PropTypes from 'prop-types'

const App = () => (
  <div>
    <AddLink />
    <ListLinks />
  </div>
)

export default App