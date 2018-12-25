import React from 'react'
import { getFunName }from '../helpers'
import PropTypes from 'prop-types'

class StorePicker extends React.Component {

  myInput = React.createRef()

  static propTypes = {
    history: PropTypes.object
  }

  goToStore = event => {
    // 1. stop the form from submitting
    // 1. 停止提交表單
    // preventDefault(取消事件的默認動作)
    event.preventDefault()
    // 2. get the text from that input
    // 2. 從該輸入中獲取文本
    console.log(this)
    const storeName = this.myInput.current.value
    // 3. change the page to /store/whatever-they-entered
    // 3. 將頁面更改為 /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore} >
        <h2>Please Enter A store</h2>
        <input type="text" 
          ref={this.myInput}
          required 
          placeholder="Store Name" 
          defaultValue={getFunName()} 
        />
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

export default StorePicker
