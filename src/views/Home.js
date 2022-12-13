import React from 'react';
// import sections
import Hero from '../components/sections/Title';
import FeaturesTiles from '../components/sections/Features';
import FeaturesSplit from '../components/sections/Steps';

import Cta from '../components/sections/Claim';

const Home = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
     
    </>
  );
}

export default Home;