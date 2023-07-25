import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import Spinner from "./Spinner";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const [loading,setLoading] = useState(false)

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setData({ ...data, categories: res });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then((res) => {
        setLoading(false);
        if (res.error) {
          console.log(res.error);
        } else {
          setData({
            ...data,
            results: res,
            searched: true,
          });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    searchData();
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend w-30">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">All</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Search by name"
            />
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    );
  };
  const searchMessage = () => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length == 0) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return loading ? (
      <Spinner />
    ) : (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage()}</h2>
        <div className="row">
          {results.map((product, i) => (
            <div className="col-sm-6 col-lg-4 mb-3">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
