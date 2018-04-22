class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      activeCategory: null,
      parentCategory: props.parentCategory,
      level: parseInt(props.level),
    }

    this.loadCategories = this.loadCategories.bind(this);
  }

  loadCategories(resetActive = false) {
    if (resetActive) {
      this.setState({
        activeCategory: null
      })
    }

     axios.get('http://localhost:3000/api/v1/categories.json', {
      params: {
        parent_id: this.state.parentCategory ? this.state.parentCategory.id : null
      }
    })
      .then(response => {
        console.log(response);
        this.setState({categories: response.data})
        if (response.data.length == 0) {
          //alert("Empty category")
        }
        else {
          
        }
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.loadCategories();
  }

  toggleCategory(category) {
    this.setState({activeCategory: (this.state.activeCategory === category ? null : category)});
    this.props.setActiveCategory(this.state.activeCategory === category ? this.state.parentCategory : category);
  }

  render() {
    var categories = this.state.categories.map((category) => {
        return (
            <div className={'categoryLevel'+this.state.level} key={category.id}>
                <li className={category === this.state.activeCategory ? "active" : "" } onClick={this.toggleCategory.bind(this, category)}>
                  <span>{category.name} </span>
                  {this.props.adminFunctions &&
                    <DeleteCategory id={category.id} reload={this.loadCategories}/>
                  }
                </li>
                {category === this.state.activeCategory &&
                  <Categories
                    level={this.state.level + 1}
                    parentCategory={category}
                    adminFunctions={this.props.adminFunctions}
                    setActiveCategory={this.props.setActiveCategory}
                  />
                }
            </div>
        )
    });

    return(
      <div className="categories">
        {this.state.level == 0 &&
          <h3>Categories</h3>
        }
        <ul className={'nav nav-pills nav-stacked'}> 
          {categories}
          {this.props.adminFunctions && this.state.activeCategory == null &&

              <div className={'categoryLevel'+(this.state.level)}>
                <NewCategory parent_id={this.state.parentCategory ? this.state.parentCategory.id : null} reload={this.loadCategories}/>
              </div>
          }
        </ul>
      </div>
    );
  }
}

Categories.defaultProps = {
  level: 0,
  parentCategory: null,
  adminFunctions: false,
  setActiveCategory: null,
}