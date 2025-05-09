import { useState } from 'react';
import { createContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export let counterContext = createContext(); // لاحظ الاسم بحرف كبير

export default function CounterContextProvider(props) {

  const [counter, setCounter] = useState(0); 

  return (
    // {{}} pinding >> opject
    <counterContext.Provider value={ {counter, setCounter} } > 
      {props.children}  
    </counterContext.Provider>
  );
}

// context or counterContext >>> provide>>> the value/data >> to all other children components through (props)
