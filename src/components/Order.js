import React from 'react'
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

class Order extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }

  renderOrder = key => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const isAvailable = fish && fish.status === 'available'
    // Make sure the fish is loaded before we continue
    // 在我們繼續之前確保魚 load 完
    // 因為我地係向 firebase 比資料再從 firebase 拿番資料，所以中間會出現短時間 fish 係無依個野，所以上面的 fish.status 根本讀唔到，會造成 error
    if(!fish) return null

    if(!isAvailable){
      return (
      <CSSTransition classNames="order" key={key} timeout={{ enter:250, exit:250 }}>
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      </CSSTransition>
      )
    }
    return (
    <CSSTransition classNames="order" key={key} timeout={{ enter:250, exit:250 }}>
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
      </li>
    </CSSTransition>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order)

    const total = orderIds.reduce((prevTotal,key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === 'available'

      if(isAvailable) {
        return prevTotal + (count * fish.price)
      }
      return prevTotal
    }, 0)

    return (
    <div className="inventory">
      <h2>Order</h2>
      <TransitionGroup component="ul" className="order">
        {orderIds.map(this.renderOrder)}
      </TransitionGroup>
      <div className="total">
      Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>)
  }
}

export default Order
