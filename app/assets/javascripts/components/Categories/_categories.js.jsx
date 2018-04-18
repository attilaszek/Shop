class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      activeCategoryId: null,
      parentCategoryId: props.parentCategoryId,
      level: parseInt(props.level),
    }

    this.loadCategories = this.loadCategories.bind(this);
  }

  loadCategories(resetActive = false) {
    if (resetActive) {
      this.setState({
        activeCategoryId: null
      })
    }

     axios.get('http://localhost:3000/api/v1/categories.json', {
      params: {
        parent_id: this.state.parentCategoryId
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.length == 0) {
          //alert("Empty category")
        }
        else {
          this.setState({categories: response.data})
        }
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.loadCategories();
  }

  toggleCategory(id) {
    this.setState({activeCategoryId: (this.state.activeCategoryId == id ? null : id)});
    if (this.props.setLastChild) {
      this.props.setLastChild(this.state.activeCategoryId == id ? null : id);
    }
  }

  render() {
    var categories = this.state.categories.map((category) => {
        return (
            <div className={'categoryLevel'+this.state.level} key={category.id}>
                <li className={category.id == this.state.activeCategoryId ? "active" : ""} onClick={this.toggleCategory.bind(this, category.id)}>
                  {category.name}
                  <span> </span>
                  {this.props.adminFunctions &&
                    <DeleteCategory id={category.id} reload={this.loadCategories}/>
                  }
                </li>
                {category.id == this.state.activeCategoryId &&
                  <Categories
                    level={this.state.level + 1}
                    parentCategoryId={category.id}
                    adminFunctions={this.props.adminFunctions}
                  />
                }
            </div>
        )
    });

    return(
      <div className="categories">
        {this.state.level == 0&&
          <h3>Categories</h3>
        }
        <ul className={'nav nav-pills nav-stacked'}> 
          {categories}
          {this.props.adminFunctions && this.state.activeCategoryId == null &&
            <li>
              <NewCategory parent_id={this.state.parentCategoryId} reload={this.loadCategories}/>
            </li>
          }
        </ul>
      </div>
    );
  }
}

Categories.defaultProps = {
  level: 0,
  parentCategoryId: null,
  adminFunctions: false
}