import React from 'react';
import './ReloadButton.css';

function ReloadButton(props) {
  return (
    <button className="reloadbutton" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default ReloadButton;