import React from 'react';

import Logo from './Logo';

const Hero = () => (
  <div className="hero my-5 text-center" data-testid="hero">
    {/* <Logo testId="hero-logo" /> */}
    <h1 className="mb-4" data-testid="hero-title">
      TOURNAMENT FRENZY
    </h1>

    <p className="lead" data-testid="hero-lead">
      This is a sample application that demonstrates tournaments!
      <a href="https://github.com/">My GitHUB!</a>
    </p>
  </div>
);

export default Hero;
