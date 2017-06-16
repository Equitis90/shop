class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let buttons = this.props.cart.count > 0 ?
      <div>
        <button className="btn btn-primary" onClick={this.props.openBasket}>{I18n.t('open_cart')}</button>
        <button className="btn btn-danger" onClick={this.props.deleteBasket}>{I18n.t('clear_cart')}</button>
      </div> :
      '';
    return (
    <div id="cart" className="thumbnail">
      <h3>{I18n.t('cart')}</h3>
      <h4>{I18n.t('item_count')} <b>{this.props.cart.count}</b></h4>
      <h4>{I18n.t('cart_sum')} ₴ <b>{toCurrency(this.props.cart.sum)}</b></h4>
      {buttons}
    </div>
    )
  }
}