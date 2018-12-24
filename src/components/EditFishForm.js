import React from 'react'

class EditFishForm extends React.Component {
  handleChange = event => {
    console.log(event.currentTarget.value)
    // update that fish
    // 1. Take a copy of the curernt fish
    // 更新那條魚
    // 1. copy 當前 fish 的副本
    const updatedFish = { 
      ...this.props.fish, 
      [event.currentTarget.name]: event.currentTarget.value 
    }
    this.props.updateFish(this.props.index, updatedFish)
  }

  render() {
    return (
      <div className="fish-edit">
      <input name="name" type="text" onChange={this.handleChange} value={this.props.fish.name} /> 
      <input name="price" type="text" onChange={this.handleChange} value={this.props.fish.price} />
      <select name="status" type="text" onChange={this.handleChange} value={this.props.fish.status} > 
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
      <input name="image" onChange={this.handleChange} type="text" value={this.props.fish.image} />
      </div>
    )
  }
}

export default EditFishForm
