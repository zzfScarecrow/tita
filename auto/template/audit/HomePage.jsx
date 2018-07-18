import React from 'react'
import styles from './index.less'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.block}>
        <p className={styles.block_title}>This is HomePage</p>
        <p>
          Click to <Link to="/another">Another page</Link>
        </p>
      </div>
    )
  }
}

export default HomePage
