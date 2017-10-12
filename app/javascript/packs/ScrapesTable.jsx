import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import NewScrape from './NewScrape'
import Scrape from './Scrape'
import update from 'react-addons-update'
import Alert from './Alert'
import ProgressIndicator from './ProgressIndicator'

export default class ScrapesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrapes: [],
      newButtonsEnabled: true
    }

    this.deleteHandler = this.deleteHandler.bind(this);
    this.createHandler = this.createHandler.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/api/v1/scrapes/',
      contentType: 'application/json',
      success: (response) => {
        this.setState({
          scrapes: response.scrapes.map(scrape => (
            this.buildScrape(scrape)
          )
        )})
      }
    })
  }

  buildScrape(scrape) {
    return (
      <Scrape
        key={scrape.id}
        id={scrape.id}
        scrapeType={scrape.scrape_type}
        date={scrape.created_at}
        onDelete={this.deleteHandler}
      />
    )
  }

  createHandler(scrapeType) {
    let data = JSON.stringify({scrape_type: scrapeType})
    let scrapes = this.state.scrapes;
    let createAlert = this.displayCreateMessage

    //diable new buttons
    this.setState({newButtonsEnabled: false})

    $.ajax({
      url: '/api/v1/scrapes/',
      method: 'POST',
      data: data,
      contentType: 'application/json',
      success: (response) => {
        this.displayCreateMsg()
        scrapes.unshift(this.buildScrape(response))
        this.setState({
          scrapes: scrapes,
          newButtonsEnabled: true
        })
      }
    })
  }

  deleteHandler(id) {
    let scrapes = this.state.scrapes
    let index = scrapes.map(function(scrape) {
      return scrape.props.id;
    }).indexOf(id);
    scrapes.splice(index, 1);

    this.setState({
      scrapes: scrapes
    })

    $.ajax({
      url: `/api/v1/scrapes/${id}`,
      method: 'delete',
      contentType: 'application/json',
      success: (response) => {
        this.displayDeleteMsg()
      }
    })
  }

  displayDeleteMsg() {
    let deleteAlert = <Alert message='Successfully deleted scrape' />
    this.setState({alert: deleteAlert})

    ReactDOM.render(
      deleteAlert, document.getElementById('message-container')
    )

    setTimeout(function(){
      ReactDOM.unmountComponentAtNode(document.getElementById('message-container'))
    }.bind(this), 1000);
  }

  displayCreateMsg() {
    let createAlert = <Alert message='Successfully created scrape' />
    this.setState({alert: createAlert})

    ReactDOM.render(
      createAlert, document.getElementById('message-container')
    )

    setTimeout(function(){
      ReactDOM.unmountComponentAtNode(document.getElementById('message-container'))
    }.bind(this), 1000);
  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="col s6">
            <ProgressIndicator
              visible={!this.state.newButtonsEnabled}
            />
          </div>
          <NewScrape
            onCreate={this.createHandler}
            enabled={this.state.newButtonsEnabled}
          />
        </div>
        <table className="bordered" id="scrapes-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Created At</th>
              <th className="right-align">Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.state.scrapes }
          </tbody>
        </table>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ScrapesTable />, document.getElementById('scrapes-table')
  )
})
