/*
 Copyright 2015 Paul Bevis

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import React, {Component, PropTypes} from 'react'
import Row from './row'
import {MAX_GRID_HEIGHT} from '../constants/data'

export default class Grid extends Component {
  
  provideDummyRows(keyPefix) {
    let gridHeight = this.props.grid.rows.length;
    let blankRow = MAX_GRID_HEIGHT - gridHeight;
    if (blankRow !== 0) {
      blankRow = (blankRow / 2)
    }
    var divs = [];
    let counter = 0;
    while (counter < blankRow) {
      divs.push(<div key={keyPefix+counter} className='section group'>
        <div className="col span_12_of_12" style={{height:'38px'}}></div>
      </div>);
      counter++;
    }
    return divs
  }

  isGameOverOverlay() {
    const gameOverStyle = {
      position: 'absolute',
      top: '33%',
      left: '10%',
      background: '#b1edff',
      zIndex: '1',
      opacity: '.95',
      fontSize: '40px',
      width: '50%',
      borderRadius: '20px',
      padding: '20px',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    };
    if (this.props.gameOver) {
      return (<div key='gameOver' className="game-over" style={gameOverStyle}>
        <div style={{marginBottom:'20px'}}>Well Done!</div>
        <div style={{fontSize:'26px'}}>Let's move on to the next level...</div>
      </div>)
    }
  }

  render() {
    return (
      <div className="col span_9_of_12">
        {this.isGameOverOverlay()}
        <div className="section group" style={{background:'#0cc3ff'}}>
          {this.provideDummyRows('b')}
          {this.props.grid.rows.map((row, index)=>
            <Row key={index} onCellClick={this.props.onCellClick}
                 onCellExplosionFragment={this.props.onCellExplosionFragment}
                 onLastLetterOfLastWord={this.props.onLastLetterOfLastWord}
                 gameOver={this.props.gameOver}
              {...row} />)
          }
          {this.provideDummyRows('a')}
        </div>
      </div>
    )
  }
}

Grid.propTypes = {
  onCellClick: PropTypes.func.isRequired
};