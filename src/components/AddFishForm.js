import React from 'react'

class AddFishForm extends React.Component {
  render() {
    return (
      <form>
        <input name="name" type="text" placeholder="Uame" />
        <input name="price" type="text" placeholder="Price" />
        <input name="status" type="text" placeholder="Status" />
        <input name="desc" type="text" placeholder="Desc" />
        <input name="image" type="text" placeholder="Image" />
      </form>
    )
  }
}

export default AddFishForm