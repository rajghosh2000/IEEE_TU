import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers, userRegister } from "../../actions";
class Register extends Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: ""
  };

  componentWillMount() {
    this.props.dispatch(getUsers());
  }

  handleInputEmail = event => {
    this.setState({ email: event.target.value });
  };
  handleInputPassword = event => {
    this.setState({ password: event.target.value });
  };
  handleInputName = event => {
    this.setState({ name: event.target.value });
  };
  handleInputLastname = event => {
    this.setState({ lastname: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.register === false) {
      this.setState({ error: "Error, try again!!!" });
    } else {
      this.setState({
        name: "",
        lastname: "",
        email: "",
        password: ""
      });
    }
  }
  submitForm = e => {
    e.preventDefault();
    this.setState({ error: "" });

    this.props.dispatch(
      userRegister(
        {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          lastname: this.state.lastname
        },
        this.props.user.users
      )
    );
  };

  showUsers = user =>
    user.users
      ? user.users.map(item => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
          </tr>
        ))
      : null;

  render() {
    let user = this.props.user;
    return (
      <div>
        <form onSubmit={this.submitForm} className="container">
          <h2>Add Admin</h2>
          <div>
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.handleInputName}
            />
            <label>Lastname</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Lastname"
              value={this.state.lastname}
              onChange={this.handleInputLastname}
            />
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-success btn-block">
            Add Admin
          </button>

          <div>{this.state.error}</div>
        </form>
        <br />

        <div className="container">
          <h4>Current Admins</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{this.showUsers(user)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Register);
