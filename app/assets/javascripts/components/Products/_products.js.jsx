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
    }

    this.loadProducts = this.loadProducts.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
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

  render() {
    var products = this.state.products.map((product) => {
        return (
            <div key={product.id} style={product_styles}>
              <h4>#{product.id}</h4>
              <h4>{product.name}</h4>
              <br />
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
        <br />
        {this.props.adminFunctions && this.state.category &&
          <NewProduct category_id={this.state.category.id} reload={this.loadProducts}/>
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
  height: 160,
  margin: 2,
  padding: 4,
  border: 2,
  borderStyle: 'solid',
  borderRadius: 3,
  borderColor: 'black',
}