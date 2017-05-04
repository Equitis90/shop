class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: this.props.files
    };

    this.selectImage = this.selectImage.bind(this);
  }

  selectImage() {
    let file = this.refs.file.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({
        files: [reader.result]
      });
      this.props.selectImage([reader.result]);
    }.bind(this);
  }

  render() {
    return (
      <div>
        <input
          ref="file"
          type="file"
          accept="image/*"
          required={this.props.required}
          onChange={this.selectImage}
        />
        <input type="hidden" ref="image" name="image" value={this.state.files} />
      </div>
    )
  }
}