class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      price: this.props.price,
      gender: this.props.gender,
      vendor: '',
      files: [],
      isButtonDisable: true,
      stock: true,
      original: false,
      discount: 0
    };

    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.buttonCheck = this.buttonCheck.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(event){
    const target = event.target;
    const name = target.name;
    const value = target.checked;
    this.setState({[name]: value});
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
      state.price !== "" &&
      state.vendor !== undefined &&
      state.vendor !== ""
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
    let vendor = this.state.vendor;
    let stock = this.state.stock;
    let original = this.state.original;
    let discount = this.state.discount;
    $.ajax({
      url: '/items',
      type: 'POST',
      data: { item: { discount: discount, title: title, description: description, price: price, gender: gender, image: image, vendor: vendor, stock: stock, original: original } },
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
        <label>Скидка:</label>
        <input name="discount" type="number" value={this.state.discount} onChange={this.handleChange}/> %
        <br/>
        <label>Мужские/женские:</label>
        <select name="gender" value={this.state.gender} onChange={this.handleChange}>
          <option value="women">Женские</option>
          <option value="men">Мужские</option>
          <option value="unisex">Унисекс</option>
        </select>
        <label>В наличии:</label>
        <input name="stock" defaultChecked={this.state.stock} type="checkbox" onChange={this.handleCheckbox}/> <br/>
        <label>Оригинал:</label>
        <input name="original" defaultChecked={this.state.original} type="checkbox" onChange={this.handleCheckbox}/> <br/>
        <label>Бренд:</label>
        <select name="vendor" onChange={this.handleChange}>
          <option disabled selected value> -- Выберите бренд -- </option>
          <option value="Angel Schlesser">Angel Schlesser</option>
          <option value="Antonio Banderas">Antonio Banderas</option>
          <option value="Armand Basi">Armand Basi</option>
          <option value="Armani">Giorgio Armani</option>
          <option value="Beyonce">Beyonce</option>
          <option value="Bond">Bond</option>
          <option value="Burberry">Burberry</option>
          <option value="Bvlgari">Bvlgari</option>
          <option value="Cacharel">Cacharel</option>
          <option value="Calvin Klein">Calvin Klein</option>
          <option value="Carolina Herrera">Carolina Herrera</option>
          <option value="Chanel">Chanel</option>
          <option value="Christina Aguilera">Christina Aguilera</option>
          <option value="Davidoff">Davidoff</option>
          <option value="Dior">Dior</option>
          <option value="Dolce&Gabbana">Dolce&Gabbana</option>
          <option value="Donna Karan">Donna Karan</option>
          <option value="Givenchy">Givenchy</option>
          <option value="Gucci">Gucci</option>
          <option value="Hermes">Hermes</option>
          <option value="Hugo Boss">Hugo Boss</option>
          <option value="Jimmy Choo">Jimmy Choo</option>
          <option value="Kenzo">Kenzo</option>
          <option value="Lacoste">Lacoste</option>
          <option value="Lancome">Lancome</option>
          <option value="Lanvin">Lanvin</option>
          <option value="Montale">Montale</option>
          <option value="Moschino">Moschino</option>
          <option value="Nina Ricci">Nina Ricci</option>
          <option value="Paco Rabanne">Paco Rabanne</option>
          <option value="Roberto Cavalli">Roberto Cavalli</option>
          <option value="Tom Ford">Tom Ford</option>
          <option value="Trussardi">Trussardi</option>
          <option value="Versace">Versace</option>
          <option value="Vin Diesel">Vin Diesel</option>
          <option value="Yves Saint Laurent">Yves Saint Laurent</option>
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