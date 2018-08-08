import React from 'react'
import { connect } from 'react-redux'
import '../App.css'

class Notification extends React.Component {
  render() {
    const { notification } = this.props
    const visibility = { display: notification.visibility ? '' : 'none' }
    return (
      <div style={visibility}>
        <div className={ notification.style }>
          { notification.content }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
