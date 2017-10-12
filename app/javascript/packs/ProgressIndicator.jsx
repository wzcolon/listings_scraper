import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class ProgressIndicator extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible})
  }

  render() {
    let display = this.state.visible ? '' : 'hidden'
    return(
      <div className={"progress " + display}>
        <div className="indeterminate"></div>
      </div>
    )
  }
}
