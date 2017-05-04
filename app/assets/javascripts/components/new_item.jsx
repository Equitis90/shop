class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      price: this.props.price,
      gender: this.props.gender,
      files: [],
      isButtonDisable: true
    };

    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.buttonCheck = this.buttonCheck.bind(this);
  }

  handleChangePrice(price) {
    this.setState({price: price});
  }

  componentDidUpdate() {
    this.buttonCheck()
  }

  buttonCheck() {
    let state = this.state;
    let buttonDisable = true;
    if (state.title !== undefined &&
      state.title !== "" &&
      state.description !== undefined &&
      state.description !== "" &&
      state.files.length > 0 &&
      state.price !== undefined &&
      state.price !== ""
    ) {
      buttonDisable = false
    }
    if (buttonDisable !== state.isButtonDisable) {
      this.setState({
        isButtonDisable: buttonDisable
      })
    }
  }

  selectImage(files) {
    this.setState({files: files});
  }

  handleClick() {
    let title = this.state.title;
    let description = this.state.description;
    let price = this.state.price;
    let gender = this.state.gender;
    let image = this.state.files[0];
    $.ajax({
      url: '/items',
      type: 'POST',
      data: { item: { title: title, description: description, price: price, gender: gender, image: image } },
      contentType: 'multipart/form-data',
      success: (item) => {
        this.props.handleSubmit(item);
      },
      error: (response) => {
        this.props.handleError(response.responseJSON.errors)
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

  render() {
    return (
      <div className="new_item_dialog">
        <h2>Добавить товар</h2>
        <label>Название:</label>
        <input
          name="title"
          placeholder="Название"
          onChange={this.handleChange}
          value={this.state.title}
          required={true}
        />
        <br/>
        <label>Описание:</label>
        <br/>
        <textarea
          name="description"
          placeholder="Описание"
          cols={31}
          rows={5}
          onChange={this.handleChange}
          value={this.state.description}
          required={true}
        />
        <br/>
        <label>Цена:</label>
        <Price handleChangePrice={this.handleChangePrice} price={this.state.price}/> грн.
        <br/>
        <label>Мужские/женские:</label>
        <select name="gender" value={this.state.gender} onChange={this.handleChange}>
          <option value="women">Женские</option>
          <option value="men">Мужские</option>
        </select>
        <br/>
        <label>Изображение:
          <Image selectImage={this.selectImage} files={this.state.files} required={true}/>
        </label>
        <br/>
        <button disabled={this.state.isButtonDisable} onClick={this.handleClick}>Добавить</button>
      </div>
    );
  }
}