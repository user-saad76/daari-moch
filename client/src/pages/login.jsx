import React, { useState } from 'react'

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [signUpUser, setSignUpUser] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [showLogin, setShowLogin] = useState(true);

  // Show login form
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  // Show signup form
  const handleShowSignup = () => {
    setShowLogin(false);
  };

  // Login form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append("FullName",signUpUser.fullName)
    data.append("Email",signUpUser.email)
    data.append("Password",signUpUser.password)
    data.append("phone",signUpUser.phone)
    data.append("Image",signUpUser.image)
   



    console.log(data)
  }

  // Signup form submit
  const handleSignUpSubmit = (e) => {
   e.preventDefault();
   if (signUpUser.password !== signUpUser.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
   console.log("Form Submitted:", signUpUser);
  };

  // Login input change
  const handleChangeEmail = (e) => {
    setUser({
      ...user,
      email: e.target.value
    });
  };
  const handleChangePassword = (e) => {
    setUser({
      ...user,
      password: e.target.value
    });
  };

  // Signup input change
  const handleSignUpChange = (e) => {
  const { name,value,type,files} =e.target;
  setSignUpUser((prevData)=>({
    ...prevData,
    [name]: type === 'file'? files[0]:value,
  }));
  };

  return (
    <div className="container">
      <button className="btn btn-info me-2" onClick={handleShowLogin}>Login Here</button>
      <button className="btn btn-outline-info" onClick={handleShowSignup}>Signup Here</button>

      {showLogin ? (
        <div className="login-wrapper">
          <h1>Login Page</h1>
          <form className="row g-3 w-50 mt-4" onSubmit={handleSubmit} >
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChangeEmail}
                id="inputEmail4"
                value={user.email}
                required
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChangePassword}
                name="password"
                id="password"
                value={user.password}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h1>Signup Page</h1>
          <form className="row g-3 w-50 mt-4" onSubmit={handleSignUpSubmit}>
            <div className="col-md-12">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleSignUpChange}
                name="fullName"
                id="fullName"
                value={signUpUser.fullName}
                required
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="signupEmail" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleSignUpChange}
                name="email"
                id="signupEmail"
                value={signUpUser.email}
                required
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="signupPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                  onChange={handleSignUpChange}
                name="password"
                id="signupPassword"
                value={signUpUser.password}
                required
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                 onChange={handleSignUpChange}
                name="confirmPassword"
                id="confirmPassword"
                value={signUpUser.confirmPassword}
                required
              />
            </div>
             <div className="col-md-12">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                 onChange={handleSignUpChange}
                name="phone"
                id="phone"
                value={signUpUser.phone}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-secondary">Sign up</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;