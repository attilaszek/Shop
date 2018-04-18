class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      parent_id: props.parent_id
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleClick() {
    var self = this;
    axios.post('http://localhost:3000/api/v1/categories.json', {
      name: this.state.name,
      description: this.state.description,
      ancestry: this.state.parent_id
    })
    .then(function (response) {
      console.log(response);
      self.forceUpdate();
      self.props.reload();
      self.setState({
        name: ''
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    return(
      <div className="input-group">
        <input 
          className="form-control width100"
          value={this.state.name}
          onChange={this.handleNameChange}
          placeholder='New category'
        />
        <span className="input-group-btn">
          <button 
            className="btn btn-default"
            onClick={this.handleClick}>
            Add
          </button>
        </span>
      </div>
    );
  }
}