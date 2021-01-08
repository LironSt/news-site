const fetch = require("node-fetch");
const dbService = require("../../services/db.service");
module.exports = {
  query,
  loadArticlesByReporter,
  loadReporters,
};

async function query(category) {
  try {
    const collection = await dbService.getCollection("news");
    const articles = await collection.find({}).toArray();
    // _addArticles(articles);
    const reporters = await _getReporters(articles[0].articles);
   

    return { news: articles[0] };

    let apiUrl =
      "https://newsapi.org/v2/top-headlines?country=il&apiKey=4d0a8c07b07d46f8ae14b424bf28fee9";
    if (category) {
      const currCategory = Object.keys(category)[0];

      apiUrl = `https://newsapi.org/v2/top-headlines?country=il&apiKey=4d0a8c07b07d46f8ae14b424bf28fee9&category=${currCategory}`;
    }

    const response = await fetch(apiUrl);
    const news = await response.json();
    _addArticles(news.articles);
    // const reporters = await  _getReporters(news.articles);
    await _storeReporters(reporters);

    return news.articles;
  } catch (err) {
    console.log("Error while fetching news.", err);
    throw err;
  }
}

async function _addArticles(articles) {
  try {
    const collection = await dbService.getCollection("news");
    await collection.insertOne({ articles });
  } catch (err) {
    console.log("Error while Storing Articles.", err);
    throw err;
  }
}

async function _getReporters(articles) {
  try {
    const reporters = [];
    articles.forEach((article) => {
      if (article.author) reporters.push(article.author);
    });
    // console.log(reporters);
    return reporters;
  } catch (err) {
    console.log("Error while Getting Reporters.", err);
    throw err;
  }
}

async function _storeReporters(reporters) {
  try {
    const collection = await dbService.getCollection("reporters");
    reporters.forEach(async (reporter) => {
      await collection.insertOne({ reporter });
    });
  } catch (err) {
    console.log("Error while Storing Articles.", err);
    throw err;
  }
}

async function loadReporters() {
  try {
    const collection = await dbService.getCollection("reporters");
    const reporters = await collection.find({}).toArray();
    return reporters;
  } catch (err) {
    console.log("Error while Getting Reporters ", err);
    throw err;
  }
}

async function loadArticlesByReporter(reporter) {
  try {
    const collection = await dbService.getCollection("news");
    const articles = await collection.find({}).toArray();
    let articlesByReporter = [];
    articles.forEach((articleData) => {
      const filteredArticles = articleData.articles.filter((article) => {
        return article.author === reporter;
      });
      articlesByReporter = [...articlesByReporter, ...filteredArticles];
    });
  } catch (err) {
    console.log("Error while Getting Articles By  Reporters.", err);
    throw err;
  }
}
