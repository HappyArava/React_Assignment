import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Compos/Home.js';
import Project from './Compos/Project.js';
class App extends Component {
  
  render() {
    return (
      
      <div className="App">
       <Home />
       {/* <Project /> */}
       {/* <Array />? */}
      </div>
    );     
    }
}

export default App;

class Array extends Component{
constructor(props){
  super(props);
  this.state={
   array : [
      ['1.1', '1.2', '1.3', '1.4', '1.5'],
      ['2.1', '2.2', '2.3', '2.4', '2.5'],
      ['3.1', '3.2', '3.3', '3.4', '3.5'],
  ]
  }
}
handler = () =>{
  var arr = ['4.1', '4.2', '4.3', '4.4', '4.5'];
  var mainarr = this.state.array;
  mainarr.push(arr);
  this.setState({array:mainarr});
}
      render(){
        var display = this.state.array.map(arr=>{
          
       return(  
        
        arr.map((ele,i)=>{
              // console.log('Elements', ele)
              return <li key={i}>{ele}</li>
               })
       )
       
      });
        return(
          <div>
          {display}
<button onClick={this.handler}>Add</button>
          </div>
        );
      }
}