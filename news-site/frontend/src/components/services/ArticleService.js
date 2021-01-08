import HttpService from "./HttpService";

async function getNews(category) {
  let newsData = '';
  if(category === undefined) newsData = await HttpService.get("news/")
  else newsData = await HttpService.post("news/", category );
  console.log(newsData);
    return newsData;
   
}

async function getArticlesByReporter(reporter){
const articles = await HttpService.get(`articles/${reporter}`)
return articles;
}

async function getReporters() {
  const reporters = await HttpService.get('news/reporters')
  return reporters;
}
export default { getNews,getArticlesByReporter,getReporters };
