class Header extends React.Component {
  render() {

    var userForm = sessionStorage.getItem('jwtToken') ?
      (
        <Logout 
          setLoginStatus={this.props.setLoginStatus}
        />
      ) 
      :
      (
        <Login 
          setLoginStatus={this.props.setLoginStatus} 
          adminFunctions={this.props.adminFunctions}
        />
      )

    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-default justify-content-between" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <a href="/" className="navbar-brand">Webshop</a>
            </div>
            <div className="nav navbar-nav navbar-right">
              {userForm}
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

Header.defaultProps = {
  adminFunctions: false,
}