import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import '../styles/test.scss';

const colors = ["#ff4f66", "#7971ea", "#5900d8"];

export interface IAnimatedSquareProps { }
export interface IAnimatedSquareState {
	focused: boolean
}


class Container extends React.Component<IAnimatedSquareProps, IAnimatedSquareState> {

	public state = { focused: false };
	public render() {
		return (
			<Flipper flipKey={this.state.focused}>
				<main>
					<h1>The text stays the same size even when the container expands.</h1>
					<ul>
						<li>
							An outer <code>Flipped</code> component animates the container
							square's expansion
						</li>
						<li>
							A nested <code>Flipped</code> component with an{" "}
							<code>inverseFlipId</code> cancels out that transform for
							children
						</li>
						<li>
							A final <code>Flipped</code> component wraps the text inside each square to
							animate the position of the text
						</li>
					</ul>
					<Flipped flipId={"test-1"} >
						<div
							className={this.state.focused ? "focusedItem" :"listItem" }
							style={{ backgroundColor: "#ff4f66" }}
							// tslint:disable-next-line:jsx-no-lambda
							onClick={() => this.setState({ focused: !this.state.focused })}
						>
							<Flipped
								inverseFlipId={"test-1"}
								transformOrigin="0 0"
							>
								<Button variant="fab" color="primary" aria-label="Add"
									// tslint:disable-next-line:jsx-no-lambda
								>
									<AddIcon />
								</Button>
									{/* <Flipped flipId={`${this.state.focused}-text`}>
										<span>
										</span>
									</Flipped> */}
							</Flipped>
						</div>
					</Flipped>

				</main>
			</Flipper>
		);
	}
}

export default Container
