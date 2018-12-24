import React from 'react'

class AddFishForm extends React.Component {
  // 在 class 中聲明 或者在 constructor 中聲明 this.nameRef = React.createRef()
  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()

  createFish = (event) => {
    // 1. stop the form from submitting
    // 1. 停止提交表單
    // preventDefault(取消事件的默認動作)
    event.preventDefault()

    const fish = {
      name: this.nameRef.current.value, 
      // parseFloat(該函數指定字符串中的首個字符是否是數字。如果是，則對字符串進行解析，直到到達數字的末端為止，然後以數字返回該數字，而不是作為字符串。)
      price: parseFloat(this.priceRef.current.value), 
      status: this.statusRef.current.value, 
      desc: this.descRef.current.value, 
      image: this.imageRef.current.value
    }
    this.props.addFish(fish)
    // refresh the form 
    // 刷新表單
    event.currentTarget.reset()
  }
  
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" /> {/* 在render函數中 ref={this.nameRef} */}
        <input name="price" ref={this.priceRef} type="text" placeholder="Price" />{/* 輸入框的內容 = placeholder */}
        <select name="status" ref={this.statusRef} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea name="desc" ref={this.descRef} type="text" placeholder="Desc" />
        <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm
