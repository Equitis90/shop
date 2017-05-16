class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.price
    };

    this.handleChangePrice = this.handleChangePrice.bind(this);
  }

  handleChangePrice(event) {
    value = new String(event.target.value);
    // remove all characters that aren't digit or dot
    value = value.replace(/[^0-9.]/g,'');
    // replace multiple dots with a single dot
    value = value.replace(/\.+/g,'.');
    // only allow 2 digits after a dot
    value = value.replace(/(.*\.[0-9][0-9]?).*/g,'$1');
    // replace multiple zeros with a single one
    value = value.replace(/^0+(.*)$/,'0$1');
    // remove leading zero
    value = value.replace(/^0([^.].*)$/,'$1');
    this.setState({price: value})
    this.props.handleChangePrice(value);
  }

  render() {
    return (
      <input
        type="text"
        ref="price"
        size={8}
        value={this.state.price}
        onChange={this.handleChangePrice}
        required={true}
      />
    )
  }
}