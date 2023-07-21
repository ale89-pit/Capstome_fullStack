import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { GiChewedHeart } from 'react-icons/gi';
import { useParams } from 'react-router';

const Checkbox = ({ label, checked, onClick, descr }) => {

  const param = useParams()
  let id = param.id


  const handleChange = () => {
    onClick(!checked);

  };

  useEffect(() => {

  }, [id])

  return (
    <div style={{ width: "80px" }} className='m-1 d-flex flex-column align-items-center justify-content-center' >
      <Form.Label style={{ fontSize: "0.9em" }}>{descr}</Form.Label>
      <label className={`checkbox-label ${checked ? 'selected' : ''}`}>
        <input className="checkbox-input" type="checkbox" checked={checked} onClick={handleChange} />

        {label}
      </label>
    </div>
  );
};

export default Checkbox;