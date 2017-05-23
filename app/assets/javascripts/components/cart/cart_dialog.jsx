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
        <tr key={item.id}>
          <td>
            <b>{item.title}</b>
          </td>
          <td>
            <b>₴ {toCurrency(item.price)}</b>
          </td>
          <td>
            <b>{item.count}</b>
          </td>
          <td>
            <b>₴ {toCurrency(item.sum)}</b>
          </td>
          <td className="button-td">
            <button className="btn btn-danger" onClick={_this.deleteFromBasket.bind(this, item.id)}>Удалить из корзины</button>
          </td>
        </tr>
      )
    });

    return (
    <div className="container" id="cart-dialog">
      <div className="row">
        <div className="col-sm-12 col-lg-12 col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th>Название</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {items}
              <tr className="success">
                <td>&nbsp;</td>
                <td><b>Итого:</b></td>
                <td><b>{this.props.cart.count}</b></td>
                <td>
                  <b> ₴ {toCurrency(this.props.cart.sum)}</b>
                </td>
                <td/>
              </tr>
            </tbody>
          </table>
          <label>Ваш номер телефона: <input name="phone" ref="phone" value={this.state.phone} onChange={this.handleChange}/></label>
          &nbsp;
          <button className="btn btn-primary" disabled={this.state.isButtonDisable} onClick={this.order.bind(this, this.state.phone)}>Заказать</button>
          <br/>
          <button className="btn btn-default" onClick={this.props.closeBasket}>Закрыть корзину</button>
        </div>
      </div>
    </div>
    )
  }
}