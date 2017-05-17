class ShopElement extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="thumbnail">
        <div className="caption">
          <img src={this.props.item.image} alt="" height={150} width={320}/>
          <h4 className="pull-right">Цена: ₴ {toCurrency(this.props.item.price)}</h4>
          <h4>{this.props.item.title}</h4>
          <p>{this.props.item.description}</p>
          <p>Категория: {this.props.item.gender === 'women' ? 'Женские' : 'Мужские'}</p>
          <button className="btn btn-primary" onClick={this.props.toBasket}>В корзину</button>
        </div>
      </div>
    )
  }
}