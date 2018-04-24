class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      description: '',
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  resetState() {
    this.setState({
      name: '',
      price: '',
      description: '',
    });
  }

  handleClick() {
    var self = this;
    myAxios.post('products.json', {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      category_id: this.props.category_id,
    })
    .then(function (response) {
      console.log(response);
      self.forceUpdate();
      self.props.reload();
      if (response.data == true) self.resetState();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return(
      <div className="input-group" style={product_styles}>
        <input 
          className="form-control width100"
          value={this.state.name}
          onChange={this.handleNameChange}
          placeholder='Product name'
        />
        <input type="number"
          className="form-control width100"
          value={this.state.price}
          onChange={this.handlePriceChange}
          placeholder='Price'
        />
        <input 
          className="form-control width100"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          placeholder='Description'
        />
        <button 
          className="btn btn-default"
          onClick={this.handleClick}>
          Add product
        </button>
      </div>
    );
  }
}