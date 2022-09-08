import React, { useEffect, useState } from "react";
import './App.css'
import tmdb from "./tmdb";
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie'
import Header from "./components/Header";

function App(){

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

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

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      }else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    <div className="page">
      
    <Header black={blackHeader}/>

      {featureData && 
        <FeatureMovie item={featureData}/>
      }

      <section className="lists">
        {movieList.map((item, key) => {
         return (
          <MovieRow key={key} title={item.title} items={item.items}/>
         )
        })}
      </section>

      <footer>
        Made with love by André Ferrari <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos no site TheMovieDb
      </footer>
    </div>
  );
}

export default App;