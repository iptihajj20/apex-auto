import { useState } from "react";
import "./App.css";

import harrier from "./assets/cars/harrier.jpg";
import crown from "./assets/cars/crown.jpg";
import prado from "./assets/cars/prado.jpg";

const vehicles = [
  {
    id: "01",
    name: "Toyota Harrier",
    category: "SUV",
    image: harrier,
    price: "KSh 4,850,000",
    year: "2022",
    mileage: "38,000 KM",
    engine: "2.0L",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "5 Seats",
  },
  {
    id: "02",
    name: "Toyota Crown",
    category: "SEDAN",
    image: crown,
    price: "KSh 5,200,000",
    year: "2023",
    mileage: "25,000 KM",
    engine: "2.5L",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: "5 Seats",
  },
  {
    id: "03",
    name: "Land Cruiser Prado",
    category: "SUV",
    image: prado,
    price: "KSh 7,950,000",
    year: "2022",
    mileage: "42,000 KM",
    engine: "2.8L",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "7 Seats",
  },
];

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    buyingType: "Retail",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const closeVehicleDetails = () => {
    setSelectedVehicle(null);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesCategory =
      activeFilter === "ALL" || vehicle.category === activeFilter;

    const matchesSearch = vehicle.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleVehicleEnquiry = (vehicle) => {
    setSelectedVehicle(null);

    setFormData((current) => ({
      ...current,
      vehicle: vehicle.name,
    }));

    setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const sendWhatsAppEnquiry = (vehicle = null) => {
    const vehicleName =
      vehicle?.name || formData.vehicle || "a vehicle";

    const message = `Hello Apex Auto,

I am interested in the ${vehicleName}.

Buying type: ${formData.buyingType}

Please share more details, availability and the next steps.

Thank you.`;

    const whatsappUrl =
      `https://wa.me/254115747135?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const sendFormToWhatsApp = () => {
    const message = `Hello Apex Auto,

I would like to make a vehicle enquiry.

Name: ${formData.name}

Phone: ${formData.phone}

Email: ${formData.email}

Vehicle: ${formData.vehicle}

Buying Type: ${formData.buyingType}

Message:

${formData.message}`;

    const whatsappUrl =
      `https://wa.me/254115747135?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const resetSearch = () => {
    setSearchTerm("");
    setActiveFilter("ALL");
  };

  return (
    <div className="app">

      {/* NAVIGATION */}

      <header className="navbar">
        <a href="#home" className="logo">
          <span>APEX</span>
          <small>AUTO</small>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#vehicles">Vehicles</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="nav-button">
          GET IN TOUCH
        </a>
      </header>

      <main>

        {/* HERO */}

        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              RETAIL & WHOLESALE VEHICLES
            </p>

            <h1>
              DRIVE
              <br />
              <span>WHAT'S NEXT.</span>
            </h1>

            <p className="hero-description">
              Discover quality vehicles selected for performance,
              reliability and value. Find your next vehicle with Apex Auto.
            </p>

            <div className="hero-actions">
              <a
                href="#vehicles"
                className="button button-primary"
              >
                EXPLORE VEHICLES
              </a>

              <a
                href="#contact"
                className="button button-outline"
              >
                CONTACT US
              </a>
            </div>
          </div>

          <div className="hero-side">
            <span className="hero-line"></span>

            <p>
              QUALITY
              <br />
              VEHICLES
            </p>
          </div>
        </section>

        {/* INTRODUCTION */}

        <section className="intro">
          <p className="section-label">
            WHY APEX AUTO
          </p>

          <h2>
            More than a car.
            <br />
            <span>It's your next move.</span>
          </h2>

          <p className="intro-description">
            Whether you're buying for personal use, business or resale,
            Apex Auto connects you with vehicles that match your needs.
          </p>
        </section>

        {/* VEHICLES */}

        <section className="vehicles" id="vehicles">
          <div className="section-header">
            <div>
              <p className="section-label">
                OUR COLLECTION
              </p>

              <h2>
                Featured Vehicles
              </h2>
            </div>

            <p className="vehicle-count">
              {filteredVehicles.length} VEHICLE
              {filteredVehicles.length !== 1 ? "S" : ""}
            </p>
          </div>

          <div className="vehicle-controls">

            <div className="vehicle-filters">
              <button
                type="button"
                className={
                  activeFilter === "ALL"
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setActiveFilter("ALL")}
              >
                ALL VEHICLES
              </button>

              <button
                type="button"
                className={
                  activeFilter === "SUV"
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setActiveFilter("SUV")}
              >
                SUV
              </button>

              <button
                type="button"
                className={
                  activeFilter === "SEDAN"
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setActiveFilter("SEDAN")}
              >
                SEDAN
              </button>
            </div>

            <div className="vehicle-search">
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>
          </div>

          {filteredVehicles.length > 0 ? (
            <div className="vehicle-grid">

              {filteredVehicles.map((vehicle) => (
                <article
                  className="vehicle-card"
                  key={vehicle.id}
                >

                  <div className="vehicle-image">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                    />

                    <span className="vehicle-number">
                      {vehicle.id}
                    </span>

                    <span className="vehicle-status">
                      AVAILABLE
                    </span>
                  </div>

                  <div className="vehicle-content">

                    <div className="vehicle-category-row">
                      <span className="vehicle-category">
                        {vehicle.category}
                      </span>

                      <span className="stock-status">
                        IN STOCK
                      </span>
                    </div>

                    <h3>
                      {vehicle.name}
                    </h3>

                    <div className="vehicle-meta">
                      <span>
                        {vehicle.transmission}
                      </span>

                      <span>
                        {vehicle.fuel}
                      </span>

                      <span>
                        {vehicle.seats}
                      </span>
                    </div>

                    <div className="vehicle-specs">

                      <div>
                        <small>YEAR</small>
                        <strong>{vehicle.year}</strong>
                      </div>

                      <div>
                        <small>MILEAGE</small>
                        <strong>{vehicle.mileage}</strong>
                      </div>

                      <div>
                        <small>ENGINE</small>
                        <strong>{vehicle.engine}</strong>
                      </div>

                    </div>

                    <div className="vehicle-footer">

                      <strong className="vehicle-price">
                        {vehicle.price}
                      </strong>

                      <button
                        type="button"
                        className="details-button"
                        onClick={() =>
                          setSelectedVehicle(vehicle)
                        }
                      >
                        VIEW DETAILS
                      </button>

                    </div>
                  </div>
                </article>
              ))}

            </div>
          ) : (
            <div className="no-results">

              <h3>
                No vehicles found.
              </h3>

              <p>
                Try another vehicle name or select
                a different category.
              </p>

              <button
                type="button"
                onClick={resetSearch}
              >
                RESET SEARCH
              </button>

            </div>
          )}
        </section>

        {/* SERVICES */}

        <section className="services" id="services">

          <p className="section-label">
            WHAT WE OFFER
          </p>

          <h2>
            Built around
            <br />
            your needs.
          </h2>

          <div className="service-list">

            <div className="service-item">
              <span>01</span>

              <div>
                <h3>
                  Vehicle Sales
                </h3>

                <p>
                  Quality vehicles for individual
                  and business buyers.
                </p>
              </div>
            </div>

            <div className="service-item">
              <span>02</span>

              <div>
                <h3>
                  Wholesale
                </h3>

                <p>
                  Vehicle solutions for dealers
                  and resellers.
                </p>
              </div>
            </div>

            <div className="service-item">
              <span>03</span>

              <div>
                <h3>
                  Vehicle Sourcing
                </h3>

                <p>
                  We'll help you find a vehicle
                  that fits your requirements.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT */}

        <section className="about" id="about">

          <div className="about-heading">
            <p className="section-label">
              ABOUT APEX AUTO
            </p>

            <h2>
              Drive with confidence.
            </h2>
          </div>

          <p className="about-description">
            Apex Auto is a modern vehicle dealership
            focused on providing dependable vehicles
            and a straightforward buying experience.
            From individual buyers to wholesale clients,
            we make the process simple.
          </p>

        </section>

        {/* CONTACT */}

        <section className="contact" id="contact">

          <div className="contact-heading">

            <p className="section-label">
              START YOUR SEARCH
            </p>

            <h2>
              Your next vehicle
              <br />
              <span>starts here.</span>
            </h2>

          </div>

          <div className="enquiry-layout">

            <div className="contact-info">

              <p className="contact-intro">
                Tell us what you're looking for and
                our team will get back to you with
                the right options.
              </p>

              <div className="contact-details">

                <div>
                  <small>
                    CALL / WHATSAPP
                  </small>

                  <a href="tel:+254115747135">
                    0115747135
                  </a>
                </div>

                <div>
                  <small>
                    BUSINESS TYPE
                  </small>

                  <p>
                    Retail & Wholesale
                  </p>
                </div>

                <div>
                  <small>
                    LOCATION
                  </small>

                  <p>
                    Kenya
                  </p>
                </div>

              </div>
            </div>

            {/* ENQUIRY FORM */}

            <form
              className="enquiry-form"
              onSubmit={handleSubmit}
            >

              {submitted && (
                <div className="success-message">
                  Your enquiry is ready. Click the
                  WhatsApp button below to send it
                  directly to Apex Auto.
                </div>
              )}

              <div className="form-row">

                <div className="form-field">
                  <label htmlFor="name">
                    FULL NAME
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">
                    PHONE NUMBER
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

              </div>

              <div className="form-field">

                <label htmlFor="email">
                  EMAIL ADDRESS
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

              </div>

              <div className="form-row">

                <div className="form-field">

                  <label htmlFor="vehicle">
                    VEHICLE INTERESTED IN
                  </label>

                  <select
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">
                      Select a vehicle
                    </option>

                    {vehicles.map((vehicle) => (
                      <option
                        key={vehicle.id}
                        value={vehicle.name}
                      >
                        {vehicle.name}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="form-field">

                  <label htmlFor="buyingType">
                    BUYING TYPE
                  </label>

                  <select
                    id="buyingType"
                    name="buyingType"
                    value={formData.buyingType}
                    onChange={handleInputChange}
                  >
                    <option value="Retail">
                      Retail
                    </option>

                    <option value="Wholesale">
                      Wholesale
                    </option>
                  </select>

                </div>

              </div>

              <div className="form-field">

                <label htmlFor="message">
                  MESSAGE
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us what you're looking for..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>

              </div>

              <div className="form-buttons">

                <button
                  type="submit"
                  className="submit-button"
                >
                  REVIEW ENQUIRY
                </button>

                <button
                  type="button"
                  className="whatsapp-form-button"
                  onClick={sendFormToWhatsApp}
                >
                  SEND VIA WHATSAPP
                </button>

              </div>

            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-brand">
          <strong>
            APEX AUTO
          </strong>

          <span>
            RETAIL & WHOLESALE
          </span>
        </div>

        <p>
          © 2026 Apex Auto. All rights reserved.
        </p>

        <p>
          Powered by TechSolve
        </p>

      </footer>

      {/* VEHICLE DETAILS MODAL */}

      {selectedVehicle && (
        <div
          className="vehicle-modal"
          onClick={closeVehicleDetails}
        >

          <div
            className="vehicle-modal-box"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="modal-close"
              onClick={closeVehicleDetails}
              aria-label="Close vehicle details"
            >
              CLOSE
            </button>

            <div className="modal-image">

              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
              />

            </div>

            <div className="modal-content">

              <div className="modal-title-row">

                <div>

                  <p className="section-label">
                    {selectedVehicle.category}
                  </p>

                  <h2>
                    {selectedVehicle.name}
                  </h2>

                </div>

                <span className="modal-status">
                  AVAILABLE
                </span>

              </div>

              <p className="modal-price">
                {selectedVehicle.price}
              </p>

              <div className="modal-specs">

                <div>
                  <small>YEAR</small>
                  <strong>
                    {selectedVehicle.year}
                  </strong>
                </div>

                <div>
                  <small>MILEAGE</small>
                  <strong>
                    {selectedVehicle.mileage}
                  </strong>
                </div>

                <div>
                  <small>ENGINE</small>
                  <strong>
                    {selectedVehicle.engine}
                  </strong>
                </div>

                <div>
                  <small>TRANSMISSION</small>
                  <strong>
                    {selectedVehicle.transmission}
                  </strong>
                </div>

                <div>
                  <small>FUEL</small>
                  <strong>
                    {selectedVehicle.fuel}
                  </strong>
                </div>

                <div>
                  <small>SEATING</small>
                  <strong>
                    {selectedVehicle.seats}
                  </strong>
                </div>

              </div>

              <div className="modal-actions">

                <a
                  href="tel:+254115747135"
                  className="modal-call"
                >
                  CALL TO ENQUIRE
                </a>

                <button
                  type="button"
                  className="modal-whatsapp"
                  onClick={() =>
                    sendWhatsAppEnquiry(selectedVehicle)
                  }
                >
                  WHATSAPP ENQUIRY
                </button>

                <button
                  type="button"
                  className="modal-enquire"
                  onClick={() =>
                    handleVehicleEnquiry(selectedVehicle)
                  }
                >
                  FULL ENQUIRY FORM
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;