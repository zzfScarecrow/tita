import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.less'

const AnotherPage = () => {
  return (
    <div className={styles.block}>
      <p className={styles.block_title}>This is AnotherPage</p>
      <p>
        Click to <Link to="/">Home page</Link>
      </p>
    </div>
  )
}

export default AnotherPage
