import React, { useState, useEffect } from "react";

import Skeleton from "@yisheng90/react-loading";
import axios from "axios";
// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import MyLoader from "./MyLoader";

const App = () => {
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Rendering");
    getAuthors();
  }, []);

  const selectAuthor = (author) => {
    setLoading(true);
    getAuthor(author);
  };
  const unselectAuthor = () => setCurrentAuthor(null);

  const getAuthors = async () => {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      console.log(response.data);
      setAuthors(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Something went wrong");
      console.log(error);
    }
  };

  const getAuthor = async (author) => {
    try {
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      );
      setCurrentAuthor(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Something went wrong");
      console.log(error);
    }
  };

  const getContentView = () => {
    if (loading === true) {
      return (
        <div>
          <h1>LOADING...</h1>
          <MyLoader />
        </div>
      );
    } else {
      if (currentAuthor) {
        return <AuthorDetail author={currentAuthor} />;
      } else {
        return <AuthorList authors={authors} selectAuthor={selectAuthor} />;
      }
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar unselectAuthor={unselectAuthor} />
        </div>
        <div className="content col-10">{getContentView()}</div>
      </div>
    </div>
  );
};

export default App;
