/**
 * NOTE: I'm making a mix of all the videos, but I'll add comments to
 * be as specific as I can. Instead of creating new components for every video
 * I reuse the same component but adding the new features.
 * You will also find some txt values that are different, but the functionality
 * will remain exactly the same way
 * @author @derrickroccka
 */

//We'll start importing React
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * THIS IS THE FIRST METHOD USED TO CREATE A COMPONENT WITH JSX
 * THIS IS NOT STATELESS
 * @author @derrickroccka
 */
class App extends React.Component {
	//App component constructor
	constructor(){
		super();
		this.state = {
			txt: 'We are the same state property (txt)',
			cat: 0,
			red: 0,
			green: 0,
			blue: 0,
			val: 9
		};
		this.update = this.update.bind(this)
	}

	//Update is called after action on the DOM
	update(e){
		this.setState({
			txt: e.target.value,
			red: ReactDOM.findDOMNode(this.refs.red).value,
			green: ReactDOM.findDOMNode(this.refs.green).value,
			blue: ReactDOM.findDOMNode(this.refs.blue).value,
			val: this.state.val + 1
		})
	}
	componentWillMount(){
		console.log('mounting');
		/////////////////////////////////////////////////////
		/**
		 *
		 * 10th video Component lifecycle mounting usage
		 * Starts with this line
		 *
		 */
			/////////////////////////////////////////////////////
		this.setState({m:2});

	}
	//This method will render our component
	render(){
		console.log('rendering!!!');
		//stores txt prop value
		let txt = this.props.txt;
		//Its good to wrap elements into parentheses
		//It is necessary to wrap jsx in a main tag (example: <div>)
		return (
			<div>
				<div>
					<h1>Hi</h1>
					<b>Bold</b>
					{/* A JSX comment - Pay attention: props are not state
					 so this won't change when we are calling update
					 This is passed when the app starts and its not modified*/}
					<h2>{txt}</h2>
				</div>
				<hr/>
				<div>
					{/* This will call update everytime we type something */}
					<input type="text" onChange={this.update} />
					<h3>{this.state.txt}</h3>
				</div>
				{/* This does the same as the code above,
					but using the Widget const below
					This will modify the same state property*/}
				<Widget txt={this.state.txt} update={this.update} />
				<hr/>
				{/* RGB SLIDERS USING REFS
				 The txt changes too because txt is referenced to the value of the target
				 in this case the input range that we are moving
				 Take a look at the Slider class below*/}
				<Slider ref="red" update={this.update} />
				{this.state.red}
				<br/>
				<Slider ref="green" update={this.update} />
				{this.state.green}
				<br/>
				<Slider ref="blue" update={this.update} />
				{this.state.blue}
				<br/>
				<hr/>
				{/* Accessing child properties (8th video) starts with this button
					Similar to Angular transclusion*/}
				<button> I <Heart/> React</button>
				<hr/>
				{/* lifecycle mounting basics (9th video)*/}
				<button onClick={this.update} value="lol">{this.state.val}</button>
				<hr/>
				{/* lifecycle mount (10th video)*/}
				<button onClick={this.update} value="lol">{this.state.val*this.state.m}</button>
			</div>
		)
	}
	componentDidMount(){
		console.log('mounted');
		//this will call update once the component is mounted every 0.5s (10th video)
		this.inc = setInterval(this.update, 500);
	}
	componentWillUnmount(){
		console.log('bye!');
		//clearing the interval set above (10th video)
		//this is done to prevent the error that is shown when we unmount
		//and call something that is unmounted
		clearInterval(this.inc);
	}
}

//Types of the properties of the element that we're working at
App.propTypes = {
	txt: React.PropTypes.string,
	cat: React.PropTypes.number.isRequired
}

//Default values for props. (If not speficied in the element)
App.defaultProps = {
	txt: 'Default txt'
}

/////////////////////////////////////////////////////
/**
 *
 * ALTERNATIVE WAYS TO CREATE AN ELEMENT
 *
 */
/////////////////////////////////////////////////////

/**
 * THIS IS THE SAME, BUT WITHOUT JSX
 * null will be explained later
 */
//class App extends React.Component {
//	render(){
//		return React.createElement('h1', null, 'Hi')
//	}
//}

/**
 * THIS IS THE SAME BUT SHORTER (ES6 ARROW FUNCTIONS + JSX)
 * THE POINT IS THAT THIS IS STATELESS. BE CAREFUL!!
 */
//const App = () => <h1>Hi</h1>


/////////////////////////////////////////////////////
/**
 *
 * Owner Ownee (6th video) exercise related
 * A component renders another component
 * @author @derrickroccka
 */
/////////////////////////////////////////////////////

const Widget = (props) => {
	return (
		<div>
			<input type="text" onChange={props.update}/>
			<h3>{props.txt}</h3>
		</div>
	)
}

/////////////////////////////////////////////////////
/**
 *
 * Usign Refs to Access (7th video) exercise related
 * A way to reference an instance of a component of
 * our React App
 * Refs won't work with stateless components
 * @author @derrickroccka
 */
/////////////////////////////////////////////////////

class Slider extends React.Component {
	render(){
		return (
			<input type="range"
				min="0"
				max="255"
				onChange={this.props.update}/>
		)
	}
}

/////////////////////////////////////////////////////
/**
 *
 * Accessing Child Properties
 *
 */
/////////////////////////////////////////////////////

/**
 * Stateless component that returns a span with a bootstrap heart
 * @author @derrickroccka
 */
const Heart = () => <span className="glyphicon glyphicon-heart"></span>;

/**
 * Button component that returns a button
 * Do not get confused: is Button not button
 * so be careful
 */
class Button extends React.Component {
	render(){
		return <button>{this.props.children}</button>
	}
}

/////////////////////////////////////////////////////
/**
 *
 * Component lifecycle mounting basics (9th video)
 *
 */
/////////////////////////////////////////////////////

/**
 * This will create a wrapper that will contain the
 * App element inside. We are focused on mounting
 * and unmounting elements, so the point is that with
 * mount/unmount buttons, the app is appearing and
 * disappearing in the screen.
 *
 */
class Wrapper extends React.Component {
	constructor(){
		super();
	}
	mount(){
		ReactDOM.render(<App />, document.getElementById('a'));
	}
	unmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById('a'));
	}
	render(){
		return (
			<div>
				<button onClick={this.mount.bind(this)}>Mount</button>
				<button onClick={this.unmount.bind(this)}>Unmount</button>
				<div id="a"></div>
			</div>
		)
	}
}
export default Wrapper
//Exposing the App component (this was commented on the 9th video and changed by the line above
//export default App
