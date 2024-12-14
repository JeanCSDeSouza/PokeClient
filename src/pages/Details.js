import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { usePokemon } from "../App";
import {useParams} from "react-router-dom";

export function Details() {
    const { id } = useParams();
    const { pokemons } = usePokemon();

    // If no ID is provided, default to the first Pokémon in the list
    const pokemon = id
        ? pokemons.find((p) => p.id.trim().toLowerCase() === id.trim().toLowerCase())
        : pokemons[0];

    if (!pokemon) {
        return (
            <div className="details-page">
                <Header />
                <Navbar />
                <div className="not-found">Pokémon not found</div>
            </div>
        );
    }

    return (
        <div className="x02u95details screen">
            <Header />
            <div className="flex-row">
                <Navbar />
                <div className="wrap wrap-5">
                    <div className="card-image-topcard-image-variant-4">
                        <div className="card-image card">
                            <img className="img-placeholder" src={pokemon.imgSrc} alt={pokemon.id} />
                        </div>
                        <div className="card-content card">
                            <div className="stack">
                                <div className="address inter-semi-bold-shark-14px">{pokemon.id}</div>
                                <p className="lorem-ipsum-dolor-si inter-normal-nevada-11px">
                                    {pokemon.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="wrap-1 wrap-5">
                        <div className="wrap-2 wrap-5">
                            <div className="frame-89">
                                <h1 className="title valign-text-middle semi-bold--h2-heading">{pokemon.id}</h1>
                            </div>
                        </div>
                        <div className="wrap-3 wrap-5">
                            <p className="mewtwo-com-natureza valign-text-middle body-base-text">
                                {pokemon.description}
                            </p>
                        </div>
                        <div className="wrap-4 wrap-5">
                            <div className="owner valign-text-middle">Owner:</div>
                            <div className="jcsouza valign-text-middle bodysmall">{pokemon.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}