import React, { createContext } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes

export interface IApiContext {
	api: any
}

const ApiContext = createContext<IApiContext>({
	api: null
});

export const ApiContextProvider = ApiContext.Provider;
  
export const ApiContextConsumer = ApiContext.Consumer;
