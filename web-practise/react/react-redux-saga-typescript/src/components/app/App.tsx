import * as React from 'react';
import './App.css';
import {OrderView} from '../../views/OrdersView';
import Header from '../Header';

class App extends React.Component<null, null> {
  
  render() {
    return (
      <div className="App">
        <Header />
        <br/>
        <OrderView />
      </div>
    );
  }
}

export default App;
