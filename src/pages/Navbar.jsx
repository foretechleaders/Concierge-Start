import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("vb_session");
    if (stored) setSession(JSON.parse(stored));
  }, []);

  return (
    <nav className="navbar">
      {/* Existing nav items here */}

      <div className="nav-right">
        {!session ? (
          <a
            href="/.netlify/functions/createPortal?login=true"
            className="login-btn"
          >
            Log In
          </a>
        ) : (
          <a href="/account" className="account-btn">
            My Account
          </a>
        )}
      </div>
    </nav>
  );
}
