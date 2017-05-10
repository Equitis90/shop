class ShopList extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    let items= this.props.items.map((item) => {
      return (
        <div key={item.id} className="item">
          <ShopElement item={item}/>
        </div>
      )
    });

    return(
      <div>
        {items}
      </div>
    )
  }
}