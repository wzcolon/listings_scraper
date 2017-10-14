import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import NewScrape from './scrapes/NewScrape'
import ScrapesTable from './scrapes/ScrapesTable'
import Scrape from './scrapes/Scrape'
import ProgressIndicator from './scrapes/ProgressIndicator'

export default class ScrapeIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrapes: [],
      progressIndicatorVisible: false
    }

    this.addScrape = this.addScrape.bind(this)
    this.removeScrape = this.removeScrape.bind(this)
    this.toggleProgressIndicator = this.toggleProgressIndicator.bind(this)
  }

  componentDidMount() {
    $.ajax({
      url: '/api/v1/scrapes/',
      method: 'GET',
      contentType: 'application/json',
      success: (response) => {
        this.setState({
          scrapes: response.scrapes.map(scrape => (
            this.buildScrape(scrape)
          )
        )}
      )}
    })
  }

  buildScrape(scrape) {
    return (
      <Scrape
        key={scrape.id}
        id={scrape.id}
        scrapeType={scrape.scrape_type}
        date={scrape.created_at}
        onDelete={this.removeScrape}
      />
    )
  }

  addScrape(scrape) {
    let scrapes = this.state.scrapes

    scrapes.unshift(this.buildScrape(scrape))

    this.setState({scrapes: scrapes})
  }

  removeScrape(scrape_id) {
    let scrapes = this.state.scrapes
    let index = scrapes.map(function(scrape) {
      return scrape.props.id
    }).indexOf(scrape_id)

    scrapes.splice(index,1);

    this.setState({scrapes: scrapes})
  }

  toggleProgressIndicator() {
    let currentState = this.state.progressIndicatorVisible

    this.setState({
      progressIndicatorVisible: !currentState
    })
  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="col s6">
            <ProgressIndicator
              visible={this.state.progressIndicatorVisible}
            />
          </div>
          <NewScrape
            toggleProgressBar={this.toggleProgressIndicator}
            onCreate={this.addScrape}
          />
        </div>
        <ScrapesTable scrapes={this.state.scrapes} />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ScrapeIndex />, document.getElementById('scrapes-table')
  )
})
