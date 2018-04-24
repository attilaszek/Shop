class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      switch: false,
    }
    this.setCategory = this.setCategory.bind(this);
  }

  setCategory(category) {
    this.setState({
      category: category,
      switch: !this.state.switch
    })
  }

  render() {
    const content = sessionStorage.getItem('jwtToken') ?
      (
        <div>
          <Categories
            setActiveCategory={this.setCategory}
            adminFunctions={this.props.adminFunctions}
          />
          <div style={{overflow: 'auto', paddingLeft: 50}}>
            <Products 
              category={this.state.category}
              adminFunctions={this.props.adminFunctions}
              switch={this.state.switch}
            />
          </div>
        </div>
      )
      :
      (
        <div style={{textAlign: 'center', margin: '0 auto', width: 800}}>
          <div style={{float: 'left', paddingTop: 80, paddingRight: 50}}>
            <img src="https://seriousweb.ch/wp-content/uploads/2016/08/webshop-1-1.png"/>
          </div>
          <Signup />
        </div>
      )

    return (
      <div>
        {content}
      </div>
    );
  }
};

Body.defaultProps = {
  adminFunctions: false,
}