import * as React from 'react';
import * as pug from "pug";

export const Test = () => pug`
  .wrapper
    if props.shouldShowGreeting
      p.greeting Hello World!
`
 
    //button(onClick={() => alert("test")}) Click Me