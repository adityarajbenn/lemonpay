import "../styles/Login.css";

function AuthLayout({
  title,
  description = "Your gateway to seamless transactions and easy payments.",
  children,
  buttonText,
  alternateLink,
  onSubmit,
}) {
  return (
    <div className="login-wrapper">
      <div className="login-background"></div>

      <div className="login-container">
        {/* LEFT SECTION */}
        <div className="login-left">
          <img src="/logo.png" alt="Lemonpay Logo" />
          <div style={{ marginTop: "max(50px, 200px)", textAlign: "left" }}>
            <p>Join 8 Million Businesses</p>
            <p style={{ color: "#DBD55B" }}>Powering Growth with </p>
            <p>Lemonpay!</p>
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="login-right">
          <form className="login-form" onSubmit={onSubmit}>
            <h2>{title}</h2>
            <p>{description}</p>

            {children}

            <div className="checkbox-group">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href={alternateLink.href}>{alternateLink.text}</a>
            </div>

            <button type="submit">{buttonText}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
