import React from 'react';


function PricingComponent() {
  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Precios</h1>
        <p>Nuestros precios no son caros, pero tampoco baratos, es exactamente lo que debería ser</p>
      </div>
      <div className="pricing-cards-container">
        <div className="pricing-card free">
          <h3>Free</h3>
          <p className="price">€0 <span>por mes</span></p>
          <p>De 0 a 20 miembros</p>
          <button>Empezar con Free</button>
        </div>
        <div className="pricing-card basic">
          <h3>Basic</h3>
          <p className="price">€5 <span>/mes</span></p>
          <p>De 1 a 100 miembros</p>
          <button>Empezar con Basic</button>
        </div>
        <div className="pricing-card pro most-popular">
          <h3>Pro</h3>
          <p className="price">€500 <span>por mes</span></p>
          <p>De 101 a 1,000 miembros</p>
          <button>Empezar con Pro</button>
          <div className="most-popular-tag">Más Popular</div>
        </div>
        <div className="pricing-card business">
          <h3>Business</h3>
          <p className="price">€1500 <span>por mes</span></p>
          <p>Más de 1,001 miembros</p>
          <button>Empezar con Business</button>
        </div>
      </div>

    </div>
  );
}

export default PricingComponent;
