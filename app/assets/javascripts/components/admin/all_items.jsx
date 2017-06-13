class AllItems extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(item) {
    this.props.onUpdate(item);
  }

  handleDelete(id) {
    this.props.handleDelete(id)
  }

  render() {
    let items= this.props.items.map((item) => {
      return (
        <div key={item.id} className="item">
          <Item item={item}
                handleDelete={this.handleDelete.bind(this, item.id)}
                handleUpdate={this.onUpdate}
          />
        </div>
      )
    });

    return(
      <div className="all_items">
        <h4>Название</h4>
        <h4>Описание</h4>
        <h4>Цена</h4>
        <h4>Мужские/Женские</h4>
        <h4>Бренд</h4>
        <h4>Изображение</h4>
        {items}
      </div>
    )
  }
}