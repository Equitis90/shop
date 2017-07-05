const customStyles = {
  content : {
    top                   : '53%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxHeight             : '80vh',
    overflowY             : 'auto'
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
      modal2IsOpen: false,
      gender: '',
      vendor: this.props.vendor,
      all_vendors: this.props.vendor.length === 0,
      page: 1,
      last_page: this.props.last_page,
      isButtonDisable: true,
      name: '',
      phone: '',
      title: '',
      typed_title: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleError = this.handleError.bind(this);
    this.closeError = this.closeError.bind(this);
    this.toBasket = this.toBasket.bind(this);
    this.deleteBasket = this.deleteBasket.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
    this.deleteFromBasket = this.deleteFromBasket.bind(this);
    this.order = this.order.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.buttonCheck = this.buttonCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.callBack = this.callBack.bind(this);
    this.typeAhead = this.typeAhead.bind(this);
  }

  typeAhead(event) {
    let _this = this;

    if (_this.state.timer) {
      clearTimeout(_this.state.timer);
    }

    _this.setState({
      title: event.target.value,
      timer: setTimeout(function () {
        _this.setState({typed_title: _this.state.title});
      }, 1000)
    });
  }

  callBack() {
    $.ajax({
      url: `/shop/callback`,
      type: 'GET',
      data: {phone: this.state.phone, name: this.state.name},
      success:() => {
        this.closeModal2();
        this.setState({ cart_message: I18n.t('callback_received') });
        setTimeout(() => {this.setState({cart_message: ''})}, 2000);
      },
      error: (response) => {
        this.handleError(response.responseJSON.errors)
      }
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  buttonCheck() {
    let state = this.state;
    let buttonDisable = true;
    if (state.phone !== undefined &&
      state.phone !== "" && state.phone.length >= 10 &&
      state.name !== undefined &&
      state.name !== ""
    ) {
      buttonDisable = false
    }
    if (buttonDisable !== state.isButtonDisable) {
      this.setState({
        isButtonDisable: buttonDisable
      })
    }
  }

  handleScroll() {
    const divHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = divHeight + window.pageYOffset;
    if (window.pageYOffset > 0) {
      $("#scroll-top").css({ opacity: 1 });
    } else {
      $("#scroll-top").css({ opacity: 0 });
    }
    if (windowBottom >= docHeight && this.state.last_page !== true) {
      $(".spinner").css({ opacity: 1 });
      let page = this.state.page + 1;
      $.ajax({
        url: `/shop/index.json`,
        type: 'get',
        data: {gender: this.state.gender, vendor: this.state.vendor, page: page, title: this.state.typed_title},
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
    if (this.state.vendor !== []) {
      let arrayLength = this.state.vendor.length;
      for (var i = 0; i < arrayLength; i++) {
        vd = this.state.vendor[i];
        $('input[name="'+vd+'"]').prop('checked', true);
      }
    }
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
    history.replaceState('perfumes.net.ua', 'CheapSale', '/');
    this.setState({vendor: newVendor, all_vendors: all_vendors})
  }

  order(phone) {
    $.ajax({
      url: `/basket/order`,
      type: 'GET',
      data: {phone: phone},
      success:(response) => {
        this.closeModal();
        this.setState({ cart: response, cart_message: I18n.t('order_created') });
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

  openModal2() {
    this.setState({modal2IsOpen: true});
  }

  closeModal2() {
    this.setState({modal2IsOpen: false});
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

  toBasket(id, action, amount) {
    $.ajax({
      url: `/basket/${id}`,
      type: 'PUT',
      data: {add: true, amount: amount},
      success:(response) => {
        if(action === 'add') {
          this.setState({ cart: response, cart_message: I18n.t('item_added_to_cart') });
          setTimeout(() => {this.setState({cart_message: ''})}, 2000);
        } else if (action === 'order') {
          this.setState({ cart: response });
          this.openModal();
        }
      },
      error: (response) => {
        alert(JSON.stringify(response));
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
    this.buttonCheck();
    if(prevState.gender !== this.state.gender || prevState.vendor !== this.state.vendor || prevState.typed_title !== this.state.typed_title) {
      $.ajax({
        url: `/shop/index.json`,
        type: 'get',
        data: {gender: this.state.gender, vendor: this.state.vendor, title: this.state.typed_title},
        success:(response) => {
          this.setState({ items: response.items , last_page: response.last_page, page: 1})
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
        <div id="schedule" className="thumbnail col-sm-12 col-md-12 col-lg-12">
          <h3>{I18n.t('schedule')}</h3>
          <button id="callback" className="btn btn-primary" onClick={this.openModal2}>{I18n.t('callback')}</button>
        </div>
      </div>
      <div className="row">
        <div id="title-row" className="col-sm-12 col-md-12 col-lg-12">
          <h3 className="lead left"><div id="title-container"><div className="blue">Cheap</div><div className="green">Sale</div></div><div id="slogan">{I18n.t('slogan')}</div></h3>
          <div className="right" id="delivery-image"/>
        </div>
        <div className="list-group">
          <ShopSorter title={I18n.t("men")} handleClick={this.handleClick.bind(this, 'men')}/>
          <ShopSorter title={I18n.t("women")} handleClick={this.handleClick.bind(this, 'women')}/>
          <ShopSorter title={I18n.t("unisex")} handleClick={this.handleClick.bind(this, 'unisex')}/>
          <ShopSorter title={I18n.t("all")} handleClick={this.handleClick.bind(this, '')}/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="thumbnail">
            <label>{I18n.t('search')}</label> <input style={{width: '95%'}} onChange={this.typeAhead} value={this.state.title} placeholder={I18n.t('search_pace')}/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3 col-md-3 col-lg-3">
          <div className="thumbnail" id="vendors-container">
            <h4>{I18n.t('brends')}</h4>
            <ul className="vendors">
              <li><label><input value="all" type="checkbox" checked={this.state.all_vendors} onChange={this.handleCheckbox}/> {I18n.t('all')}</label></li>
              <li><label><input className="opt" name="Hugo Boss" value="Hugo Boss" type="checkbox" onChange={this.handleCheckbox}/> Hugo Boss</label></li>
              <li><label><input className="opt" name="Kenzo" value="Kenzo" type="checkbox" onChange={this.handleCheckbox}/> Kenzo</label></li>
              <li><label><input className="opt" name="Paco Rabanne" value="Paco Rabanne" type="checkbox" onChange={this.handleCheckbox}/> Paco Rabanne</label></li>
              <li><label><input className="opt" name="Gucci" value="Gucci" type="checkbox" onChange={this.handleCheckbox}/> Gucci</label></li>
              <li><label><input className="opt" name="Trussardi" value="Trussardi" type="checkbox" onChange={this.handleCheckbox}/> Trussardi</label></li>
              <li><label><input className="opt" name="Lanvin" value="Lanvin" type="checkbox" onChange={this.handleCheckbox}/> Lanvin</label></li>
              <li><label><input className="opt" name="Bond" value="Bond" type="checkbox" onChange={this.handleCheckbox}/> Bond</label></li>
              <li><label><input className="opt" name="Givenchy" value="Givenchy" type="checkbox" onChange={this.handleCheckbox}/> Givenchy</label></li>
              <li><label><input className="opt" name="Moschino" value="Moschino" type="checkbox" onChange={this.handleCheckbox}/> Moschino</label></li>
              <li><label><input className="opt" name="Yves Saint Laurent" value="Yves Saint Laurent" type="checkbox" onChange={this.handleCheckbox}/> Yves Saint Laurent</label></li>
              <li><label><input className="opt" name="Nina Ricci" value="Nina Ricci" type="checkbox" onChange={this.handleCheckbox}/> Nina Ricci</label></li>
              <li><label><input className="opt" name="Versace" value="Versace" type="checkbox" onChange={this.handleCheckbox}/> Versace</label></li>
              <li><label><input className="opt" name="Roberto Cavalli" value="Roberto Cavalli" type="checkbox" onChange={this.handleCheckbox}/> Roberto Cavalli</label></li>
              <li><label><input className="opt" name="Lancome" value="Lancome" type="checkbox" onChange={this.handleCheckbox}/> Lancome</label></li>
              <li><label><input className="opt" name="Dolce&Gabbana" value="Dolce&Gabbana" type="checkbox" onChange={this.handleCheckbox}/> Dolce&Gabbana</label></li>
              <li><label><input className="opt" name="Dior" value="Dior" type="checkbox" onChange={this.handleCheckbox}/> Dior</label></li>
              <li><label><input className="opt" name="Chanel" value="Chanel" type="checkbox" onChange={this.handleCheckbox}/> Chanel</label></li>
              <li><label><input className="opt" name="Carolina Herrera" value="Carolina Herrera" type="checkbox" onChange={this.handleCheckbox}/> Carolina Herrera</label></li>
              <li><label><input className="opt" name="Calvin Klein" value="Calvin Klein" type="checkbox" onChange={this.handleCheckbox}/> Calvin Klein</label></li>
              <li><label><input className="opt" name="Cacharel" value="Cacharel" type="checkbox" onChange={this.handleCheckbox}/> Cacharel</label></li>
              <li><label><input className="opt" name="Burberry" value="Burberry" type="checkbox" onChange={this.handleCheckbox}/> Burberry</label></li>
              <li><label><input className="opt" name="Beyonce" value="Beyonce" type="checkbox" onChange={this.handleCheckbox}/> Beyonce</label></li>
              <li><label><input className="opt" name="Bvlgari" value="Bvlgari" type="checkbox" onChange={this.handleCheckbox}/> Bvlgari</label></li>
              <li><label><input className="opt" name="Angel Schlesser" value="Angel Schlesser" type="checkbox" onChange={this.handleCheckbox}/> Angel Schlesser</label></li>
              <li><label><input className="opt" name="Armand Basi" value="Armand Basi" type="checkbox" onChange={this.handleCheckbox}/> Armand Basi</label></li>
              <li><label><input className="opt" name="Armani" value="Armani" type="checkbox" onChange={this.handleCheckbox}/> Armani</label></li>
              <li><label><input className="opt" name="Vin Diesel" value="Vin Diesel" type="checkbox" onChange={this.handleCheckbox}/> Vin Diesel</label></li>
            </ul>
            <h4>{I18n.t('elite')}</h4>
            <ul className="vendors">
              <li><label><input className="opt" name="Tom Ford" value="Tom Ford" type="checkbox" onChange={this.handleCheckbox}/> Tom Ford</label></li>
              <li><label><input className="opt" name="Montale" value="Montale" type="checkbox" onChange={this.handleCheckbox}/> Montale</label></li>
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
      <ReactModal
        isOpen={this.state.modal2IsOpen}
        onRequestClose={this.closeModal2}
        style={customStyles}
        contentLabel="Calback dialog"
      > <div>
        <div>
          <label className="block">{I18n.t('name')}</label> <input className="block" name="name" value={this.state.name} onChange={this.handleChange}/>
          <label className="block">{I18n.t('phone_number')}</label> <input className="block" name="phone" value={this.state.phone} onChange={this.handleChange}/>
        </div>
        <button className="btn btn-primary" disabled={this.state.isButtonDisable} onClick={this.callBack}>{I18n.t('callback')}</button>&nbsp;
        <button className="btn btn-danger" onClick={this.closeModal2}>{I18n.t('cancel')}</button>
      </div>
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