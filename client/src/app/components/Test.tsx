import * as React from 'react';
import AnimatedSquare from './AnimatedSquare';

// tslint:disable-next-line:no-empty-interface
export interface ITestProps {
}

export default class Test extends React.PureComponent<ITestProps, {}> {

	public render() {

		return (
			<AnimatedSquare />
		)
	}
}
