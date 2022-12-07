import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const ModelContext=createContext()
const ModelProvider = ({children}) => {
    let[toggle,setToggle]=useState(false);
    let[apiChanger,setApiChanger]=useState(false);
    let[movieTrailer,setMovieTrailer]=useState("");
    let[loginToggle,setLoginToggle]=useState(false);
  return (
    <ModelContext.Provider value={{toggle,setToggle,setApiChanger,apiChanger,setMovieTrailer,movieTrailer,loginToggle,setLoginToggle}}>
        {children}
    </ModelContext.Provider>
    )
}

export default ModelProvider;