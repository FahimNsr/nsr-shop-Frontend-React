import React from 'react';

export default function MessageBox(props) {
  return (
    <div className={`text-center alert alert-${props.variant || 'info'}`}>
      {props.children}
    </div>
  );
}
