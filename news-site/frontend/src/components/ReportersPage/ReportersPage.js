import React, { useEffect, useState } from "react";
import "./reporterspage.css"
import ArticleService from "../services/ArticleService.js";

function ReportersPage() {
  const [reporters, setReporters] = useState([]);
  const [articlesByReporter, setArticlesByReoprter] = useState([]);

  useEffect(() => {
    async function loadReporters() {
      const newsData = await ArticleService.getNews();
      setReporters(newsData.reporters);
    }
    loadReporters();
  }, []);
  async function onReporterClick(reporter) {
    const articles = await ArticleService.getArticlesByReporter(reporter);
    setArticlesByReoprter(articles);
  }
  return (
    <div className="flex-container">
      {reporters.map((reporter) => {
        return (
            <ul class="flex-container wrap"
            onClick={() => {
              onReporterClick(reporter);
            }}
          >
           <li className="flex-item"> Reporter: </li> <br /> {<p>{reporter}</p>}
          </ul>
        );
      })}
      {articlesByReporter.map((article) => {
return (
    <div>{article.title}</div>
)
      })}
    </div>
  );
}

export default ReportersPage;
