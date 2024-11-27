import '../styling/StartPage.css'

const StartPage = () => {
  return (
    <body>
      <div className="pokedex">
        {/* Top Bar with Buttons */}
        <div className="top-bar">
          <div className="blue-button"></div>
        </div>
        
        {/* Main Pokedex Screen */}
        <div className="main-screen">
          <div className="left-panel">
            <div className="big-screen">
              {/* Big screen where data can be displayed */}
            </div>
            <div className="control-section">

              <div className="control-button red"></div>
              <div className="control-button blue"></div>
            </div>
          </div>
          <div className="right-panel">
            <div className="mini-screen"></div>
            <div className="blue-grid">
              {/* Blue grid area */}
            </div>
            <div className="green-panel">
              {/* Green textured area */}
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default StartPage