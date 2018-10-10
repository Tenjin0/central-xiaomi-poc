import * as React from 'react';

export interface HelloProps {
}

export default class Hello extends React.Component<HelloProps, any> {
  public render() {
	return (
	  <div>
		Hello
	  </div>
	);
  }
}
