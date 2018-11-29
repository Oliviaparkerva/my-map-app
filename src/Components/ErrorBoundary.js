import React, {Component} from 'react';

class ErrorBoundary extends Component{

	constructor(props){
		super(props);
		this.state = {
			hasError:false,
			error: null,
			info:null,
		}
	}

componentDidCatch(error,info){
		this.setState({
			hasError:true,
			error:error,
			info:info,
		})
		console.log(error)
	}

	render(){
		if(this.state.hasError){
		  return(
		  	<div>
          		<h1>Sorry Unable to load Google Maps, something went wrong</h1>
          		<p>The error: {this.state.error.toString()}</p>
          		<p>Where it occured: {this.state.info.componentStack}</p>
       		 </div>
		  	);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
//https://css-tricks.com/handling-errors-with-error-boundary/