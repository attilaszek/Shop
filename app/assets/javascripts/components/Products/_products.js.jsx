class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      category: props.category,
      pos_x: 0,
      pos_y: 0,
      show_description: false,
      description: null,
      file: '',
      active_product: null,
    }

    this.loadProducts = this.loadProducts.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleClickOnProduct = this.handleClickOnProduct.bind(this);
  }

  loadProducts() {
    myAxios.get('products.json', {
      params: {
        category_id: this.state.category ? this.state.category.id : null
      }
    })
      .then(response => {
        console.log(response);
        this.setState({products: response.data})
        if (response.data.length == 0) {
          //alert("Empty category")
        }
        else {
          
        }
      })
      .catch(error => console.log(error))
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.category) !== JSON.stringify(nextProps.category) 
      || this.props.switch != nextProps.switch)
    {
      this.setState(
        {
          category: nextProps.category,
          active_product: null,
        },
        this.loadProducts
      );
    }
  } 

  componentDidMount() {
    this.loadProducts();
  }

  handleOnMouseEnter(evt, description) {
    this.setState({
      pos_x: evt.clientX,
      pos_y: evt.clientY,
      show_description: true,
      description: description,
    });
  }

  handleOnMouseLeave() {
    this.setState({
      show_description: false,
    });
  }

  uploadFile(file) {
    var self = this;
    myAxios.post('products/upload.json', {
      file_b64: file,
      category_id: this.state.category ? this.state.category.id : null,
    })
    .then(function (response) {
      self.loadProducts();
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleFileChange(event) {
    var self = this;
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      self.uploadFile(reader.result);
      console.log(reader.result);
      self.setState({
        file: reader.result,
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  handleClickOnProduct(event, index) {
    if (this.state.active_product == this.state.products[index]) {
      this.setState({
        active_product: null,
      });
    }
    else {
      this.setState({
        active_product: this.state.products[index],
      });      
    }
  }

  render() {
    var products = this.state.products.map((product, index) => {
        return (
            <div key={product.id} style={product_styles} onClick={(evt) => this.handleClickOnProduct(evt, index)}>
              <div style={{width: product_styles.width, height: product_styles.width}}>
                <img style={img_styles} src={product.image_b64}></img>
              </div>
              <h4>{product.name}</h4>
              <h4>Price: ${product.price}</h4>
              <h5>
                <a onMouseOver={(evt) => this.handleOnMouseEnter(evt, product.description)} onMouseLeave={this.handleOnMouseLeave}>
                  Description
                </a>
                {this.props.adminFunctions &&
                  <span>{" | "}
                    <DeleteProduct id={product.id} reload={this.loadProducts} />
                  </span>
                }
              </h5>
              {this.state.show_description &&
                <div style={{position: 'absolute', left: this.state.pos_x+10, top: this.state.pos_y+10}}>
                  <ShowDescription description={this.state.description}/>
                </div>
              }
            </div>
        );
    });

    return(
      <div>
        <h3>{this.state.category && "Products in "+this.state.category.name+" category"}</h3>
        {this.props.adminFunctions && this.state.category &&
          <div>
            <label>
              <div className="btn btn-default">Upload product from CSV file</div>
              <input type="file" style={{display: "none"}} name="fileName" defaultValue="fileName" onChange={this.handleFileChange}></input>
            </label>
            <br />
            <br />
            <NewProduct product={this.state.active_product} category_id={this.state.category.id} reload={this.loadProducts}/>
          </div>
        }
        {products}
        {products.length == 0 &&
          <h4  style={{color: 'red'}}>No products in this category</h4>
        }
      </div>
    );
  }
}

Products.defaultProps = {
  category: null,
  adminFunctions: false,
}

product_styles = {
  float: 'left',
  width: 150,
  height: 250,
  margin: 2,
  padding: 4,
  border: 2,
  borderStyle: 'solid',
  borderRadius: 3,
  borderColor: 'black',
}

img_styles = {
  maxWidth: product_styles.width - 2 * (product_styles.margin + product_styles.padding),
  maxHeight: product_styles.width - 2 * (product_styles.margin + product_styles.padding),
}