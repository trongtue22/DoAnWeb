import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";
// Khai báo các hàm để xử dụng CSS 


// End here 
class Myprofile extends Component {
  static contextType = MyContext; // using this . context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
    };
  }
 // Đây là khúc bắt đầu thay đổi
  render() {
    if (this.context.token === "") return <Navigate replace to="/login"/>;
    return (
           //  <div className="main"> 
      <div className="align-center profile-container">
        <h2 className="text-center"> MY PROFILE </h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td> Username </td>
                <td>
                  {" "}
                  <input
                    type="text"
                    value={this.state.txtUsername}
                    onChange={(e) => {
                      this.setState({ txtUsername: e.target.value });
                    }}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td> Password </td>
                <td>
                  {" "}
                  <input
                    type="password"
                    value={this.state.txtPassword}
                    onChange={(e) => {
                      this.setState({ txtPassword: e.target.value });
                    }}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td> Name </td>
                <td>
                  {" "}
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td> Phone </td>
                <td>
                  {" "}
                  <input
                    type="tel"
                    value={this.state.txtPhone}
                    onChange={(e) => {
                      this.setState({ txtPhone: e.target.value });
                    }}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td> Email </td>
                <td>
                  {" "}
                  <input
                    type="email"
                    value={this.state.txtEmail}
                    onChange={(e) => {
                      this.setState({ txtEmail: e.target.value });
                    }}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td> </td>
                <td>
                  {" "}
                  {/* thảy đổi màu nút */}
                  <input 
                    className="button"
                    type="submit" 
                    value="UPDATE" 
                    onClick={(e) => this.btnUpdateClick(e)}
                  />{" "}
                </td>
              </tr>
            </tbody>
          </table>

        </form>
    <div className="align-center image-container" style={{ marginTop: '20px' }}>
      <img src="https://cdn-icons-png.flaticon.com/512/1341/1341476.png" width="200px" height="200px" alt="Image description" />
    </div>
         </div>
   
    );
  }
       // Đây là điểm kết thúc



  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
      });
    }
  }
  // event - handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert("Please input username and password and name and phone and email ");
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/customer/customers/" + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("OK BABY !");
        this.context.setCustomer(result);
      } else {
        alert("SORRY BABY !");
      }
    });
  }
}
export default Myprofile;

