import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };
  render() {
    return (
      <div className={Classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <input type="text" name="street" placeholder="Your Street Address" />
          <input type="text" name="postal" placeholder="Postal Code" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
