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
          <h2>Join 8 Million Businesses</h2>
          <p>Powering Growth with Lemonpay!</p>
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
