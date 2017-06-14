class ShopElement extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="thumbnail">
        <div className="caption">
          <img src={this.props.item.image} alt="" height={200} width={320}/>
          <h4>{this.props.item.title}</h4>
          <h4 className="priceh"><div className="left">Цена: </div><div className="right">₴{toCurrency(this.props.item.price)}</div></h4>
          <p>Бренд: {this.props.item.vendor}</p>
          <p>Категория: {this.props.item.gender === 'women' ? 'Женские' : 'Мужские'}</p>
          <button className="btn btn-primary" onClick={this.props.toBasket}>В корзину</button>
          <p className="description">{this.props.item.description}</p>
        </div>
      </div>
    )
  }
}