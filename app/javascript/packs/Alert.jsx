import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Alert extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    message: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      className: this.findClassName(this.props.type),
      message: props.message,
      visible: true
    }
  }

  findClassName(type) {
    let classes = {
      alert: 'red',
      success: 'green'
    }

    return classes[type] || classes.success
  }

  render() {
    return(
        this.state.visible
        ? <div className={"card-panel lighten-2 center-align " + this.state.className} >
            {this.state.message}
          </div>
        : <span />
    )
  }
}
