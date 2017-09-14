import { Dialog } from 'react-weui';
import React from 'react';
export default (props) => {
  const { title, buttons, show, content } = props;
  return (
    <Dialog type='ios' title={title} buttons={buttons} show={show}>
      {content}
    </Dialog>
  );
};
