import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	state = {};

	componentDidMount() {
		setInterval(this.hello, 250);
		this.getContent();
	}

	hello = () => {
		fetch('/api/hello')
			.then(response => response.text())
			.then(message => {
				this.setState({message: message});
			});
	}

	getContent = () => {
		fetch('/graphql/contents', {
			method: 'POST',
			body: `{
				allContents{
					title
					genre
				}
			}`
		})
		.then(response => response.json())
		.then(message => {
			this.setState({allContents: message.data.allContents});
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">{this.state.message}</h1>
					<h2>Your Contents List</h2>
					<ul>
					{
						this.state.allContents && this.state.allContents.map(i => {
							return (<li key={i.title}>{`${i.title} (${i.genre})`}</li>);
						})
					}
					</ul>
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
			</div>
		);
	}
}

export default App;
