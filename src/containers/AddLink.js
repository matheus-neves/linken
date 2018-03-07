import React, {Component} from 'react'
import { connect } from 'react-redux'
import Form from '../components/Form'
import { pouchPost } from '../utils';

const mapDispatchToProps = dispatch => {
  return {
    addLink: (link) => {
      dispatch(pouchPost(link)) 
    }
	}
}

export default connect(null, mapDispatchToProps)(Form)
