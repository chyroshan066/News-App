import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem.js";
import spinner from "./spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ece1347fd16843d29169ec0224913750&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ece1347fd16843d29169ec0224913750&page=1&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    document.title = `${capitalizeFirstLetter(props.category)}-News Monkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  // const handlePreviousClick = async() =>{
  //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ece1347fd16843d29169ec0224913750&page=${
  //     //   this.state.page - 1
  //     // }&pageSize=${props.pageSize}`;
  //     // this.setState({ loading: true });
  //     // let data = await fetch(url);
  //     // let parsedData = await data.json();
  //     // this.setState({
  //     //   page: this.state.page - 1,
  //     //   articles: parsedData.articles,
  //     //   loading: false,
  //     // });
  //   setPage(page - 1);
  //   updateNews();
  //  }

  // const handleNextClick = async() => {
  //     // if (
  //     //   this.state.page > Math.ceil(this.state.totalResults / props.pageSize)
  //     // ) {
  //     // } else {
  //     //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ece1347fd16843d29169ec0224913750&page=${
  //     //     this.state.page + 1
  //     //   }&pageSize=${props.pageSize}`;
  //     //   this.setState({ loading: true });
  //     //   let data = await fetch(url);
  //     //   let parsedData = await data.json();
  //     //   this.setState({
  //     //     page: this.state.page + 1,
  //     //     articles: parsedData.articles,
  //     //     loading: false,
  //     //   });
  //     // }
  //   setPage(page + 1);
  //   updateNews();
  //  }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=ece1347fd16843d29169ec0224913750&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "65px" }}>
        NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.lenght !== totalResults}
        loader={<spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://th.bing.com/th/id/OIP.n761kB7V2mlyjCmlCcdyMAHaEU?rs=1&pid=ImgDetMain"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
