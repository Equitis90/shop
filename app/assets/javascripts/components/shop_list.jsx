class ShopList extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    let items= this.props.items.map((item) => {
      return (
        <div key={item.id} className="col-sm-4 col-lg-4 col-md-4">
          <ShopElement item={item}/>
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