class ShopElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order_mode: false,
      amount: '1'
    };

    this.toBasket = this.toBasket.bind(this);
    this.setOrderMode = this.setOrderMode.bind(this);
    this.unsetOrderMode = this.unsetOrderMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
  }

  keyPressHandler(evt) {
    if (evt.which < 48 || evt.which > 57)
    {
      evt.preventDefault();
    }
  }

  toBasket(action) {
    this.setState({order_mode: false});
    this.props.toBasket(action, this.state.amount);
  }

  setOrderMode() {
    this.setState({order_mode: true})
  }

  unsetOrderMode() {
    this.setState({order_mode: false})
  }

  handleChange(event) {
    this.setState({amount: event.target.value});
  }

  render() {
    let discount = this.props.item.discount === 0 ? '' : <div className="discount">{I18n.t('discount')}<br/> -{this.props.item.discount}%</div>;
    let price = this.props.item.discount === 0 ? <div className="right">₴{toCurrency(this.props.item.price)}</div> :
      <div className="right"><div className="discounted-price">₴{toCurrency(Math.round((this.props.item.price - (this.props.item.price * this.props.item.discount * 0.01)) * 100) / 100)}</div>(<div className="default-price">₴{toCurrency(this.props.item.price)}</div>)</div>;
    let button = this.state.order_mode ? <div className="order">
      <label>{I18n.t('amount')} <input onKeyPress={this.keyPressHandler} type="number" min="1" value={this.state.amount} pattern="[0-9]" onChange={this.handleChange}/></label>
      <button className="btn btn-primary" onClick={this.toBasket.bind(this, 'order')}>{I18n.t('order')}</button>
      <button className="btn btn-primary" onClick={this.toBasket.bind(this, 'add')}>{I18n.t('add_and_proceed')}</button>
      <button className="btn btn-danger" onClick={this.unsetOrderMode}>{I18n.t('cancel')}</button></div> :
      <button className="btn btn-primary" onClick={this.setOrderMode}>{I18n.t('to_cart')}</button>;
    return (
      <div className="thumbnail item">
        <div className="caption">
          {discount}
          <img src={this.props.item.image} alt="" height={220} width={320}/>
          <h4>{this.props.item.title}</h4>
          <h4 className="priceh"><div className="left">{I18n.t('price')} </div>{price}</h4>
          <p>{I18n.t('brand')} {this.props.item.vendor}</p>
          <p>{I18n.t('category')} {I18n.t(this.props.item.gender)}</p>
          {this.props.item.stock ? <p style={{color: 'green'}}>{I18n.t('instock')}</p> : <p style={{color: 'red'}}>{I18n.t('outofstock')}</p>}
          {this.props.item.original ? <p>{I18n.t('original')}</p> : <p>{I18n.t('license')}</p>}
          {button}
          <p className="description">{this.props.item.description}</p>
        </div>
      </div>
    )
  }
}