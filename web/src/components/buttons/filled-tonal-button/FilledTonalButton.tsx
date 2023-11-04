import { createComponent } from '@lit/react';
import { MdFilledTonalButton } from '@material/web/button/filled-tonal-button';
import React from 'react';

export default createComponent({
  tagName: 'md-filled-tonal-button',
  elementClass: MdFilledTonalButton,
  react: React,
  events: {
    onClick: 'click',
  },
});
