class ShopElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const genders = {'women': 'Женские', 'men': 'Мужские', 'unisex': 'Унисекс'};
    return (
      <div className="thumbnail">
        <div className="caption">
          <img src={this.props.item.image} alt="" height={200} width={320}/>
          <h4>{this.props.item.title}</h4>
          <h4 className="priceh"><div className="left">Цена: </div><div className="right">₴{toCurrency(this.props.item.price)}</div></h4>
          <p>Бренд: {this.props.item.vendor}</p>
          <p>Категория: {genders[this.props.item.gender]}</p>
          <button className="btn btn-primary" onClick={this.props.toBasket}>В корзину</button>
          <p className="description">{this.props.item.description}</p>
        </div>
      </div>
    )
  }
}