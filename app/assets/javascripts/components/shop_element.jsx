class ShopElement extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="thumbnail">
        <div className="caption">
          <img src={this.props.item.image} alt="" height={150} width={320}/>
          <h4 className="pull-right">Цена: ₴ {parseFloat(this.props.item.price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</h4>
          <h4>{this.props.item.title}</h4>
          <p>{this.props.item.description}</p>
          <p>Категория: {this.props.item.gender === 'women' ? 'Женские' : 'Мужские'}</p>
          <button className="btn btn-primary">В корзину</button>
        </div>
      </div>
    )
  }
}