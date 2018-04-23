class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    }
    this.setCategory = this.setCategory.bind(this);
  }

  setCategory(category) {
    this.setState({
      category: category,
    })
  }

  render() {
    return (
      <div>
        <Categories
          setActiveCategory={this.setCategory}
          adminFunctions={this.props.adminFunctions}
        />
        <div style={{overflow: 'auto', paddingLeft: 50}}>
          <Products 
            category={this.state.category}
            adminFunctions={this.props.adminFunctions} 
          />
        </div>
      </div>
    );
  }
};

Body.defaultProps = {
  adminFunctions: false,
}