class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      email_error: '',
      password_error: '',
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleClick() {
    var self = this;
    myAxios.post('authentication/login.json', {
      email: this.state.email,
      password: this.state.password,
      admin: this.props.adminFunctions,
    })
    .then(function (response) {
      self.setState({
        email_error: '',
        password_error: '',
      });
      var auth_token = response.data.auth_token;
      if (auth_token) {
        sessionStorage.setItem('jwtToken', auth_token);
        myAxios.defaults.headers.authorization = auth_token;
        self.props.setLoginStatus(true);
      }
      console.log(response);
    })
    .catch(function (error) {
      if (error.response) {
        var errors = error.response.data
        if (errors.email) alert(errors.email);
        self.setState({
          password: '',
          email_error: errors.email,
          password_error: errors.password,
        });
      }
      console.log(error);
    });
  }

  render() {
    return(
      <div className="form-inline" style={{paddingTop: 8}}>
        <div className={"form-group " + (this.state.email_error && "has-error")}>
          <input 
            className="form-control width100"
            value={this.state.email}
            onChange={this.handleEmailChange}
            placeholder='Email'
          />
        </div>

        <div className={"form-group " + (this.state.password_error && "has-error")}>
          <input type="password"
            className="form-control width100"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            placeholder='Password'
          />
        </div>

        <button 
          className="btn btn-default"
          onClick={this.handleClick}>
          Login
        </button>
      </div>
    );
  }
}

Login.defaultProps = {
  adminFunctions: false,
}