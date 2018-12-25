import React from 'react'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import PropTypes from 'prop-types'
import Login from './Login'
// 因為 base 係 export default 所以唔洗 { base }
import base, { firebaseApp } from '../base'
import firebase from 'firebase'

class Inventory extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    updateFish: PropTypes.func
  }

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user})
      }
    })
  }

  authHandler = async authData =>  {
    // 1. Look up the current store in the firebase database
    // 1. 在firebase數據庫中查找當前商店
    const store = await base.fetch(this.props.storeId, { context: this })
    console.log(store)
    // 2. Claim it if there is no owner
    // 2. 如果沒有所有者則聲明它
    if(!store.owner) {
      // save it as our own
      // 將它保存為我們自己的
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. Set the state of the inventory component to reflect the current user
    // 3. 設置庫存組件的狀態以反映當前用戶
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
    console.log(authData)
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  logout = async () => {
    console.log('Logging out!')
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render() {
    const logout = <button onClick={this.logout} >Log Out!</button>

    // 1. check if they are logged in
    // 1. 檢查他們是否已登錄
    if (!this.state.uid) {
    return <Login authenticate={this.authenticate}/>
    }

    // 2. check if they are not the owner of the store
    // 2. 檢查他們是否不是商店的所有者
    if(this.state.uid !== this.state.owner) {
      return (
      <div>
        <p>sorry you are not the owner</p>
        {logout}
      </div>
    )}

    // 3. they must be the owner, just render the inventory
    // 3. 他們必須是所有者，只需渲染庫存
    return (
    <div className="inventory">
      <h2>Inventory</h2>
      {logout}
      { Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish}/> )} 
      <AddFishForm addFish={this.props.addFish} />
      <button onClick={this.props.loadSampleFishes} >Load Sample Fishes</button>
    </div>
    )
  }
}
// 清單
export default Inventory
