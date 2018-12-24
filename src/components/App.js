import React from 'react'
import Header from'./Header'
import Inventory from'./Inventory'
import Order from'./Order'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  addFish = fish => {
    // 1. take a copy of the exsiting state
    const fishes = { ...this.state.fishes }
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish
    // 3. set the new fishes object to state
    this.setState({ fishes })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Inventory addFish={this.addFish} />
        <Order />
      </div>
    )
  }
}

export default App
