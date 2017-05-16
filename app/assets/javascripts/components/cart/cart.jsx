class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let buttons = this.props.cart.count > 0 ?
      <div>
        <button className="btn btn-primary" onClick={this.props.openBasket}> Просмотреть корзину </button>
        <button className="btn btn-danger" onClick={this.props.deleteBasket}> Очистить корзину </button>
      </div> :
      '';
    return (
    <div id="cart" className="thumbnail">
      <h3>Корзина</h3>
      <h4>Товаров: <b>{this.props.cart.count}</b></h4>
      <h4>На сумму: ₴ <b>{parseFloat(this.props.cart.sum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</b></h4>
      {buttons}
    </div>
    )
  }
}