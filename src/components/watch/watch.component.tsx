import { Component } from 'react'
import {WatchComponentProps} from "./watch.component.props.tsx";
import {WatchComponentState} from "./watch.component.state.tsx";

import './watch.component.css';

class WatchComponent extends Component<WatchComponentProps,  WatchComponentState> {
    time: string;
    name: string;
    hours: number;
    seconds: number;
    minutes: number;
    timezone: string;
    interval: undefined | number;

  constructor(props: WatchComponentProps) {
    super(props)
    this.name = this.props.data.name
    this.timezone = this.props.data.timezone
    this.time = new Date().toLocaleString('en-US', { timeZone: this.timezone })
    this.hours = new Date(this.time).getHours()
    this.minutes = new Date(this.time).getMinutes()
    this.seconds = new Date(this.time).getSeconds()
    this.interval = undefined
    this.state = {
      hh: this.hours * 30,
      mm: this.minutes * 6,
      ss: this.seconds * 6
    }
  }

  private runWatch = () => {
    this.interval = setInterval(() => {
      this.setState({
        ss: this.seconds * 6
      })
      this.seconds++
      if (this.seconds === 60) {
        this.setState({
          mm: this.minutes * 6
        })
        this.minutes++
        this.seconds = 0
      }
      if (this.minutes === 60) {
        this.setState({
          hh: this.hours * 30
        })
        this.hours++
        this.minutes = 0
      }
    }, 1000)
  }

  componentDidMount(): void {
    this.runWatch()
  }

  componentWillUnmount(): void {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className='watch'>
        <button className='watch-button' onClick={() => this.props.deleteAction(this.props.data)}>X</button>
        <div className='watch-name'>{this.name}</div>
        <div className="watch-time">
          <div className="watch-time_hour">
              <div
                className="hr"
                id="hr"
                style={
                  {transform: `rotate(${this.state.hh + (this.state.mm/12)}deg)`}
                  }>
              </div>
          </div>
          <div className="watch-time_min">
              <div
                className="mn"
                id="mn"
                style={
                  {transform: `rotate(${this.state.mm}deg)`}
                }>
              </div>
          </div>
          <div className="watch-time_sec">
              <div
                className="sc"
                id="sc"
                style={
                  {transform: `rotate(${this.state.ss}deg)`}
                  }>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WatchComponent
