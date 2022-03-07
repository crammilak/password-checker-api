import React from "react";
import "./App.css";
import PasswordChecker from "./components/PasswordChecker";


class App extends React.Component{

  render(){
    return (
    <div className="App">
      <PasswordChecker />
    </div>
    )

  }
}

export default App;