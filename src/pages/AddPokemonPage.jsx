import React, { useState } from 'react';
import '../styling/AddPokemonPage.css';
import { Link } from 'react-router-dom';
import { typeColors } from '../static';
import {typeOptions } from '../static';

const FormPage = () => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [stats, setStats] = useState({
        hp: '',
        attack: '',
        defense: '',
        special_attack: '',
        special_defense: '',
        speed: ''
    });
    const [moves, setMoves] = useState([]);
    const [currentMove, setCurrentMove] = useState('');

    const handleTypeClick = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(selectedType => selectedType !== type));
        } else if (selectedTypes.length < 2) {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const handleStatChange = (e) => {
        const { name, value } = e.target;
        setStats({ ...stats, [name]: value });
    };

    const handleMoveChange = (e) => {
        setCurrentMove(e.target.value);
    };

    const handleMoveSubmit = (e) => {
        e.preventDefault();
        if (currentMove.trim() !== '' && !moves.includes(currentMove.trim())) {
            setMoves([...moves, currentMove.trim()]);
            setCurrentMove('');
        }
    };

    const removeMove = (move) => {
        setMoves(moves.filter(m => m !== move));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected Types:', selectedTypes);
        console.log('Stats:', stats);
        console.log('Moves:', moves);
    };

    return (
        <>
            <header className="header">
                <div className="blue-circle"></div>
                <div className="top-left"></div>
                <div className="top-right"></div>
                <div className="middle">
                    <div className="middle-left"></div>
                    <div className="diagonal"></div>
                    <div className="middle-right"></div>
                </div>
            </header>

            <div className="main-add-screen form-screen">
                <Link to="/search" className="back-link">&larr; Back to Search</Link>

                <div className="form-container">
                    <h1 className="form-title">Add Newly Discovered Pokemon</h1>
                    <form className="custom-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="pokemon_name">Name</label>
                            <input type="text" id="pokemon_name" className="add-pokemon-input" placeholder="Enter Pokémon's name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="species">Species</label>
                            <input type="text" id="species" className="add-pokemon-input" placeholder="Enter Pokémon's species" />
                        </div>

                        <div className="form-group">
                            <label>Type(s)</label>
                            <div className="type-buttons">
                                {typeOptions.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`type-button ${selectedTypes.includes(type) ? 'active' : ''}`}
                                        style={{ backgroundColor: typeColors[type] }}
                                        onClick={() => handleTypeClick(type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Stats</label>
                            <div className="add-stat-input-group">
                                {['hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed'].map((stat) => (
                                    <div key={stat} className="add-stat-item">
                                        <label htmlFor={stat} className="add-stat-label">{stat.replace('_', ' ')}</label>
                                        <input
                                            type="number"
                                            id={stat}
                                            name={stat}
                                            className="add-stat-input"
                                            placeholder={0}
                                            value={stats[stat]}
                                            onChange={handleStatChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
    <label>Moves</label>
    <div className="add-moves-container">
        <input
            type="text"
            className="add-move-input"
            placeholder="Enter a move and press Enter"
            value={currentMove}
            onChange={handleMoveChange}
            onKeyPress={(e) => e.key === 'Enter' && handleMoveSubmit(e)}
        />
        <ul className="add-moves-list">
            {moves.map((move, index) => (
                <li key={index} className="add-move-item">
                    {move}
                    <button type="button" className="remove-move-button" onClick={() => removeMove(move)}>✖</button>
                </li>
            ))}
        </ul>
    </div>
</div>

                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormPage;