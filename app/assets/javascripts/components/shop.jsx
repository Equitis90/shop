class Shop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      error_message: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleError = this.handleError.bind(this);
    this.closeError = this.closeError.bind(this);
  }

  closeError() {
    this.setState({error_message: ''})
  }

  handleError(errors) {
    let error_text = '';
    jQuery.each(errors, function(i, val) {
      error_text = error_text + `${val}\n`
    });
    this.setState({error_message: error_text})
  }

  handleClick(gender, event) {
    $.ajax({
      url: `/shop/index.json`,
      type: 'get',
      data: {gender: gender},
      success:(response) => {
        this.setState({ items: response })
      },
      error: (response) => {
        this.handleError(response.errors)
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container" id="main_container">

        <div className="row">

          <div className="col-md-3">
            <p className="lead">Название магазина</p>
            <div className="list-group">
              <ShopSorter title='Мужские' handleClick={this.handleClick.bind(this, 'men')}/>
              <ShopSorter title='Женские' handleClick={this.handleClick.bind(this, 'women')}/>
              <ShopSorter title='Все' handleClick={this.handleClick.bind(this, '')}/>
            </div>
          </div>

          <div className="col-md-9">
            <div className="alert alert-danger fade in" style={this.state.error_message !== '' ? {display: 'block'} : { display: 'none'}}>
              {this.state.error_message}
              <button className="close" aria-label="close" onClick={this.closeError}>&times;</button>
            </div>
            <div className="row">
              <ShopList items={this.state.items} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}