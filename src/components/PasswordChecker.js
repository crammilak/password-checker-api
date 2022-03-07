import React, { Component } from "react";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";

class PasswordChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      showPassword: false,
      inputType: "password",
      score: null,
      guessTimeSeconds: null,
      guessTimeString: "",
      warning: "",
      suggestions: [""],
      loading: null,
    };
    this.handlePasswordChecker = this.handlePasswordChecker.bind(this);
  }

  componentDidUpdate(){
      console.log(this.state.password)
  }

  async handlePasswordChecker(password) {
    try {
      this.setState({
        loading: true,
      });
      const result = await axios.post(
        `https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength`,
        { password: password }
      );
      this.setState({
        loading: false,
      });

      this.setState({
        score: result.data.score,
        guessTimeSeconds: result.data.guessTimeSeconds,
        guessTimeString: result.data.guessTimeString,
        warning: result.data.warning,
        suggestions: result.data.suggestions,
      });
      console.log(result.data);
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-3"></div>
          <div className="col-md-6 top-height">
            <center>
              <b>
                <h2>
                  Is Your Password <br />
                  strong Enough
                </h2>
              </b>
            </center>
            <div className="input-group">
              <input
                type={this.state.inputType}
                className="form-control"
                name="password"
                onChange={(e) => {
                  this.handlePasswordChecker(e.target.value);
                  this.setState({
                      password:e.target.value
                  })
                }}
               
              />
              <div className="input-group-append">
                <p
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    this.setState(
                      (prevState) => ({
                        showPassword: !prevState.showPassword,
                      }),
                      () => {
                        if (this.state.showPassword) {
                          this.setState({
                            inputType: "text",
                          });
                        } else {
                          this.setState({
                            inputType: "password",
                          });
                        }
                      }
                    );
                  }}
                >
                  {this.state.showPassword ? "Hide" : "Show"}
                </p>
              </div>
            </div>
            <div>
              <PasswordStrengthBar
                password={this.state.password}
                minLength={5}
              />
            </div>
          </div>
          <div className="col-md-3"></div>
          {this.state.loading ? (
            "Loading...."
          ) : (
            <>
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <center>
                  <h3>
                    {this.state.score === 0 ? "Your password is too weak!" : ""}
                    {this.state.score === 1 ? "Your password is weak!" : ""}
                    {this.state.score === 2
                      ? "Your password is medium strength"
                      : ""}
                    {this.state.score === 3 ? "Your password is strong" : ""}
                    {this.state.score === 4
                      ? "Your password is very strong"
                      : ""}
                  </h3>
                  <p>
                    {this.state.guessTimeSeconds === 0
                      ? `It will take ${this.state.guessTimeString} to guess your password. ${this.state.warning}`
                      : `It will take ${this.state.guessTimeString} to guess your password.`}
                  </p>
                  <b>
                    {this.state.suggestions?.map((suggestion, index) => {
                      return <p key={index}>{suggestion}</p>;
                    })}
                  </b>
                </center>
              </div>
              <div class="col-md-3"></div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default PasswordChecker;
