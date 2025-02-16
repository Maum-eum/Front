// 빌드 오류 제거용입니다

import React from 'react';

interface ServiceButtonProps {
  service: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({ service, isSelected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      style={{
        backgroundColor: isSelected ? 'green' : 'gray',
        color: 'white',
        padding: '10px 20px',
        margin: '5px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {service}
    </button>
  );
};

export default ServiceButton;
