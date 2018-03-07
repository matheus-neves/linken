import React, {Component} from 'react'
import { connect } from 'react-redux'
import LinkList from '../components/LinkList'
import {syncLinks} from '../utils'


const mapStateToProps = state => {
	return {links: state.links}
}

const mapDispatchToProps = dispatch => {
  return {
    sync: () => {
      dispatch(syncLinks()) 
    }
	}
}

const LinkWrapper = connect(mapStateToProps, mapDispatchToProps)(LinkList)
export default LinkWrapper