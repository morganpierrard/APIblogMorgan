import React, {Component} from 'react'

class Articles extends Component{
  constructor(props){
    super(props)
    this.state ={
      articles:[]
    }
  }

  componentDidMount(){
    fetch('http://localhost:5678/api/articles')
    .then(res =>res.json())
    .then(body=>{
      this.setState({
        articles:body
      })
    })
    .catch(err => {throw err})
  }
  render(){
    console.log(this.state.articles);
    const renderArticles = this.state.articles.filter(article=> article.isPublished===true).map(article=>{
      return <ul key={article._id} className="article">
              <li>Titre:{article.titre}</li>
              <li>Date:{article.date}</li>
              <li>Texte:{article.texte}</li>
              <li>{`${article.isPublished}`}</li>
            </ul>
  })
  const renderBrouillons = this.state.articles.filter(article=> article.isPublished===false).map(article=>{
    return <ul key={article._id} className="article">
            <li>Titre:{article.titre}</li>
            <li>Date:{article.date}</li>
            <li>Texte:{article.texte}</li>
            <li>{`${article.isPublished}`}</li>
          </ul>
})
    return(
      <div className="adminArticles">
        <div><h3>Articles publiés:</h3>{renderArticles}</div>
        <div><h3>Brouillons:</h3>{renderBrouillons}</div>
      </div>
    )
  }
}

export default Articles
