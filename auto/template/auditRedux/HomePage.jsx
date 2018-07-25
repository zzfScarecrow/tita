import React from 'react'
import styles from './index.less'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { sagaTypes } from '../sagas/<$=tplName$>'
import { Table } from 'antd'

const HomePage = ({ dataSource, pagination, dispatch }) => {
  /* dispatch({
    type: sagaTypes.INIT
  }) */
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    }
  ]
  const listProps = {
    dataSource,
    pagination,
    columns,
    loading: !dataSource || dataSource.length === 0,
    onChange: pagination => {
      dispatch({
        type: sagaTypes.QUERY_LIST_DATA,
        payload: { status: 'foo', pagination }
      })
    }
  }
  return (
    <div className={styles.block}>
      <p className={styles.block_title}>This is HomePage</p>
      <p>
        Click to <Link to="/another">Another page</Link>
      </p>
      <Table {...listProps} />
    </div>
  )
}

export default connect(state => {
  const { data, list } = state.<$=tplName$>
  let dataSource = [
    {
      id: 398,
      name: '龙娟',
      key: 398
    },
    {
      id: 56,
      name: '郭超',
      key: 56
    },
    {
      id: 169,
      name: '傅敏',
      key: 169
    },
    {
      id: 279,
      name: '薛秀英',
      key: 279
    },
    {
      id: 367,
      name: '江艳',
      key: 367
    },
    {
      id: 325,
      name: '孙杰',
      key: 325
    },
    {
      id: 251,
      name: '谭秀兰',
      key: 251
    },
    {
      id: 428,
      name: '罗强',
      key: 428
    },
    {
      id: 182,
      name: '康芳',
      key: 182
    },
    {
      id: 16,
      name: '吕芳',
      key: 16
    }
  ]
  let pagination = {}
  try {
    dataSource = data.foo.foo_list
    pagination = list.foo.pagination
  } catch (error) {}
  return {
    dataSource,
    pagination
  }
})(HomePage)
