import { MdSwitch } from '@material/web/switch/switch.js';
import React from 'react';
import { createComponent } from '@lit/react';

export default createComponent({
  tagName: 'md-switch',
  elementClass: MdSwitch,
  react: React,
  events: {
    onChange: 'change',
  },
});
