class ShopList extends React.Component {
  constructor(props) {
    super(props);

    this.toBasket = this.toBasket.bind(this);
  }

  toBasket(id) {
    this.props.toBasket(id)
  }

  render() {
    let items= this.props.items.map((item) => {
      return (
        <div key={item.id} className="col-sm-4 col-lg-4 col-md-4">
          <ShopElement item={item} toBasket={this.toBasket.bind(this, item.id)}/>
        </div>
      )
    });

    return(
      <div className="table-row-equal">
        {items}
      </div>
    )
  }
}