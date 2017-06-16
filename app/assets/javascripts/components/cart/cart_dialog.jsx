class CartDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isButtonDisable: true,
      phone: ''
    };

    this.deleteFromBasket = this.deleteFromBasket.bind(this);
    this.buttonCheck = this.buttonCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.order = this.order.bind(this);
  }

  order(phone) {
    this.props.order(phone)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  componentDidUpdate() {
    this.buttonCheck()
  }

  buttonCheck() {
    let state = this.state;
    let buttonDisable = true;
    if (state.phone !== undefined &&
      state.phone !== "" && state.phone.length >= 10
    ) {
      buttonDisable = false
    }
    if (buttonDisable !== state.isButtonDisable) {
      this.setState({
        isButtonDisable: buttonDisable
      })
    }
  }

  deleteFromBasket(id) {
    this.props.deleteFromBasket(id)
  }

  render() {
    let items = [];
    let _this = this;
    $.each(this.props.cart.items, function(id, item) {
      let title = '';
      let price = '';
      let count = '';
      let sum = '';

      $.map(item, (k, v) => {
        switch (v.toString()) {
          case 'title':
            title = k;
            break;
          case 'price':
            price = k;
            break;
          case 'count':
            count = k;
            break;
          case 'sum':
            sum = k;
            break;
        }
      });
      items.push({id: id, title: title, price: price, count: count, sum: sum})
    });

    items = $.map(items, function(item) {
      return (
        <div className="row thumbnail" key={item.id}>
          <div className="col-sm-2 col-md-2 col-lg-2">
            <b>{item.title}</b>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2">
            <b>{I18n.t('price')} ₴ {toCurrency(item.price)}</b>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2">
            <b>{I18n.t('amount')} {item.count}</b>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3">
            <b>{I18n.t('sum')} ₴ {toCurrency(item.sum)}</b>
          </div>
          <div className="button-td col-sm-3 col-md-3 col-lg-3">
            <button className="btn btn-danger" onClick={_this.deleteFromBasket.bind(this, item.id)}>{I18n.t('delete_from_cart')}</button>
          </div>
        </div>
      )
    });

    return (
    <div className="container" id="cart-dialog">
      {items}
      <div className="row thumbnail summary">
        <div className="col-sm-2 col-md-2 col-lg-2">&nbsp;</div>
        <div className="col-sm-2 col-md-2 col-lg-2"><b>{I18n.t('summary')}</b></div>
        <div className="col-sm-2 col-md-2 col-lg-2"><b>{I18n.t('amount')} {this.props.cart.count}</b></div>
        <div className="col-sm-3 col-md-3 col-lg-3">
          <b>{I18n.t('sum')} ₴ {toCurrency(this.props.cart.sum)}</b>
        </div>
      </div>
      <div className="row buttons">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <label>{I18n.t('phone_number')} <input name="phone" ref="phone" value={this.state.phone} onChange={this.handleChange}/></label>
          &nbsp;
          <button className="btn btn-primary" disabled={this.state.isButtonDisable} onClick={this.order.bind(this, this.state.phone)}>{I18n.t('create_order')}</button>
        </div>
      </div>
      <div className="row buttons">
        <button className="btn btn-default" onClick={this.props.closeBasket}>{I18n.t('close_cart')}</button>
      </div>
    </div>

    )
  }
}