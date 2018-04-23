class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Body adminFunctions={this.props.adminFunctions} />
      </div>
    );
  }
};

Body.defaultProps = {
  adminFunctions: false,
}