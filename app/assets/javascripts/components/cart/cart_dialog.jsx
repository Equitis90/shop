class CartDialog extends React.Component {
  constructor(props) {
    super(props);

    this.deleteFromBasket = this.deleteFromBasket.bind(this);
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
            <b>₴ {parseFloat(item.price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</b>
          </td>
          <td>
            <b>{item.count}</b>
          </td>
          <td>
            <b>₴ {parseFloat(item.sum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</b>
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
        <div className="col-md-12">
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
                  <b> ₴ {parseFloat(this.props.cart.sum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</b>
                </td>
                <td/>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-default" onClick={this.props.closeBasket}>Закрыть корзину</button>
        </div>
      </div>
    </div>
    )
  }
}