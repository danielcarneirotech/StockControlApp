import React from 'react';

import { Loader } from 'react-feather';
import './LoadingIcon.css';

interface LoadingIconProps {
  color?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ color = 'white' }) => {
  return (
    <div className="loading-icon">
      <Loader color={color} className="loader" size={24} />
    </div>
  );
};

export default LoadingIcon;
