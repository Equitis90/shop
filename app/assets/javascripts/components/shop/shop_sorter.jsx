class ShopSorter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="" className="list-group-item" onClick={this.props.handleClick}>{this.props.title}</a>
    )
    }
  }