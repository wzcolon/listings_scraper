import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class ScrapesTable extends React.Component {
  static propTypes = {
    scrapes: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      scrapes: props.scrapes,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({scrapes: nextProps.scrapes})
  }

  render() {
    return(
      <table className="bordered" id="scrapes-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Created At</th>
            <th className="right-align">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.scrapes}
        </tbody>
      </table>
    )
  }
}

