import { useState } from 'react'
import Swal from "sweetalert2";
import './Contact.css'
const Contact = () => {
    const [data, setdata] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Invalid email format";
    if (!data.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Message Send:", data);
      Swal.fire({
        title: "Success!",
        text: `${data.name}'s message has been sent successfully.`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor:"green"
      });
      
      setdata({ name: "", email: "", message: "" });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
        <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" rows="4" value={data.message} onChange={handleChange}></textarea>
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
      
    </div>
  )
}

export default Contact
