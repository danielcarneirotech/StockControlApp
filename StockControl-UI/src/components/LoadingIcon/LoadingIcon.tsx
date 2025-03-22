import React from 'react';

import './LoadingIcon.css';
import { Loader } from 'react-feather';

const LoadingIcon: React.FC = () => {
  return (
    <div className="loading-icon">
      <Loader color="white" className="loader" size={24} />
    </div>
  );
};

export default LoadingIcon;
