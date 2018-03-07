import React, {Component} from 'react'
import { connect } from 'react-redux'
import LinkList from '../components/LinkList'
import {pouchSync} from '../utils'


const mapStateToProps = state => {
	return {links: state.links}
}

const mapDispatchToProps = dispatch => {
  return {
    sync: () => {
      dispatch(pouchSync()) 
    }
	}
}

const LinkWrapper = connect(mapStateToProps, mapDispatchToProps)(LinkList)
export default LinkWrapper