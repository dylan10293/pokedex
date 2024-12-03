import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styling/ProfilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null); // State to store Pokémon data
  const [typeColors, setTypeColors] = useState({}); // State to store type colors
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [currentMovePage, setCurrentMovePage] = useState(0); // Carousel page index
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [moveDetails, setMoveDetails] = useState(null); // State to store move details

  // Fetch Pokémon data from the backend
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/pokemon/${id}`);
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
        const response = await fetch(`http://localhost:8000/types`);
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
      const response = await fetch(`http://localhost:8000/moves/${moveId}`);
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
        <div className="blue-circle"></div>
        <div className="top-left"></div>
        <div className="top-right"></div>
        <div className="middle">
          <div className="middle-left"></div>
          <div className="diagonal"></div>
          <div className="middle-right"></div>
        </div>
      </header>

      <div className="profile-main-screen profile-screen">
        <Link to="/search" className="back-link">
          &larr; Back to Search
        </Link>

        <div className="columns">
          {/* Left Column */}
          <div className="left-column">
            <div className="poke-image">
              <img src={`/images/${id}.png`} alt={name} />
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button className="close-modal-button" onClick={closeModal}>
              &times;
            </button>
            <h2>{moveDetails.moveName}</h2>
            <p>
              <strong>Type:</strong> {moveDetails.typeName}
            </p>
            <p>
              <strong>Power:</strong> {moveDetails.power}
            </p>
            <p>
              <strong>Accuracy:</strong> {moveDetails.accuracy}
            </p>
            <p>
              <strong>PP:</strong> {moveDetails.powerPoint}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;