class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
    this.setLoginStatus = this.setLoginStatus.bind(this);
  }

  setLoginStatus(status) {
    this.setState({
      isLoggedIn: status,
    });
  }
  //TODO: setItem = (name ) => (value) => {}

  render() {
    return (
      <div>
        <Header setLoginStatus={this.setLoginStatus} adminFunctions={this.props.adminFunctions}/>
        <Body adminFunctions={this.props.adminFunctions} />
      </div>
    );
  }
};

Body.defaultProps = {
  adminFunctions: false,
}

myAxios = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  headers: {'Authorization': sessionStorage.getItem('jwtToken')}
});