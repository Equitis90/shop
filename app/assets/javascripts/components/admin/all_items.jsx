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
        <div key={item.id} className="col-sm-4 col-md-4 col-lg-4">
          <Item item={item}
                handleDelete={this.handleDelete.bind(this, item.id)}
                handleUpdate={this.onUpdate}
          />
        </div>
      )
    });

    return(
      <div className="row">
        {items}
      </div>
    )
  }
}