import React, { Component } from "react";

import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const getAuthor = await axios.get(
        "http://the-index-api.herokuapp.com/api/authors/"
      );
      const res = getAuthor.data;
      this.setState({ authors: res, loading: false });
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  selectAuthor = async author => {
    const getBook = await axios.get(
      `http://the-index-api.herokuapp.com/api/authors/${author.id}/`
    );
    const res = getBook.data;
    this.setState({ currentAuthor: res });
  };
  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.loading) {
      alert("page is loading");
      return Loading;
    } else if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
