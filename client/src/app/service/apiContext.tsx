import * as React from 'react';
import { ServiceApi } from './api'
export interface IApiContext {
	api: ServiceApi
}

const ApiContext = React.createContext<IApiContext>({
	api: null
});




export const ApiContextProvider = ApiContext.Provider;

export const ApiContextConsumer = ApiContext.Consumer;

export const  withApi = <P extends IApiContext>(Comp: React.ComponentClass): React.ComponentClass<P> => {

	class WithApi extends React.Component<P> {
		public render() {
			return (
				<ApiContextConsumer>
					{
						apiContext => <Comp {...this.props} {...apiContext} />
					}
				</ApiContextConsumer>)

		}
	}
	return WithApi
}

// export const withApi = <P extends object>(
// 	Component: React.ComponentType<P>
//   ): React.SFC<P & IApiContext> => ({
// 	api,
// 	...props
//   }: IApiContext) =>
//    <Component {...props} />;
