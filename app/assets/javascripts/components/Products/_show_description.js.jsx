class ShowDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
    }
  }

  render() {
    const styles = {
      background: 'lightgray',
      padding: 3,
      border: 1,
      borderRadius: 2,
      borderStyle: 'solid',
    }

    return(
      <div style={styles}>
        {this.state.description ? this.state.description : "No description"}
      </div>
    );
  }
}