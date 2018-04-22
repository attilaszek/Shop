class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: null,
    }
    this.setCategory = this.setCategory.bind(this);
  }

  setCategory(category_id) {
    this.setState({
      category_id: category_id,
    })
  }

  render() {
    return (
      <div>
        <Categories setActiveCategory={this.setCategory}/>
        <div style={{overflow: 'auto'}}>
          <Products category_id={this.state.category_id} />
        </div>
      </div>
    );
  }
};