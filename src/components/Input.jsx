import React from 'react';

const Input = ({ label, name, defaultValue, type, required, readOnly }) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3 m-auto text-center rounded-md text-black text-lg'>
      <span>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className='input rounded-md	mb-2 border-2	border-gray-300'
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </label>
  );
};

export default Input;