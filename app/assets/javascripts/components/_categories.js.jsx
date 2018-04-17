class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      activeCategoryId: null,
      parentCategoryId: props.parentCategoryId,
      level: parseInt(props.level),
      lastChild: null,
    };

    this.handleLastChild = this.handleLastChild.bind(this);
  
    this.childCategories = null;
    this.childCategoriesRef = element => {
      this.childCategories = element;
    }
  }

  reloadCategories(parent_id) {
    if (parent_id == this.state.parentCategoryId) {
      this.loadCategories();
      this.setState({
        activeCategoryId: null,
        lastChild: null,
      });
      this.props.setLastChild(parent_id);
    }
    else {
      alert(this.state.parentCategoryId);
      this.childCategories.reloadCategories(parent_id);
    }
  }

  loadCategories() {
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

  handleLastChild(id) {
    this.setState({
      lastChild: id,
    });
    if (this.props.setLastChild) {
      this.props.setLastChild(id == null ? this.state.activeCategoryId : id);
    }
  }

  render() {
    var categories = this.state.categories.map((category) => {
        return (
            <div className={'categoryLevel'+this.state.level} key={category.id}>
                <li className={category.id == this.state.activeCategoryId ? "active" : ""} onClick={this.toggleCategory.bind(this, category.id)}>
                  {category.id} {category.name}: {category.ancestry}
                </li>
                {category.id == this.state.activeCategoryId &&
                  <Categories ref={this.childCategoriesRef} level={this.state.level + 1} parentCategoryId={category.id}
                    setLastChild={this.handleLastChild}
                  />
                }
            </div>
        )
    });

    return (
      <div>
        <ul className={'nav nav-pills nav-stacked'}> 
          {categories}
        </ul>
      </div>
    );
  }

};