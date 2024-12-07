import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styling/ProfilePage.css";
import { BACKEND } from "../global";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation after deletion
  const [pokemonData, setPokemonData] = useState(null);
  const [typeColors, setTypeColors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMovePage, setCurrentMovePage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [moveDetails, setMoveDetails] = useState(null);

  // Fetch Pokémon data from the backend
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`${BACKEND}/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const [data] = await response.json();
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  // Fetch types and their colors
  useEffect(() => {
    const fetchTypeColors = async () => {
      try {
        const response = await fetch(`${BACKEND}/types`);
        if (!response.ok) {
          throw new Error("Failed to fetch type colors");
        }
        const types = await response.json();
        const colors = types.reduce((acc, type) => {
          acc[type.name] = type.color;
          return acc;
        }, {});
        setTypeColors(colors);
      } catch (err) {
        console.error("Error fetching type colors:", err);
      }
    };

    fetchTypeColors();
  }, []);

  // Fetch move details
  const fetchMoveDetails = async (moveId) => {
    try {
      const response = await fetch(`${BACKEND}/moves/${moveId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch move details");
      }
      const [details] = await response.json();
      setMoveDetails(details);
      setModalOpen(true);
    } catch (err) {
      console.error("Error fetching move details:", err);
    }
  };

  // Handle delete Pokémon
  const handleDeletePokemon = async () => {
    try {
      const response = await fetch(`${BACKEND}/pokemon/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete Pokémon");
      }
      alert("Pokémon deleted successfully!");
      navigate("/search");
    } catch (err) {
      console.error("Error deleting Pokémon:", err);
      alert("Failed to delete Pokémon.");
    }
  };

  if (loading) {
    return <p>Loading Pokémon details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!pokemonData) {
    return <p>No Pokémon data found.</p>;
  }

  const {
    name,
    species,
    moves = [],
    type,
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed,
  } = pokemonData;

  const movesPerPage = 8;
  const totalPages = Math.ceil(moves.length / movesPerPage);
  const currentMoves = moves.slice(
    currentMovePage * movesPerPage,
    (currentMovePage + 1) * movesPerPage
  );

  const handleNext = () => {
    setCurrentMovePage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentMovePage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMoveDetails(null);
  };

  return (
    <div className="profile-page">
      <header className="header">
        <Link to="/add" className="blue-circle"></Link>
        <div className="top-left"></div>
        <div className="top-right"></div>
        <div className="middle">
          <div className="middle-left"></div>
          <div className="diagonal"></div>
          <div className="middle-right"></div>
        </div>
      </header>

      {/* Delete Button */}
      <div className="profile-container">
        <div className="profile-main-screen">
          <Link to="/search" className="back-link">
            &larr; Back to Search
          </Link>

          <div className="columns">
            {/* Left Column */}
            <div className="left-column">
              <div className="poke-image">
                <img className="pokemon-profile-pic" src={`https://d14akkxuzny5sc.cloudfront.net/${id}.png`} alt={name} />
              </div>
              <div className="poke-details">
                <h1 className="poke-name">{name}</h1>
                <div className="poke-types">
                  {type.map((t) => (
                    <span
                      key={t.id}
                      className="type"
                      style={{ backgroundColor: typeColors[t.name] }}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
                <h2 className="poke-species">{species}</h2>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Moves */}
              <div className="moves-section">
                <h2 className="moves-label">Moves</h2>
                <div className="moves-carousel-container">
                  <button
                    className="carousel-arrow left-arrow"
                    onClick={handlePrev}
                  ></button>
                  <div className="moves-group">
                    {currentMoves.map((move, index) => (
                      <button
                        key={index}
                        className="move-item"
                        onClick={() => fetchMoveDetails(move.id)}
                      >
                        {move.name}
                      </button>
                    ))}
                  </div>
                  <button
                    className="carousel-arrow right-arrow"
                    onClick={handleNext}
                  ></button>
                </div>
              </div>

              {/* Stats Section */}
              <div className="stats-section">
                <h2 className="stats-label">Stats</h2>
                <div className="stats-group">
                  <div className="profile-stat-item">
                    <span className="profile-stat-name">HP:</span>
                    <span className="profile-stat-value">{hp}</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-name">Attack:</span>
                    <span className="profile-stat-value">{attack}</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-name">Defense:</span>
                    <span className="profile-stat-value">{defense}</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-name">Special Attack:</span>
                    <span className="profile-stat-value">{special_attack}</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-name">Special Defense:</span>
                    <span className="profile-stat-value">{special_defense}</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-name">Speed:</span>
                    <span className="profile-stat-value">{speed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && moveDetails && (
          <div className="modal-overlay" onClick={closeModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal-button" onClick={closeModal}>
                &times;
              </button>
              <h2>{moveDetails.moveName || "N/A"}</h2>
              <p>
                <strong>Type:</strong> {moveDetails.typeName || "N/A"}
              </p>
              <p>
                <strong>Power:</strong> {moveDetails.power ?? "N/A"}
              </p>
              <p>
                <strong>Accuracy:</strong> {moveDetails.accuracy ?? "N/A"}
              </p>
              <p>
                <strong>PP:</strong> {moveDetails.powerPoint ?? "N/A"}
              </p>
            </div>
          </div>
        )}
        <button className="delete-button" onClick={handleDeletePokemon}>
          Delete Pokémon
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;