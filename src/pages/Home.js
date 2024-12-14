import React, {useState} from "react";
import {PokeCard} from "../components/PokeCard";
import {Navbar} from "../components/Navbar";
import {Header} from "../components/Header";
import "./css/01u95home.css";
import {usePokemon} from "../App";
import arrowLeft from "../assets/img/chevron-left-1.svg";
import arrowRight from "../assets/img/chevron-right-1.svg";

export function Home() {
    const { pokemons } = usePokemon();
    const [page, setPage] = useState(1);
    const itemsPerPage = 4;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPokemons = pokemons.slice(startIndex, endIndex);

    const handleNext = () => setPage((prev) => (prev * itemsPerPage < pokemons.length ? prev + 1 : prev));
    const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));
    const totalPages = Math.ceil(pokemons.length / itemsPerPage);
    return (
        <div className="x01u95home screen">
            <Header />
            <div className="flex-row">
                    <Navbar />
                    <div className="wrap">
                        <h1 className="title semi-bold--h4-heading">Border</h1>
                        <div className="card-bordered">
                            <div className="property-container property">
                                {paginatedPokemons.map((pokemon) => (
                                    <PokeCard
                                        key={pokemon.id}
                                        id={pokemon.id}
                                        name={pokemon.name}
                                        description={pokemon.description}
                                        imgSrc={pokemon.imgSrc}
                                        onDetails={() => console.log(`Details for ${pokemon.name}`)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="simple-pagination">
                            <article className="pagination pagination-2" onClick={handlePrev} style={{ cursor: "pointer", opacity: page === 1 ? 0.5 : 1 }}>
                                <img className="chevron" src={arrowLeft} alt="arrow-left" />
                            </article>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <article
                                    key={i}
                                    className={`pagination-1 pagination-2 ${page === i + 1 ? "active" : ""}`}
                                    onClick={() => setPage(i + 1)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="number body-base-text">{i + 1}</div>
                                </article>
                            ))}
                            <article className="pagination pagination-2" onClick={handleNext} style={{ cursor: "pointer", opacity: page * itemsPerPage >= pokemons.length ? 0.5 : 1 }}>
                                <img className="chevron" src={arrowRight} alt="arrow-right" />
                            </article>
                        </div>
                    </div>
            </div>
        </div>
);
}
