const newsService = require('./news.service');


module.exports = {
    loadNews,loadNewsByCategory,getArticlesByReporter,getReporters
};

async function loadNews(req, res) {
     const news = await newsService.query();
     
    res.json(news);
}


async function loadNewsByCategory(req, res) {
    const category = req.body;
     const news = await newsService.query(category);
    
    
    res.json(news);
}

async function getArticlesByReporter(req, res) {
    
     const articles = await newsService.loadArticlesByReporter(req.params.reporter);
    
    
    res.json(articles);
}

async function getReporters (req,res) {
  
    const reporters = await newsService.loadReporters();
    res.json(reporters)
}