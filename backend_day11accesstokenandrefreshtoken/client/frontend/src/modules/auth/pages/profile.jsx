import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../../context/user.context";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse userInfo from localStorage", error);
    return null;
  }
};

const getStoredToken = () => localStorage.getItem("accessToken");

const Profile = () => {
  const navigate = useNavigate();
  const { user, accessToken, setUser, setAccessToken } = useUserContext();
  const [profile, setProfile] = useState(user || getStoredUser());
  const [token, setToken] = useState(accessToken || getStoredToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async (currentToken) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      const nextUser = {
        name: data.name,
        email: data.email,
      };

      setProfile(nextUser);
      setUser(nextUser);
      setAccessToken(currentToken);
      localStorage.setItem("userInfo", JSON.stringify(nextUser));
      localStorage.setItem("accessToken", currentToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = getStoredToken();

    if (!storedToken) {
      setProfile(null);
      setToken(null);
      return;
    }

    setToken(storedToken);

    if (!profile) {
      fetchProfile(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");

    setProfile(null);
    setToken(null);
    setUser(null);
    setAccessToken(null);

    navigate("/register");
  };

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto", padding: "24px" }}>
      <h1>Profile</h1>

      {loading && <p>Loading profile...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {profile ? (
        <>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Access Token: {token}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default Profile;
