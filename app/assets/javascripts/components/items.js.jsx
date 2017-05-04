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
      modalIsOpen: false
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
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
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
      url: `/items/${item.id}`,
      type: 'PUT',
      data: {item: item},
      success:() => {
        $.getJSON('/items.json', (response) => {
          this.setState({ items: response })
        })
        .fail(function(response) {
          this.handleError(response.responseJSON.errors)
        });
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

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  componentDidMount() {
    $.getJSON('/items.json', (response) => {
      this.setState({ items: response })
    })
    .fail(function(response) {
      this.handleError(response.responseJSON.errors)
    });
  }

  handleSubmit(item) {
    let newState = this.state.items.concat(item);
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
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        > <NewItem title="" description="" price="0.00" gender="women" handleSubmit={this.handleSubmit} handleError={this.handleError}/>
        </ReactModal>
        <AllItems items={this.state.items} handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
      </div>
    );
  }
}