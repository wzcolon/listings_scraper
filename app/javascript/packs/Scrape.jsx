import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'

export default class Scrape extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    scrapeType: PropTypes.string,
    date: PropTypes.string,
    onDelete: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      scrapeType: props.scrapeType,
      date: props.date
    }

    this.deleteHandler = this.deleteHandler.bind(this);
    this.showScrape = this.showScrape.bind(this);
    this.showScrapeSummary = this.showScrapeSummary.bind(this);
  }

  deleteHandler() {
    this.props.onDelete(this.props.id)
  }

  showScrape() {
    window.location.href = `/scrapes/${this.state.id}`
  }

  showScrapeSummary() {
    window.location.href = `/scrapes/${this.state.id}/summary`
  }

  render() {
    return(
      <tr>
        <td>{this.state.scrapeType}</td>
        <td>
          <Timestamp time={this.state.date} format='full' />
        </td>
        <td className="scrape-actions right-align">
          <a
            className="btn blue-grey lighten-1"
            onClick={this.showScrapeSummary}
          >
            Summary
          </a>
          <a
            className="btn blue lighten-1"
            onClick={this.showScrape}
          >
            View
          </a>
          <a
            className="waves-effect waves-light btn red lighten-1"
            onClick={this.deleteHandler}
          >
            Delete
          </a>
          <span />
        </td>
      </tr>
    )
  }
}
