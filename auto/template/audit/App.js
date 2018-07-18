import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link, Switch } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import BreadCrumb from 'components/BreadCrumb'
import { Index, AnotherPage } from './Pages/index.js'

const App = props => {
  const { location } = props
  return (
    <LocaleProvider locale={zhCN}>
      <div id="locator" style={{ position: 'relative' }}>
        <BreadCrumb />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/another" component={AnotherPage} />
        </Switch>
      </div>
    </LocaleProvider>
  )
}

App.propTypes = {
  location: PropTypes.object
}
App.defaultProps = {
  location: {}
}

export default App
