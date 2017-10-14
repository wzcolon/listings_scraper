import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Alert from './Alert'

export default class NewScrape extends React.Component {
  static propTypes = {
    toggleProgressBar: PropTypes.func,
    onCreate: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      buttonsEnabled: true,
    }

    this.createScrape = this.createScrape.bind(this);
  }

  createScrape(scrapeType) {
    let data = JSON.stringify({scrape_type: scrapeType})
    this.setState({buttonsEnabled: false})
    this.props.toggleProgressBar()

    $.ajax({
      url: '/api/v1/scrapes/',
      method: 'POST',
      data: data,
      contentType: 'application/json',
      success: (response) => {
        this.props.toggleProgressBar()
        this.props.onCreate(response)
        this.displayCreateMsg()
        this.setState({
          buttonsEnabled: true
        })
      }
    })
  }

  displayCreateMsg() {
    let createAlert = <Alert message='Successfully created scrape' />

    ReactDOM.render(
      createAlert, document.getElementById('message-container')
    )

    setTimeout(function(){
      ReactDOM.unmountComponentAtNode(document.getElementById('message-container'))
    }.bind(this), 1000);
  }

  render() {
    let disabled = !this.state.buttonsEnabled ? 'disabled' : ''

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
                onClick={() => this.createScrape('Apartments')}
              >
                <i className="material-icons">home</i>
              </a>
              Apartments
            </li>
            <li>
              <a
                className={"btn-floating blue " + disabled}
                id="new-car-scrape"
                onClick={() => this.createScrape('Cars')}
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
