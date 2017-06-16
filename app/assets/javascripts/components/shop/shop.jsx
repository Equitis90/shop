const customStyles = {
  content : {
    top                   : '53%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    'max-height'          : '80vh',
    'overflow-y'          : 'auto'
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
      modalIsOpen: false,
      gender: '',
      vendor: [],
      all_vendors: true,
      page: 1,
      last_page: this.props.last_page
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
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const divHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight); //document.getElementById('list').clientHeight;
    const windowBottom = divHeight + window.pageYOffset;
    if (windowBottom >= docHeight && this.state.last_page !== true) {
      $(".spinner").css({ opacity: 1 });
      let page = this.state.page + 1;
      $.ajax({
        url: `/shop/index.json`,
        type: 'get',
        data: {gender: this.state.gender, vendor: this.state.vendor, page: page },
        success:(response) => {
          let newItems = this.state.items.slice().concat(response.items);
          this.setState({ items: newItems, last_page: response.last_page, page: page});
          $(".spinner").css({ opacity: 0 });
        },
        error: (response) => {
          this.handleError(response.responseJSON.errors)
        }
      });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleCheckbox(event){
    const target = event.target;
    const value = target.value;

    let newVendor = this.state.vendor.slice();
    let all_vendors = this.state.all_vendors;

    if(value === 'all') {
      all_vendors = true;
      $(".opt").prop('checked', false);
      newVendor = [];
    } else {
      all_vendors = false;
      if(target.checked === true) {
        newVendor.push(value);
      } else {
        let index = newVendor.indexOf(value);
        newVendor.splice(index, 1);
      }
    }

    this.setState({vendor: newVendor, all_vendors: all_vendors})
  }

  order(phone) {
    $.ajax({
      url: `/basket/order`,
      type: 'GET',
      data: {phone: phone},
      success:(response) => {
        this.closeModal();
        this.setState({ cart: response, cart_message: 'Ваш заказ создан' });
        setTimeout(() => {this.setState({cart_message: ''})}, 2000);
      },
      error: (response) => {
        this.handleError(response.responseJSON.errors)
      }
    });
  }

  deleteFromBasket(id) {
    $.ajax({
      url: `/basket/${id}`,
      type: 'PUT',
      data: {delete: true},
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
      url: `/basket/1`,
      type: 'DELETE',
      success:(response) => {
        this.setState({ cart: response });
      },
      error: (response) => {
        this.handleError(response.responseJSON.errors)
      }
    });
  }

  toBasket(id) {
    $.ajax({
      url: `/basket/${id}`,
      type: 'PUT',
      data: {add: true},
      success:(response) => {
        this.setState({ cart: response, cart_message: 'Товар добавлен в корзину' });
        setTimeout(() => {this.setState({cart_message: ''})}, 2000);
      },
      error: (response) => {
        //alert(JSON.stringify(response));
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

  componentDidUpdate(prevProps, prevState) {
    if(prevState.gender !== this.state.gender || prevState.vendor !== this.state.vendor) {
      $.ajax({
        url: `/shop/index.json`,
        type: 'get',
        data: {gender: this.state.gender, vendor: this.state.vendor},
        success:(response) => {
          this.setState({ items: response.items , last_page: response.last_page, page: 0})
        },
        error: (response) => {
          this.handleError(response.responseJSON.errors)
        }
      });
    }
  }

  handleClick(gender, event) {
    if(gender !== this.state.gender) {
      this.setState({gender: gender});
    }
    event.preventDefault();
  }

  render() {
    return (
    <div className="container" id="main_container">
      <div className="row">
        <div className="col-md-3">
          <h3 className="lead"><div className="blue">Cheap</div><div className="green">Sale</div> <br/><small className="">Покупай обдуманно!</small></h3>
          <div className="list-group">
            <ShopSorter title='Мужские' handleClick={this.handleClick.bind(this, 'men')}/>
            <ShopSorter title='Женские' handleClick={this.handleClick.bind(this, 'women')}/>
            <ShopSorter title='Унисекс' handleClick={this.handleClick.bind(this, 'unisex')}/>
            <ShopSorter title='Все' handleClick={this.handleClick.bind(this, '')}/>
          </div>
          <div className="thumbnail">
            <h4>Бренды</h4>
            <ul id="vendors">
              <li><label><input value="all" type="checkbox" checked={this.state.all_vendors} onChange={this.handleCheckbox}/> Все</label></li>
              <li><label><input className="opt" value="Hugo Boss" type="checkbox" onChange={this.handleCheckbox}/> Hugo Boss</label></li>
              <li><label><input className="opt" value="Kenzo" type="checkbox" onChange={this.handleCheckbox}/> Kenzo</label></li>
              <li><label><input className="opt" value="Paco Rabanne" type="checkbox" onChange={this.handleCheckbox}/> Paco Rabanne</label></li>
              <li><label><input className="opt" value="Gucci" type="checkbox" onChange={this.handleCheckbox}/> Gucci</label></li>
              <li><label><input className="opt" value="Trussardi" type="checkbox" onChange={this.handleCheckbox}/> Trussardi</label></li>
              <li><label><input className="opt" value="Lanvin" type="checkbox" onChange={this.handleCheckbox}/> Lanvin</label></li>
              <li><label><input className="opt" value="Bond" type="checkbox" onChange={this.handleCheckbox}/> Bond</label></li>
              <li><label><input className="opt" value="Givenchy" type="checkbox" onChange={this.handleCheckbox}/> Givenchy</label></li>
              <li><label><input className="opt" value="Moschino" type="checkbox" onChange={this.handleCheckbox}/> Moschino</label></li>
              <li><label><input className="opt" value="Yves Saint Laurent" type="checkbox" onChange={this.handleCheckbox}/> Yves Saint Laurent</label></li>
              <li><label><input className="opt" value="Nina Ricci" type="checkbox" onChange={this.handleCheckbox}/> Nina Ricci</label></li>
              <li><label><input className="opt" value="Tom Ford" type="checkbox" onChange={this.handleCheckbox}/> Tom Ford</label></li>
              <li><label><input className="opt" value="Versace" type="checkbox" onChange={this.handleCheckbox}/> Versace</label></li>
              <li><label><input className="opt" value="Roberto Cavalli" type="checkbox" onChange={this.handleCheckbox}/> Roberto Cavalli</label></li>
              <li><label><input className="opt" value="Lancome" type="checkbox" onChange={this.handleCheckbox}/> Lancome</label></li>
              <li><label><input className="opt" value="Dolce&Gabbana" type="checkbox" onChange={this.handleCheckbox}/> Dolce&Gabbana</label></li>
              <li><label><input className="opt" value="Dior" type="checkbox" onChange={this.handleCheckbox}/> Dior</label></li>
              <li><label><input className="opt" value="Chanel" type="checkbox" onChange={this.handleCheckbox}/> Chanel</label></li>
              <li><label><input className="opt" value="Carolina Herrera" type="checkbox" onChange={this.handleCheckbox}/> Carolina Herrera</label></li>
              <li><label><input className="opt" value="Calvin Klein" type="checkbox" onChange={this.handleCheckbox}/> Calvin Klein</label></li>
              <li><label><input className="opt" value="Cacharel" type="checkbox" onChange={this.handleCheckbox}/> Cacharel</label></li>
              <li><label><input className="opt" value="Burberry" type="checkbox" onChange={this.handleCheckbox}/> Burberry</label></li>
              <li><label><input className="opt" value="Beyonce" type="checkbox" onChange={this.handleCheckbox}/> Beyonce</label></li>
              <li><label><input className="opt" value="Bvlgari" type="checkbox" onChange={this.handleCheckbox}/> Bvlgari</label></li>
              <li><label><input className="opt" value="Angel Schlesser" type="checkbox" onChange={this.handleCheckbox}/> Angel Schlesser</label></li>
              <li><label><input className="opt" value="Armand Basi" type="checkbox" onChange={this.handleCheckbox}/> Armand Basi</label></li>
              <li><label><input className="opt" value="Armani" type="checkbox" onChange={this.handleCheckbox}/> Armani</label></li>
              <li><label><input className="opt" value="Vin Diesel" type="checkbox" onChange={this.handleCheckbox}/> Vin Diesel</label></li>
            </ul>
          </div>
          <Cart cart={this.state.cart} openBasket={this.openModal} deleteBasket={this.deleteBasket}/>
        </div>

        <div className="col-md-9">
          <div className="alert alert-danger fade in" style={this.state.error_message !== '' ? {display: 'block'} : { display: 'none'}}>
            {this.state.error_message}
            <button className="close" aria-label="close" onClick={this.closeError}>&times;</button>
          </div>
          <div className="row" id="list">
            <ShopList items={this.state.items} toBasket={this.toBasket}/>
            <span className="spinner" style={{opacity: 0}}></span>
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