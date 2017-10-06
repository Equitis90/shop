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

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      error_message: '',
      modalIsOpen: false,
      last_page: false,
      page: 1,
      spinner_opacity: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.removeItemClient = this.removeItemClient.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleError = this.handleError.bind(this);
    this.closeError = this.closeError.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
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
      this.setState({spinner_opacity: 1});
      let page = this.state.page + 1;
      $.ajax({
        url: `/items.json`,
        type: 'get',
        data: {page: page },
        success:(response) => {
          let newItems = this.state.items.slice().concat(response.items);
          this.setState({ items: newItems, last_page: response.last_page, page: page, spinner_opacity: 0});
        },
        error: (response) => {
          this.handleError(response.responseJSON.errors)
        }
      });
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  handleDelete(id) {
    if (confirm('Удалить выбранный товар?')) {
      $.ajax({
        url: `/items/${id}`,
        type: 'DELETE',
        success:() => { this.removeItemClient(id); },
        error: (response) => {
          this.handleError(response.responseJSON.errors)
        }
      });
    }
  }

  handleUpdate(item) {
    $.ajax({
      url: `/items/${item.id}.json`,
      type: 'PUT',
      data: {item: item},
      success:(resp) => {
        let items = this.state.items;
        for (let i in items) {
          if (items[i].id == item.id) {
            items[i] = resp;
            break;
          }
        }

        this.setState({items: items });
      },
      error: (response) => {
        this.handleError(response.responseJSON.errors)
      }
    });
  }

  removeItemClient(id) {
    let newItems = this.state.items.filter((item) => { return item.id !== id; });
    this.setState({ items: newItems });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    $.ajax({
      url: `/items.json`,
      type: 'get',
      data: {page: 1 },
      success:(response) => {
        this.setState({ items: response.items, last_page: response.last_page });
      },
      error: (response) => {
        this.handleError(response.responseJSON.errors)
      }
    });
  }

  handleSubmit(item) {
    let newState = this.state.items;
    newState.unshift(item);
    this.setState({ items: newState });
    this.closeModal();
  }

  handleError(errors) {
    let error_text = '';
    jQuery.each(errors, function(i, val) {
      error_text = error_text + `${val}\n`
    });
    this.setState({error_message: error_text})
  }

  closeError() {
    this.setState({error_message: ''})
  }

  render() {
    return (
      <div>
        <div className="alert alert-danger fade in" style={this.state.error_message !== '' ? {display: 'block'} : { display: 'none'}}>
          {this.state.error_message}
          <button className="close" aria-label="close" onClick={this.closeError}>&times;</button>
        </div>
        <button onClick={this.openModal} className="open-modal">Добавить новый товар</button>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="New product"
        > <NewItem title="" description="" price="0.00" gender="women" handleSubmit={this.handleSubmit} handleError={this.handleError}/>
        </ReactModal>
        <AllItems items={this.state.items} handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
        <span className="spinner" style={{opacity: this.state.spinner_opacity}}/>
      </div>
    );
  }
}