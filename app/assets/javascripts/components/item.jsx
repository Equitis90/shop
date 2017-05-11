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
      let image = this.state.image;
      let item = {id: id, title: title, description: description, price: price, gender: gender, image: image};
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
    let title = this.state.editable ? <h4><input
      ref="title"
      type="text"
      defaultValue={this.props.item.title}/></h4> : <h4>{this.props.item.title}</h4>;
    let description = !this.state.editable;
    let price = this.state.editable ? <h4><Price handleChangePrice={this.handleChangePrice}
                                                 price={this.state.price}/> грн.</h4> :
      <h4>{this.state.price} грн.</h4>;
    let gender = this.state.editable ? <h4><select ref="gender" name="gender" defaultValue={this.props.item.gender}>
      <option value="women">Женские</option>
      <option value="men">Мужские</option>
    </select></h4> : <h4>{this.props.item.gender === 'women' ? 'женские' : 'мужские'}</h4>;

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
        {img}
        <div>
          <button className="btn btn-primary" onClick={this.handleEdit}> {this.state.editable ? 'Сохранить' : 'Редактировать' } </button>
          <button className="btn btn-danger" onClick={this.props.handleDelete}>Удалить</button>
        </div>
      </div>
    )
  }
}