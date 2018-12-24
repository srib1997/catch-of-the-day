import React from 'react'
import Header from'./Header'
import Inventory from'./Inventory'
import Order from'./Order'
import sampleFishes  from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map( 
            key => <Fish key={key} 
            details={this.state.fishes[key]} 
            addToOrder={this.addToOrder} 
            index={key} /> 
            )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} 
        order={this.state.order} />

        <Inventory addFish={this.addFish} 
        loadSampleFishes={this.loadSampleFishes} />
        
      </div>
    )
  }
}

export default App
