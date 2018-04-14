class NewCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category_name: '',
      category_description: '',
      parent_category: null,
      categoryId: null,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCategoryId = this.handleCategoryId.bind(this);
  }

  handleClick() {
    alert(this.state.categoryId);
  }

  handleNameChange(event) {
    this.setState({category_name: event.target.value});
  }
  handleDescriptionChange(event) {
    this.setState({category_description: event.target.value});
  }

  handleCategoryId(id) {
    this.setState({
      categoryId: id,
    });
  }

  render() {
    return (
      <div>
        <form>
          <input 
            className="form-control"
            value={this.state.category_name}
            onChange={this.handleNameChange}
            placeholder='Enter category name'
          />
          <input 
            className="form-control"
            value={this.state.category_description}
            onChange={this.handleDescriptionChange}
            placeholder='Enter description'
          />
          <h4>Choose parent category:</h4>
          <Categories level='0' setLastChild={this.handleCategoryId}/>
          <div className="btn btn-default" onClick={this.handleClick}>Submit</div>
        </form>
      </div>
    );
  }
}