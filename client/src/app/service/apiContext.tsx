import * as React from 'react';
import * as io from 'socket.io-client';
import ServiceApi from './api'

export interface IApiContext {
	api: ServiceApi,
	socket: SocketIOClient.Socket 
	
}

const ApiContext = React.createContext<IApiContext>({
	api: null,
	socket: null
});




export const ApiContextProvider = ApiContext.Provider;

export const ApiContextConsumer = ApiContext.Consumer;

export const  withService = <P extends IApiContext>(Comp: React.ComponentClass): React.ComponentClass<P> => {

	class WithService extends React.Component<P> {
		public render() {
			return (
				<ApiContextConsumer>
					{
						apiContext => <Comp {...this.props} {...apiContext} />
					}
				</ApiContextConsumer>)

		}
	}
	return WithService
}

// export const withApi = <P extends object>(
// 	Component: React.ComponentType<P>
//   ): React.SFC<P & IApiContext> => ({
// 	api,
// 	...props
//   }: IApiContext) =>
//    <Component {...props} />;
