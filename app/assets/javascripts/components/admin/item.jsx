class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      price: this.props.item.price,
      image: this.props.item.image,
      files: []
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.selectImage = this.selectImage.bind(this)
  }

  handleEdit() {
    if (this.state.editable) {
      let id = this.props.item.id;
      let title = this.refs.title.value;
      let description = this.refs.description.value;
      let price = this.state.price;
      let gender = this.refs.gender.value;
      let vendor = this.refs.vendor.value;
      let image = this.state.image;
      let stock = this.refs.stock.checked;
      let original = this.refs.original.checked;
      let item = {id: id, title: title, description: description, price: price, gender: gender, image: image, vendor: vendor, stock: stock, original: original};
      this.props.handleUpdate(item)
    }
    this.setState({editable: !this.state.editable})
  }

  selectImage(files) {
    this.setState({files: files, image: files[0]});
  }

  handleChangePrice(price) {
    this.setState({price: price});
  }

  render() {
    const genders = {'women': 'Женские', 'men': 'Мужские', 'unisex': 'Унисекс'};
    let stock = this.state.editable ? <h4><input ref="stock" defaultChecked={this.props.item.stock} type="checkbox" /></h4> :
      <h4>{this.props.item.stock ? 'В наличии' : 'Закончились'}</h4>;
    let original = this.state.editable ? <h4><input ref="original" defaultChecked={this.props.item.original} type="checkbox" /></h4> :
      <h4>{this.props.item.original ? 'Оригинал' : 'Лицензия'}</h4>;
    let title = this.state.editable ? <h4><input
      ref="title"
      type="text"
      defaultValue={this.props.item.title}/></h4> : <h4>{this.props.item.title}</h4>;
    let description = !this.state.editable;
    let price = this.state.editable ? <h4><Price handleChangePrice={this.handleChangePrice}
                                                 price={this.state.price}/> грн.</h4> :
      <h4>{toCurrency(this.state.price)} грн.</h4>;
    let gender = this.state.editable ? <h4><select ref="gender" name="gender" defaultValue={this.props.item.gender}>
      <option value="women">Женские</option>
      <option value="men">Мужские</option>
      <option value="unisex">Унисекс</option>
    </select></h4> : <h4>{genders[this.props.item.gender]}</h4>;

    let vendor = this.state.editable ? <h4><select ref="vendor" name="vendor" defaultValue={this.props.item.vendor}>
      <option value="Hugo Boss">Hugo Boss</option>
      <option value="Kenzo">Kenzo</option>
      <option value="Paco Rabanne">Paco Rabanne</option>
      <option value="Gucci">Gucci</option>
      <option value="Trussardi">Trussardi</option>
      <option value="Lanvin">Lanvin</option>
      <option value="Bond">Bond</option>
      <option value="Givenchy">Givenchy</option>
      <option value="Moschino">Moschino</option>
      <option value="Yves Saint Laurent">Yves Saint Laurent</option>
      <option value="Nina Ricci">Nina Ricci</option>
      <option value="Tom Ford">Tom Ford</option>
      <option value="Versace">Versace</option>
      <option value="Roberto Cavalli">Roberto Cavalli</option>
      <option value="Lancome">Lancome</option>
      <option value="Dolce&Gabbana">Dolce&Gabbana</option>
      <option value="Dior">Dior</option>
      <option value="Chanel">Chanel</option>
      <option value="Carolina Herrera">Carolina Herrera</option>
      <option value="Calvin Klein">Calvin Klein</option>
      <option value="Cacharel">Cacharel</option>
      <option value="Burberry">Burberry</option>
      <option value="Beyonce">Beyonce</option>
      <option value="Bvlgari">Bvlgari</option>
      <option value="Angel Schlesser">Angel Schlesser</option>
      <option value="Armand Basi">Armand Basi</option>
      <option value="Armani">Giorgio Armani</option>
      <option value="Vin Diesel">Vin Diesel</option>
      <option value="Montale">Montale</option>
      <option value="Antonio Banderas">Antonio Banderas</option>
      <option value="Christina Aguilera">Christina Aguilera</option>
      <option value="Davidoff">Davidoff</option>
      <option value="Donna Karan">Donna Karan</option>
      <option value="Hermes">Hermes</option>
      <option value="Jimmy Choo">Jimmy Choo</option>
      <option value="Lacoste">Lacoste</option>
    </select></h4> : <h4>{this.props.item.vendor}</h4>;

    let img = this.state.editable ? <h4>
      <img src={this.state.image} height={100} width={200}/>
      <Image selectImage={this.selectImage} files={this.state.files} required={false}/>
    </h4> : <img src={this.state.image} height={100} width={200}/>;

    return (
      <div className="thumbnail">
        {title}
        <textarea
          ref="description"
          cols={20}
          rows={6}
          readOnly={description}
          defaultValue={this.props.item.description}/>
        {price}
        {gender}
        {vendor}
        {stock}
        {original}
        {img}
        <div>
          <button className="btn btn-primary" onClick={this.handleEdit}> {this.state.editable ? 'Сохранить' : 'Редактировать' } </button>
          <button className="btn btn-danger" onClick={this.props.handleDelete}>Удалить</button>
        </div>
      </div>
    )
  }
}