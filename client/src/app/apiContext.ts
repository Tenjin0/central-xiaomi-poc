import React, { createContext } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import {ServiceApi} from './service/api'
export interface IApiContext {
	api: ServiceApi
}

const ApiContext = createContext<IApiContext>({
	api: null
});

export const ApiContextProvider = ApiContext.Provider;
  
export const ApiContextConsumer = ApiContext.Consumer;
