import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState([]);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length === 0 && termsAccepted) {
      window.location.href = "/success";
    }
  };

  const validateForm = () => {
    const newErrors = [];
    if (!validateEmail(email)) newErrors.push("Invalid email.");
    if (!validatePassword(password))
      newErrors.push("Password must be strong.");
    if (!termsAccepted) newErrors.push("Terms must be accepted.");
    setErrors(newErrors);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={validateForm}
      className="flex flex-col gap-4"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        I accept the terms
      </label>
      <button type="submit" disabled={errors.length > 0}>
        Login
      </button>
      {errors.map((err, idx) => (
        <p key={idx} className="text-red-500">
          {err}
        </p>
      ))}
    </form>
  );
};

export default Login;