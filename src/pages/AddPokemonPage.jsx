import React, { useState, useEffect } from "react";
import "../styling/AddPokemonPage.css";
import { Link } from "react-router-dom";

const AddPokemonPage = () => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [stats, setStats] = useState({
        hp: "",
        attack: "",
        defense: "",
        special_attack: "",
        special_defense: "",
        speed: "",
    });
    const [moves, setMoves] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [moveResults, setMoveResults] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);

    // Fetch types from API
    useEffect(() => {
        fetch("http://localhost:8000/types")
            .then((response) => response.json())
            .then((data) => setTypeOptions(data))
            .catch((error) => console.error("Error fetching types:", error));
    }, []);

    // Fetch moves based on the search query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setMoveResults([]);
            return;
        }

        fetch("http://localhost:8000/moves")
            .then((response) => response.json())
            .then((data) => {
                const filteredMoves = data.filter((move) =>
                    move.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setMoveResults(filteredMoves);
            })
            .catch((error) => console.error("Error fetching moves:", error));
    }, [searchQuery]);

    const handleTypeClick = (type) => {
        if (selectedTypes.includes(type.id)) {
            setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type.id));
        } else if (selectedTypes.length < 2) {
            setSelectedTypes([...selectedTypes, type.id]);
        }
    };

    const handleStatChange = (e) => {
        const { name, value } = e.target;
        setStats((prevStats) => ({ ...prevStats, [name]: value }));
    };

    const handleMoveSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleMoveSelect = (move) => {
        if (!moves.some((m) => m.id === move.id)) {
            setMoves([...moves, move]);
        }
        setSearchQuery(""); // Clear the search input
        setMoveResults([]); // Clear the search results
    };

    const removeMove = (move) => {
        setMoves(moves.filter((m) => m.id !== move.id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPokemon = {
            pokemon_name: document.getElementById("pokemon_name").value,
            species_id: parseInt(document.getElementById("species").value),
            height: parseInt(document.getElementById("height").value),
            weight: parseInt(document.getElementById("weight").value),
            type: selectedTypes,
            moves: moves.map((move) => move.id), // Only save move IDs
            stats: {
                hp: parseInt(stats.hp),
                attack: parseInt(stats.attack),
                defense: parseInt(stats.defense),
                special_attack: parseInt(stats.special_attack),
                special_defense: parseInt(stats.special_defense),
                speed: parseInt(stats.speed),
            },
        };

        try {
            const response = await fetch("http://localhost:8000/pokemon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pokemons: [newPokemon] }),
            });

            if (response.ok) {
                alert("Pokemon added successfully!");
            } else {
                alert("Failed to add Pokemon.");
            }
        } catch (error) {
            console.error("Error adding Pokemon:", error);
            alert("An error occurred.");
        }
    };

    return (
        <>
            <header className="header">
                <div className="blue-circle"></div>
            </header>

            <div className="main-add-screen form-screen">
                <Link to="/search" className="back-link">
                    &larr; Back to Search
                </Link>

                <div className="form-container">
                    <h1 className="form-title">Add Newly Discovered Pokemon</h1>
                    <form className="custom-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="pokemon_name">Name</label>
                            <input
                                type="text"
                                id="pokemon_name"
                                className="add-pokemon-input"
                                placeholder="Enter Pokémon's name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="species">Species ID</label>
                            <input
                                type="number"
                                id="species"
                                className="add-pokemon-input"
                                placeholder="Enter Pokémon's species ID"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Moves</label>
                            <div className="add-moves-container">
                                <input
                                    type="text"
                                    className="add-move-input"
                                    placeholder="Search and select moves"
                                    value={searchQuery}
                                    onChange={handleMoveSearchChange}
                                />
                                {moveResults.length > 0 && (
                                    <div className="move-results-dropdown">
                                        {moveResults.map((move) => (
                                            <div
                                                key={move.id}
                                                className="move-result-item"
                                                onClick={() => handleMoveSelect(move)}
                                            >
                                                {move.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <ul className="add-moves-list">
                                    {moves.map((move) => (
                                        <li key={move.id} className="add-move-item">
                                            {move.name}
                                            <button
                                                type="button"
                                                className="remove-move-button"
                                                onClick={() => removeMove(move)}
                                            >
                                                ✖
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Type(s)</label>
                            <div className="type-buttons">
                                {typeOptions.map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        className={`type-button ${selectedTypes.includes(type.id) ? "active" : ""}`}
                                        style={{ backgroundColor: type.color }}
                                        onClick={() => handleTypeClick(type)}
                                    >
                                        {type.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stats</label>
                            <div className="add-stat-input-group">
                                {Object.keys(stats).map((stat) => {
                                    // Format the label: capitalize and replace underscores with spaces
                                    const formattedStat = stat
                                        .split('_') // Split words on underscore
                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                                        .join(' '); // Rejoin words with a space

                                    return (
                                        <div key={stat} className="add-stat-item">
                                            <label className="add-stat-label">{formattedStat}</label>
                                            <input
                                                type="number"
                                                name={stat}
                                                className="add-stat-input"
                                                value={stats[stat]}
                                                onChange={handleStatChange}
                                                placeholder={`Enter value`}
                                                required
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddPokemonPage;