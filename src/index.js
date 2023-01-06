import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

/*
class Square extends React.Component {
  
  render() {
    //return a html thing that makes the squares into functional buttons
    //handles click event when square gets clicked and displays the squares state
    return (
      <button
	    className="square" 
	    onClick={() => this.props.onClick()}
	    >
	{this.props.value}
      </button>
    );
  }
}*/

//for components with only render functions, use a function component
//just pass props as an argument 
function Square(props){
	return (
	   <button 
		className="square"
		onClick={props.onClick}>
	   {props.value}
	   </button>
	)
}

class Board extends React.Component {
  
  constructor(props){
  	super(props)
	this.state = {
		squares: Array(9).fill(null),
		xNext: true
	}
  }

  findWinner(squares){
	  const lines = [
		  [0, 1, 2],
		  [3, 4, 5],
		  [6, 7, 8],
		  [0, 3, 6],
		  [1, 4, 7],
		  [2, 5, 8],
		  [0, 4, 8],
		  [2, 4, 6],
	  ]

	  for(let i=0; i<lines.length; i++){
	  	const [a,b,c] = lines[i];	//get the location of winning squares
		//
		if(squares[a] && 
			squares[a] === squares[b] &&
			squares[a] === squares[c]){
			return squares[a]
		}
	  }

	  return null;
  }

  handleClick(i){
	//make a copy of the array so we dont edit the real one
  	const sqs = this.state.squares.slice();
	
	//if theres a winner or the square is filled, then no changeable box
	if(sqs[i] || this.findWinner(sqs)){
		return
	}
		
	sqs[i] = this.state.xNext ? 'X' : 'O'
	this.setState({
		squares: sqs,
		xNext: !this.state.xNext
	})
  }

  renderSquare(i) {
    return <Square 
	  value={this.state.squares[i]}
	  onClick = {() => this.handleClick(i)}
		  />;
  }

  render() {
    const winner = this.findWinner(this.state.squares)
    let status
    if(winner){
	//display winner if winner is found
    	status = 'Winner is: ' + winner
    }
    else{
	//display current turn if no winner
    	status = 'Next player: ' + (this.state.xNext ? 'X' : 'O');
    }

    return (
      <div>

	<div className="status">{status}</div>
        
	<div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        
	<div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        
	<div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
