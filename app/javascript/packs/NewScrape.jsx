import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class NewScrape extends React.Component {
  static propTypes = {
    onCreate: PropTypes.func,
    enabled: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      enabled: props.enabled
    }

    this.scrapeApartments = this.scrapeApartments.bind(this)
    this.scrapeCars = this.scrapeCars.bind(this)
    this.createScrape = this.createScrape.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({enabled: nextProps.enabled})
  }

  scrapeApartments() {
    this.createScrape('Apartments')
  }

  scrapeCars() {
    this.createScrape('Cars')
  }

  createScrape(scrapeType) {
    this.props.onCreate(scrapeType)
  }

  render() {
    let disabled = !this.state.enabled ? 'disabled' : ''

    return(
      <div className="relative" id="new-scrape-btn">
        <div className="fixed-action-btn horizontal absolute">
          <a className={"btn-floating btn-large " + disabled}>
            <i className="material-icons">add</i>
          </a>
          <ul>
            <li>
              <a
                className={"btn-floating red " + disabled}
                id="new-apartment-scrape"
                onClick={this.scrapeApartments}
              >
                <i className="material-icons">home</i>
              </a>
              Apartments
            </li>
            <li>
              <a
                className={"btn-floating blue " + disabled}
                id="new-car-scrape"
                onClick={this.scrapeCars}
              >
                <i className="material-icons">directions_car</i>
              </a>
              Cars
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
