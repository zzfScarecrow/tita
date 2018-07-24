import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, withRouter } from 'react-router-dom'
import App from './App'

const AppWithRouter = withRouter(App) // withRouter 的作用是将history,location,match 三个对象传给子组件
render(
  <Router>
    <AppWithRouter />
  </Router>,
  document.getElementById('app')
)
