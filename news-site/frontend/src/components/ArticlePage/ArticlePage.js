import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../services/ArticleService.js";
import "./articlepage.css";

function ArticlePage() {
  let { category } = useParams();

  const [articles, setArticles] = useState("");

  useEffect(() => {
    async function loadNews() {
      const newsData = await ArticleService.getNews(category);
      console.log(newsData);
      setArticles(newsData.news.articles);
      // setArticles(newsData.articles)
    }

    loadNews();
  }, [category]);

  useEffect(() => {
    async function loadReporters() {
      const reporters = await ArticleService.getReporters();
      console.log(reporters);
    }
    loadReporters();
  });

  return (
    <div className="article-page">
      {articles &&
        articles.map((article) => {
          const date = new Date(article.publishedAt);
          return (
            <a href={article.url} className="article" key={article.title}>
              <img src={article.urlToImage} />
              <div className="titles">
                <h1>{article.title}</h1>
                <p>{article.subtitle}</p>
                <div className="author-date">
                  <h6>{article.author}</h6>
                  <p>{date.toDateString()}</p>
                </div>
              </div>
            </a>
          );
        })}
    </div>
  );
}

export default ArticlePage;
