class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    sessionStorage.setItem('jwtToken', '');
    myAxios.defaults.headers.authorization = '';
    sessionStorage.setItem('current_user', null);
    self.props.setLoginStatus(false);
  }

  componentDidMount() {
    self = this;
    myAxios.get('authentication.json', {
    })
    .then(function (response) {
      self.setState({
        user: response.data,
      });
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return(
     <div className="form-inline" style={{paddingTop: 8}}>
        {this.state.user &&
          <span>Logged in as {this.state.user.email} </span>
        }
        <button 
          className="btn btn-default"
          onClick={this.handleClick}>
          Logout
        </button>
      </div>
    );
  }
}