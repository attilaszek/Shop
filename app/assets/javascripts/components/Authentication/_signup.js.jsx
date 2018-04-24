class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',

      email_error: '',
      password_error: '',
      password_confirmation_error: '',
      success: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    var self = this;
    myAxios.post('authentication/signup.json', {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      email: this.state.email,
    })
    .then(function (response) {
      self.setState({
        email_error: '',
        password_error: '',
        password_confirmation_error: '',
        success: true,
      })
      console.log(response);
    })
    .catch(function (error) {
      var errors = error.response.data
      self.setState({
        password: '',
        password_confirmation: '',
        email_error: errors.email,
        password_error: errors.password,
        password_confirmation_error: errors.password_confirmation,
      })
      console.log(errors);
    });
  }

  render() {
    const style = {
      width: 200,
      float: 'left'
    }

    const form = (
      <div className="form" style={style}>
        <h3>Sign up</h3>
        <hr />

        <div className="form-group">
          <input
            name="first_name"
            className="form-control width100"
            value={this.state.first_name}
            onChange={this.handleInputChange}
            placeholder='First name'
          />
        </div>

        <div className="form-group">
          <input 
            name = "last_name"
            className="form-control width100"
            value={this.state.last_name}
            onChange={this.handleInputChange}
            placeholder='Last name'
          />
        </div>

        <div className={"form-group " + (this.state.email_error && "has-error")}>
          <input 
            name = "email"
            className="form-control width100"
            value={this.state.email}
            onChange={this.handleInputChange}
            placeholder='E-mail address'
          />
          {this.state.email_error && <span className="help-block">{this.state.email_error}</span>}
        </div>

        <div className={"form-group " + (this.state.password_error && "has-error")}>
          <input type="password"
            name = "password"
            className="form-control width100"
            value={this.state.password}
            onChange={this.handleInputChange}
            placeholder='Password'
          />
          {this.state.password_error && <span className="help-block">{this.state.password_error}</span>}
        </div>

        <div className={"form-group " + (this.state.password_confirmation_error && "has-error")}>
          <input type="password"
            name = "password_confirmation"
            className="form-control"
            value={this.state.password_confirmation}
            onChange={this.handleInputChange}
            placeholder='Confirm password'
          />
          {this.state.password_confirmation_error && <span className="help-block">{this.state.password_confirmation_error}</span>}
        </div>

        <button
          className="btn btn-default"
          onClick={this.handleSubmit}>
          Sign up
        </button>
      </div>
    );

    const successScreen = (
      <h3>Successfull sign up!</h3>
    );

    const content = this.state.success ? successScreen : form;

    return(
      <div>
        {content}
      </div>
    );
  }
}