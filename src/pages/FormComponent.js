import React from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { usePokemon } from "../App";
import { useNavigate } from "react-router-dom";

export function FormComponent() {
    const { pokemons, setPokemons } = usePokemon();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newPokemon = {
            id: formData.get("titulo"),
            name: formData.get("owner"),
            description: formData.get("description"),
            imgSrc: formData.get("imgSrc"),
        };
        setPokemons([...pokemons, newPokemon]);
        navigate(`/`); // Redirect to the details page of the new Pokémon
    };

    return (
        <form className="x03u95form screen" name="addPokemon" method="post" onSubmit={handleSubmit}>
            <Header />
            <div className="flex-row">
                <Navbar />
                <div className="form-1">
                    <div className="wrap wrap-2">
                        <div className="wrap-1 wrap-2">
                            <img className="image-1" src="/img/image-1.png" alt="Form Illustration" />
                        </div>
                        <div className="text-inputs text-2">
                            <label className="input-text-label notosans-semi-bold-granite-gray-12px">Título</label>
                            <div className="input-field">
                                <input
                                    className="type-here-1 notosans-normal-granite-gray-16px"
                                    name="titulo"
                                    placeholder="Mewtwo 6x31 timid"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-inputs-1 text-inputs-4">
                            <label className="input-text-label notosans-semi-bold-granite-gray-12px">Descrição</label>
                            <div className="textarea">
                                <div className="content">
                                    <input
                                        className="write-a-message body-base-text"
                                        name="description"
                                        placeholder="252 ev speed; 252 ev sp.atk. Nature timid. Moveset: calm mind, psychic"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-inputs-4">
                            <label className="input-text-label notosans-semi-bold-granite-gray-12px">Owner</label>
                            <div className="input-field">
                                <input
                                    className="type-here notosans-normal-granite-gray-16px"
                                    name="owner"
                                    placeholder="@aluard"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-inputs-3 text-inputs-4">
                            <label className="input-text-label notosans-semi-bold-granite-gray-12px">Sprite</label>
                            <div className="input-field">
                                <input
                                    className="type-here notosans-normal-granite-gray-16px"
                                    name="imgSrc"
                                    placeholder="https://img.pokemondb.net/sprites/black-white/normal/charmander.png"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>

                            <button className="buttons add" type="submit">Add</button>

                    </div>
                </div>
            </div>
        </form>
    );
}