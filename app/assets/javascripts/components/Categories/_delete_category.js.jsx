class DeleteCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      id: props.id,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.delete('http://localhost:3000/api/v1/categories/'+this.state.id+'.json', {
    })
    .then(response => {
      console.log(response);
      this.props.reload(true);
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <a onClick={this.handleClick} >[Delete]</a>
    );
  }
}