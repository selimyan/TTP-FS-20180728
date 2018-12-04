import React, { Component } from "react"
import axios from 'axios'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Routes from './Routes'
import Portfolio from './components/Portfolio'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      error: ''
    }
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('api/auth/me')
      this.setState({
        user: data,
        error: ''
      })
    } catch (error) {
      console.log('Error getting the user', error)
    }
  }

  async login(user) {
    try {
      const { data } = await axios.post('api/auth/login', user)
      if (data.error) this.setState({ error: data.error })
      else this.setState({ user: data, error: '' })
    } catch (error) {
      console.log('Error loggin in the user', error)
    }
  }

  async register(user) {
    try {
      const { data } = await axios.post('api/auth/signup', user)
      if (data.error) this.setState({ error: data.error })
      else this.setState({ user: data, error: '' })
    } catch (error) {
      console.log('Error registering the user', error)
    }
  }

  async logout() {
    try {
      await axios.post('api/auth/logout')
      this.setState({ user: {} })
    } catch (error) {
      console.log('Error loggin out the user', error)
    }
  }

  render() {
    const { user, error } = this.state
    return (
      <div>
        {
          user.id ?
            <div>
              <Navbar name={user.name} logout={this.logout} />
              <Routes user={user} />
            </div>
            :
            <div>
              <Login
                error={error}
                login={this.login}
                register={this.register}
              />
            </div>
        }
      </div>
    )
  }
}