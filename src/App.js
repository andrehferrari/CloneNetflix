import React, { useEffect, useState } from "react";
import './App.css'
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow";
import FeatureMovie from './components/FeatureMovie'

function App(){

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null)

  useEffect(() => {
    // Pegando a lista de filmes
    const loadAll = async () => {
    let list = await tmdb.getHomeList();
    setMovieList(list);

    //Pegando o filme de destaque
    let originals = list.filter(i=>i.slug === 'originais')
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
    let chosen = originals[0].items.results[randomChosen]
    let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
    setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  {featureData && 
    <FeatureMovie item={featureData}/>
  }

  return(
    <div className="page">
      
      <section className="lists">
        {movieList.map((item, key) => {
         return (
          <MovieRow key={key} title={item.title} items={item.items}/>
         )
        })}
      </section>
    </div>
  );
}

export default App;