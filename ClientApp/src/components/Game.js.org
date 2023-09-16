import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDR5RHtYnqrVFczxk5JgDP3R6zD5SJVLvU",
    authDomain: "gomoku-ad695.firebaseapp.com",
    projectId: "gomoku-ad695",
    storageBucket: "gomoku-ad695.appspot.com",
    messagingSenderId: "1094967554954",
    appId: "1:1094967554954:web:1274f002a045de64360e73",
    measurementId: "G-TK62D1JYM2"
});

const roomNumber = sessionStorage.getItem('input_number');
const db = firebase.firestore();
const collectDB = db.collection('game0314');
const docDB = db.collection('game0314').doc(roomNumber);


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
 
  renderSquare(i) {
    
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
      
    );
  }

  render() {
    return (
      <div>
       <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
       </div>
       <div className="board-row">
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
        {this.renderSquare(9)}
      </div>
      <div className="board-row">
       {this.renderSquare(10)}
       {this.renderSquare(11)}
       {this.renderSquare(12)}
       {this.renderSquare(13)}
       {this.renderSquare(14)}
      </div>
      <div className="board-row">
       {this.renderSquare(15)}
       {this.renderSquare(16)}
       {this.renderSquare(17)}
       {this.renderSquare(18)}
       {this.renderSquare(19)}
      </div>
      <div className="board-row">
       {this.renderSquare(20)}
       {this.renderSquare(21)}
       {this.renderSquare(22)}
       {this.renderSquare(23)}
       {this.renderSquare(24)}
      </div>
    </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      history: [{
        squares: Array(25).fill(null)
      }],
      xIsNext: true
    };


var flag = true;


collectDB.onSnapshot((snapshot) => {
  snapshot.forEach((doc) => {
   var docNumber= doc.ref.id;
    if(roomNumber===docNumber){
      flag = false;
    }
  })
if(flag){
   
  
  docDB.set({
    squares: Array(25).fill(null),
    xIsNext: true
  });
}
}
);

    const history = this.state.history; 
    docDB.onSnapshot((doc) => {
      console.log(doc.data());
      console.log(docDB.id);

    this.setState({
      history: history.concat([{
        squares: doc.data().squares,
      }]),
      xIsNext: doc.data().xIsNext
    });
  });
    
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`)
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    (async () => {
      try {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    console.log(squares);
    

   await docDB.update({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });

  
  docDB.onSnapshot((doc) => {
        console.log(doc.data());
        console.log(docDB.id);

      this.setState({
        history: history.concat([{
          squares: doc.data().squares,
        }]),
        xIsNext: doc.data().xIsNext
      });
    });  
                   
    } catch (err) {
      console.log(err);
    }
  })()
}
  
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
        
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
 
    return (
      
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        
        <a href="/">logout</a><br/> 
        
      </div>
    );
  }

}

// ============================================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
function calculateWinner(squares) {
  const lines = [
   [ 0,  1,  2,  3,  4],
   [ 5,  6,  7,  8,  9],
   [10, 11, 12, 13, 14],
   [15, 16, 17, 18, 19],
   [20, 21, 22, 23, 24],
   [ 0,  5, 10, 15, 20],
   [ 1,  6, 11, 16, 21],
   [ 2,  7, 12, 17, 22],
   [ 3,  8, 13, 18, 23],
   [ 4,  9, 14, 19, 24],
   [ 0,  6, 12, 18, 24],
   [ 4,  8, 12, 16, 20],
];
for (let i = 0; i < lines.length; i++) {
const [a, b, c, d, e] = lines[i];
if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
  return squares[a];
 }
}
  return null;
}
// ========================================
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();