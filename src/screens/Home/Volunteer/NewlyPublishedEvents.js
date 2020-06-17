import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import RsvpCard from 'src/screens/Rsvp/Card'
import { getRsvpListApi } from 'src/services/api'
import HorizontalScroller from 'src/screens/Home/HorizontalScroller'

class NewlyPublishedEvents extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      events: [],
      error: null
    }

    this.navigateToRsvpList = this.navigateToRsvpList.bind(this)
  }

  componentDidMount () {
    this.getRsvpList()
  }

  componentDidUpdate (prevProps) {
    const { lastUpdate: prevLastUpdate } = prevProps
    const { lastUpdate } = this.props
    if (prevLastUpdate !== lastUpdate) {
      this.getRsvpList()
    }
  }

  async getRsvpList () {
    const rsvpParams = new URLSearchParams()
    rsvpParams.append('j', 'other')
    rsvpParams.append('page', 1)
    this.setState({ isLoading: true, events: [], error: null })
    try {
      const response = await getRsvpListApi(rsvpParams)
      const { status } = response.data

      if (status === 'success') {
        const { data } = response.data
        const { data: events } = data
        this.setState({ isLoading: false, events })
      } else {
        // TODO: handle error
        this.setState({ isLoading: false })
      }
    } catch (error) {
      // TODO: handle error
      this.setState({ isLoading: false })
    }
  }

  navigateToRsvpList () {
    this.props.navigation.navigate('RsvpList')
  }

  render () {
    return (
      <HorizontalScroller
        title='Grup Request'
        onShowMore={this.navigateToRsvpList}
        isLoading={this.state.isLoading}
        data={this.state.events.slice(0, this.props.numberOfEvents)}
        renderItem={(item) => <RsvpCard {...item} width={220} />}
      />
    )
  }
}

export default withNavigation(NewlyPublishedEvents)
