class DeleteProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      id: props.id,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var self = this;
    myAxios.delete('products/'+this.state.id+'.json', {
    })
    .then(response => {
      console.log(response);
      self.props.reload();
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <a onClick={this.handleClick} >Delete</a>
    );
  }
}