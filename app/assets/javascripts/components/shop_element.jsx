class ShopElement extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="col-sm-4 col-lg-4 col-md-4">
        <div className="thumbnail">
          <img src={this.props.item.image} alt="" height={150} width={320}></img>
          <div className="caption">
            <h4 className="pull-right">Цена: {this.props.item.price}</h4>
            <h4>{this.props.item.title}</h4>
          </div>
          <p>{this.props.item.description}</p>
          <p>Категория: {this.props.item.gender === 'women' ? 'Женские' : 'Мужские'}</p>
          <button className="btn btn-primary">Купить</button>
        </div>
      </div>
    )
  }
}