import React from 'react'
import Header from'./Header'
import Inventory from'./Inventory'
import Order from'./Order'
import sampleFishes  from '../sample-fishes'
import Fish from './Fish'
import base from '../base'
import PropTypes from 'prop-types'

class App extends React.Component {

  state = {
    fishes: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object
  }

  // 當元件被寫入 DOM 之後觸發. 當初始化需要操作 DOM 元素就可以用這個方法
  componentDidMount() {
    const { params } = this.props.match
    // first reinstate our localstorage
    // 首先恢復我們的本地存儲
    // setitem 完未 getitem 囉
    const localStorageRef = localStorage.getItem(params.storeId)
    if(localStorageRef) {
      // JSON.parse: 將文本轉換為JavaScript對象
      this.setState({ order: JSON.parse(localStorageRef)})
    }
    // syncState：組件狀態和Firebase 端點的雙向數據綁定
    this.ref = base.syncState(`${params.storeId}/fishes`,{
      context: this,
      state: "fishes"
    })
  }

  // 當元件準備要被移除或破壞時觸發
  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  // 界面 load 完的時侯
  componentDidUpdate() {
    // 在 localStorage 存放資料，可以在 chrome 的 inspect 的 Application 的 Storage 的 local storage 查看
    // setItem function 入面第一個係 keys, 第二個係 value
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  addFish = fish => {
    // 1. take a copy of the exsiting state
    // 1. 獲取現有狀態的副本
    const fishes = { ...this.state.fishes }
    // 2. Add our new fish to that fishes variable
    // 2. 將我們的新魚添加到該魚類變量中
    fishes[`fish${Date.now()}`] = fish
    // 3. set the new fishes object to state
    // 3. 將新魚對象設置為state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes }
    // 2. Update that state
    fishes[key] = updatedFish
    // 3. Set that to state
    this.setState({ fishes })
  }

  delectFish = (key) => {
    // 1. take a copy of state
     const fishes = { ...this.state.fishes }
    // 2. update the state
    fishes[key] = null
    // 3, update state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    // 1. take a copy of state
    // 1. copy 一份副本
    const order = { ...this.state.order }
    // 2. Either add to the order, or update the number in our order
    // 2. 添加到訂單，或者按我們的訂單更新號碼
    order[key] = order[key] + 1 || 1
    // 3. Call setState to update our state
    // 3. 調用setState來更新我們的狀態
    this.setState({ order })
  }

  removeFromOrder = key => {
    // 1. take a copy of state
    // 1. copy 一份副本
    const order = { ...this.state.order }
    // 2. Remove that item from order
    delete order[key]
    // 3. Call setState to update our state
    // 3. 調用setState來更新我們的狀態
    this.setState({ order })
  }

  // Object.keys: array 會返回一組數字， object 會返回 value 數值并會順序
  // map() 方法會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes)
              .map(key => (
              <Fish key={key} 
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder} 
                index={key}
              /> 
              ))}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          removeFromOrder={this.removeFromOrder}
        />

        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish} 
          deleteFish={this.delectFish}
          loadSampleFishes={this.loadSampleFishes} 
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App
