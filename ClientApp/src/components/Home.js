import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
//import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

//const db = firebase.firestore();

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e){
    this.setState({
      text: e.target.value
    })

  }
  handleClick(){
    var input_number = document.getElementById("input_number").value;
    console.log(input_number);
    sessionStorage.setItem('input_number', input_number);
    require("./Game.js");
     
  }


  render() {   

    return (
     <div>  
    <p>番号を入力してください</p>
    <input type='text' value={this.state.text} id="input_number" onChange={this.handleChange}></input>
   {/* <input type="text" name="number" value={this.state.number} onChange={(event) => {this.handleNumberChange(event)}}/> */}
     <button onClick={this.handleClick}>マッチング</button>
    </div>
      
     );
    }
  } 
  
// ============================================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);


// ========================================
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
