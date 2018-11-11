const React = require('react')
class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000)
    console.log("start")
  }
  stopTimer() {
    clearInterval(this.timer)
    console.log("stop")
  }
  resetTimer() {
    this.setState({time: 0})
    console.log("reset")
  }
  render() {
     return (
       <div>
         <h3>timer: {this.state.time}</h3>
         <button onClick={this.startTimer}>start</button>
         <button onClick={this.stopTimer}>stop</button>
       </div>
     );
  }
}
module.exports = Timer