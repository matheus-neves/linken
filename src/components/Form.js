import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Form extends Component {

  constructor(props) {
    super(props)
  }

  handleSubmit(e) {
    e.preventDefault()

    this.props.addLink({
      title: this.title.value,
      description: this.description.value,
      url: this.description.value
    })

  }


  render() {

    return (

      <form className="AddLink" onSubmit={ e => this.handleSubmit(e)}>

        <input type="text" id="title" placeholder="Título" ref={ node => this.title = node }/>
 
        <input type="text" id="description" placeholder="Descrição" ref={ node => this.description = node } />

        <input type="text" id="url" placeholder="Url" ref={ node => this.url = node } />  

        <button type="submit">add</button>
      </form>

    )

  }

}

Form.propTypes = {
  addLink: PropTypes.func.isRequired
}


export default Form
