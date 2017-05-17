const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Shop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      error_message: '',
      cart: this.props.cart,
      cart_message: '',
      modalIsOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleError = this.handleError.bind(this);
    this.closeError = this.closeError.bind(this);
    this.toBasket = this.toBasket.bind(this);
    this.deleteBasket = this.deleteBasket.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteFromBasket = this.deleteFromBasket.bind(this);
    this.order = this.order.bind(this);
  }

  order(phone) {
    //$.ajax({
    //  url: `/shop/order`,
    //  type: 'GET',
    //  data: {phone: phone},
    //  success:(response) => {
    //    this.closeModal();
    //    this.setState({ cart: response, cart_message: 'Ваш заказ создан' });
    //    setTimeout(() => {this.setState({cart_message: ''})}, 2000);
    //  },
    //  error: (response) => {
    //    this.handleError(response.responseJSON.errors)
    //  }
    //});
    this.closeModal();
    this.setState({ cart: {'items':{}, 'sum': '0', 'count':'0'}, cart_message: 'Ваш заказ создан' });
    setTimeout(() => {this.setState({cart_message: ''})}, 2000);
  }

  deleteFromBasket(id) {
    $.ajax({
      url: `/shop/delete_from_basket`,
      type: 'GET',
      data: {id: id},
      success:(response) => {
        this.setState({ cart: response })
      },
      error: (response) => {
        this.handleError(response.responseJSON.errors)
      }
    });
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  deleteBasket() {
    $.ajax({
      url: `/shop/delete_basket`,
      type: 'GET',
      success:(response) => {
        this.setState({ cart: response })
      },
      error: (response) => {
        this.handleError(response.responseJSON.errors)
      }
    });
  }

  toBasket(id) {
    $.ajax({
      url: `/shop/to_basket`,
      type: 'GET',
      data: {item_id: id},
      success:(response) => {
        this.setState({ cart: response, cart_message: 'Товар добавлен в корзину' });
        setTimeout(() => {this.setState({cart_message: ''})}, 2000);
      },
      error: (response) => {
        this.handleError(response.responseJSON.errors)
      }
    });
  }

  closeError() {
    this.setState({error_message: ''})
  }

  handleError(errors) {
    let error_text = '';
    jQuery.each(errors, function(i, val) {
      error_text = `${error_text} ${val}\n`
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
        this.handleError(response.responseJSON.errors)
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
          <Cart cart={this.state.cart} openBasket={this.openModal} deleteBasket={this.deleteBasket}/>
        </div>

        <div className="col-md-9">
          <div className="alert alert-danger fade in" style={this.state.error_message !== '' ? {display: 'block'} : { display: 'none'}}>
            {this.state.error_message}
            <button className="close" aria-label="close" onClick={this.closeError}>&times;</button>
          </div>
          <div className="row">
            <ShopList items={this.state.items} toBasket={this.toBasket}/>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Cart dialog"
      > <CartDialog
        handleError={this.handleError}
        closeBasket={this.closeModal}
        cart={this.state.cart}
        deleteFromBasket={this.deleteFromBasket}
        order={this.order}
      />
      </ReactModal>
      <React.addons.CSSTransitionGroup transitionName="anim"
                                       transitionEnterTimeout={300}
                                       transitionLeaveTimeout={300}>

        {this.state.cart_message !== '' && <div className="alert alert-info">{this.state.cart_message}</div>}
      </React.addons.CSSTransitionGroup>
    </div>
    )
  }
}