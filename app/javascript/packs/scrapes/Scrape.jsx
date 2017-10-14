import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import Alert from './Alert'

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
      scrapeType: props.scrapeType,
      date: props.date
    }

    this.deleteScrape = this.deleteScrape.bind(this);
    this.showScrape = this.showScrape.bind(this);
    this.showScrapeSummary = this.showScrapeSummary.bind(this);
  }

  deleteScrape(id) {
    this.props.onDelete(id)
    this.displayDeleteMsg()

    $.ajax({
      url: `/api/v1/scrapes/${id}`,
      method: 'delete',
      contentType: 'application/json',
    })
  }

  showScrape() {
    window.location.href = `/scrapes/${this.props.id}`
  }

  showScrapeSummary() {
    window.location.href = `/scrapes/${this.props.id}/summary`
  }

  displayDeleteMsg() {
    let deleteAlert = <Alert message='Successfully deleted scrape' />

    ReactDOM.render(
      deleteAlert, document.getElementById('message-container')
    )

    setTimeout(function(){
      ReactDOM.unmountComponentAtNode(document.getElementById('message-container'))
    }.bind(this), 1000);
  }

  render() {
    return(
      <tr>
        <td>{this.state.scrapeType}</td>
        <td>
          <Timestamp time={this.state.date} utc={false} format='full' />
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
            onClick={() => {this.deleteScrape(this.props.id)}}
          >
            Delete
          </a>
          <span />
        </td>
      </tr>
    )
  }
}
