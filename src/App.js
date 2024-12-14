import React, {useContext, useEffect, useState, createContext} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/globals.css";
import "./styles/styleguide.css";
import "./pages/css/02u95details.css";
import "./pages/css/03u95form.css";
import {Home} from "./pages/Home";
import {Details} from "./pages/Details";
import {FormComponent} from "./pages/FormComponent";

// Contexto para o json externo
const PokemonContext = createContext({});

export function usePokemon(){
    return useContext(PokemonContext);
}

function App() {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        //Simula recuperar dados de um fonte externa
        fetch("/data/pokemons.json")
            .then((response)=> response.json())
            .then((data) => setPokemons(data))
            .catch((error) => console.error("Erro ao tentar carregar dados de pokemons:", error))
    }, []);
    return (
        <PokemonContext.Provider value={{ pokemons, setPokemons }}>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/details/" element={<Details />} />
                <Route path="/form" element={<FormComponent />} />
            </Routes>
        </Router>
        </PokemonContext.Provider>
    );
}

export default App;

