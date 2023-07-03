import React from 'react';

const Checkbox = ({ label, checked, onClick}) => {
    const handleChange = () => {
      onClick(!checked);
      
    };
  
    return (
      <div className='m-1' >
        
        <label className={`checkbox-label ${checked ? 'selected' : ''}`}>
          <input className="checkbox-input"   type="checkbox"  checked={checked} onClick={handleChange} />
          
          {label}
        </label>
      </div>
    );
  };
  
  export default Checkbox;