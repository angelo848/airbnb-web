import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Dimensions from 'react-dimensions'
import { Container, ButtonContainer } from './styles'
import MapGL from 'react-map-gl'
import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'

import api from '../../services/api'
import { logout } from '../../services/auth'

import Properties from './components/Properties'

import Button from './components/Button'

const TOKEN =
  'pk.eyJ1IjoiYW5nZWxvODQ4IiwiYSI6ImNrNHMydW0xajE1eXQzbGxhNWw3YngxazIifQ.bU4F53yGSN0MFdmD9ggNog'

class Map extends Component {
  constructor() {
    super()
    this.updatePropertiesLocalization = debounce(
      this.updatePropertiesLocalization,
      500
    )
  }

  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  }

  state = {
    viewport: {
      latitude: -10.857453,
      longitude: -37.082058,
      zoom: 12.8,
      bearing: 0,
      pitch: 0
    },
    properties: []
  }

  componentDidMount() {
    this.loadProperties()
  }

  updatePropertiesLocalization() {
    this.loadProperties()
  }

  loadProperties = async () => {
    const { latitude, longitude } = this.state.viewport
    try {
      const response = await api.get('/properties', {
        params: { latitude, longitude }
      })
      this.setState({ properties: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleLogout = e => {
    logout()
    this.props.history.push('/')
  }

  render() {
    const { containerWidth: width, containerHeight: height } = this.props
    const { properties } = this.state
    return (
      <MapGL
        width={width}
        height={height}
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => this.setState({ viewport })}
        onViewStateChange={this.updatePropertiesLocalization.bind(this)}
      >
        <Properties properties={properties} />
      </MapGL>
    )
  }
}

const DimensionedMap = Dimensions()(Map)
const App = () => (
  <Container>
    <DimensionedMap />
  </Container>
)

export default App
