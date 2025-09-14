import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import tendrLogo from '../../assets/logos/tendr-logo-secondary.png';
import PlatformFlow from "../../components/PlatformFlow";
import BasicSpeedDial from '../../components/BasicSpeedDial';
import Footer from '../../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9211668427', '_blank');
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleBookingClick = () => {
    navigate('/booking');
  };

  const handlePartnerClick = () => {
    navigate('/vendor/register');
  };

  const handleCorporateClick = () => {
    navigate('/corporate-signup');
  };

  const handledropdownChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'timeline-picker') {
      navigate('/timeline-picker');
    } else if (selectedValue === 'aftermovie') {
      navigate('/aftermovie');
    }
    else if(selectedValue =='checklist'){
       navigate('/checklist-picker');
    }
    else if(selectedValue =='invitation'){
       navigate('/invitation');
    }
  }

  const services = [
    {
      id: 1,
      title: 'Photography',
      image: 'https://artincontext.org/wp-content/uploads/2022/07/What-Is-the-Definition-of-Fine-Art-Photography.avif'
    },
    {
      id: 2,
      title: 'Entertainment',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Decor',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Catering',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Dinner Eve',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Family Gathering',
      image: 'https://belvederebanquets.com/wp-content/uploads/2024/02/Belvedere-Family-Reunion-Ideas-Create-New-Memories-With-Fun-Activities.jpg'
    },
    {
      id: 3,
      title: 'Lunch Celebrations',
      image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=500&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Marriage Ceremony',
      image: 'https://seasons5.com.au/wp-content/uploads/2024/06/luxury-wedding-trends.jpg'
    },
    {
      id: 5,
      title: 'Magical Ring Ceremony',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&h=400&fit=crop'
    }
  ];

  const features = [
    {
      id: 1,
      icon: '🏢',
      title: 'Corporate Events',
      description: 'Meetings, conferences, and seminars'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Team Building',
      description: 'Engaging activities and workshops'
    },
    {
      id: 3,
      icon: '🏆',
      title: 'Award Ceremonies',
      description: 'Recognition events and galas'
    }
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <div className={`fixed bottom-2 right-1 z-50 transform transition-all duration-500 ${scrolled ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}>
        <BasicSpeedDial />
      </div>
      <nav className={`fixed top-0 left-0 w-full z-50 bg-white shadow transition-transform duration-500 ease-in-out
          ${scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>
        <div className="nav">
          <a href="#" className="logo" onClick={handleLogoClick}>
            <img src={tendrLogo} alt="Tendr - We Curate You Celebrate" className="logo-img" />
          </a>
          <div className="nav-buttons">
            <select className="mx-10 "onClick={handledropdownChange}>
              <option value="" disabled selected>Tendr Utilities</option>
              <option value="checklist">Checklist</option>
              <option value="timeline-picker">Timeline</option>
              <option value="aftermovie">Aftermovie</option>
              <option value="invitaion">Invitaion Flyers</option>
            </select>
            <a 
              href="https://wa.me/1234567890" 
              className="contact-icon whatsapp-icon" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              💬
            </a>
            <a href="/login" className="sign-in" onClick={handleSignInClick}>
              Sign in
            </a>
            <a href="/signup" className="sign-up" onClick={handleSignUpClick}>
              Sign Up
            </a>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Experience Event Planning</h1>
          <p className="hero-subtitle">We Curate You Celebrate</p>
          <button className="cta-button" onClick={handleBookingClick}>
            Booking
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="services-container">
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div
                  className="service-image"
                  style={{ backgroundImage: `url('${service.image}')` }}
                ></div>
                <h3>{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Booking Section */}
      <section className="corporate-booking-section">
        <div className="corporate-container">
          <div className="corporate-content">
            <div className="corporate-text">
              <span className="corporate-badge">Professional Services</span>
              <h2 className="corporate-title">Corporate Event Planning</h2>
              <p className="corporate-description">
                Elevate your business events with our comprehensive corporate planning services. 
                From executive meetings to large-scale conferences, we handle every detail with 
                professional excellence.
              </p>
              <div className="corporate-features">
                {features.map((feature) => (
                  <div key={feature.id} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-text">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#corporate-contact" className="corporate-btn" onClick={handleCorporateClick}>
                Book Corporate Events
              </a>
            </div>
            <div className="corporate-image">
              <div 
                className="corporate-img" 
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=500&fit=crop')` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Events Gallery */}
      <section className="events-section" id="events">
        <div className="events-container">
          <div className="events-header">
            <p className="events-subtitle">A tour of events we have executed.</p>
            <h2 className="events-title">A Glimpse Into Our Events</h2>
          </div>
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div
                  className="event-image"
                  style={{ backgroundImage: `url('${event.image}')` }}
                >
                  <div className="event-overlay">
                    <h3>{event.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="partner-section">
        <div className="partner-content">
          <h2>Become a Partner</h2>
          <p>3 easy steps to join the tendr!</p>
          <button className="partner-btn" onClick={handlePartnerClick}>
            Start Here
          </button>
          <div className="partner-visual"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;
