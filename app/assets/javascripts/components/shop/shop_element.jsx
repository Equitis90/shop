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
          <h4 className="priceh"><div className="left">{I18n.t('price')} </div><div className="right">₴{toCurrency(this.props.item.price)}</div></h4>
          <p>{I18n.t('brand')} {this.props.item.vendor}</p>
          <p>{I18n.t('category')} {I18n.t(this.props.item.gender)}</p>
          <button className="btn btn-primary" onClick={this.props.toBasket}>{I18n.t('to_cart')}</button>
          <p className="description">{this.props.item.description}</p>
        </div>
      </div>
    )
  }
}