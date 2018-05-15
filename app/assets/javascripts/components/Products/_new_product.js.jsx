class NewProduct extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.product) {
      this.state = {
        name: this.props.product.name,
        price: this.props.product.price,
        description: this.props.product.description,
        file_b64: this.props.product.image_b64,
      }
    }
    else {
      this.state = {
        name: '',
        price: '',
        description: '',
        file_b64: ''
      }
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
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

  handleFileChange(event) {
    var self = this;
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      self.setState({
        file_b64: reader.result,
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  resetState() {
    this.setState({
      name: '',
      price: '',
      description: '',
      file_b64: ''
    });
  }

  handleClick() {
    var self = this;

    myAxios.post('products.json', {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      category_id: this.props.category_id,
      image_b64: this.state.file_b64
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

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.product) !== JSON.stringify(nextProps.product))
    {
      if (nextProps.product) {
        this.setState(
          {
            name: nextProps.product.name,
            price: nextProps.product.price,
            description: nextProps.product.description,
            file_b64: nextProps.product.image_b64,          
          }
        );        
      }
      else
      {
        this.setState(
          {
            name: '',
            price: '',
            description: '',
            file_b64: '',          
          }
        );    
      }
    }
  } 

  render() {
    return(
      <div className="input-group" style={product_styles}>
        <div style={{width: 320}}>
        <div style={{width: product_styles.width, height: product_styles.width, float: "left"}}>
          <img style={img_styles} src={this.state.file_b64}></img>
        </div>

        <div style={{float: "left", width: 170}}>
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
        
        <label>
          <div className="btn btn-default">Upload picture</div>
          <input type="file" style={{display: "none"}} name="fileName" defaultValue="fileName" onChange={this.handleFileChange}></input>
        </label>


        <button 
          className="btn btn-default"
          onClick={this.handleClick}>
          Submit product
        </button>
        </div>
        </div>
      </div>
    );
  }
}

NewProduct.defaultProps = {
  product: null,
}