import React, { createContext, useState, useContext, useEffect } from "react";
import API_URL from "../Services/Api";

const SavedContext = createContext();

export const useSavedProperties = () => useContext(SavedContext);

const getPropertyId = (p) => (p ? p._id || p.id : null);

export const SavedProvider = ({ children }) => {
  const [savedProperties, setSavedProperties] = useState(() => {
    try {
      const stored = localStorage.getItem("luxe_saved_properties");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever savedProperties changes
  useEffect(() => {
    try {
      localStorage.setItem("luxe_saved_properties", JSON.stringify(savedProperties));
    } catch (e) {
      console.error("Failed to save properties to localStorage:", e);
    }
  }, [savedProperties]);

  // Optionally sync with backend if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setSavedProperties((prev) => {
            const combined = [...prev];
            data.data.forEach((p) => {
              const pid = getPropertyId(p);
              if (pid && !combined.some((item) => getPropertyId(item) === pid)) {
                combined.push(p);
              }
            });
            return combined;
          });
        }
      })
      .catch(() => {});
  }, []);

  const toggleSaveProperty = async (property) => {
    if (!property) return;
    const propId = getPropertyId(property);
    if (!propId) return;

    const token = localStorage.getItem("token");
    const isCurrentlySaved = savedProperties.some(
      (p) => getPropertyId(p) === propId
    );

    setSavedProperties((prev) => {
      if (isCurrentlySaved) {
        return prev.filter((p) => getPropertyId(p) !== propId);
      } else {
        return [...prev, property];
      }
    });

    // If user is authenticated, sync with server
    if (token) {
      try {
        if (isCurrentlySaved) {
          await fetch(`${API_URL}/wishlist/${propId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          await fetch(`${API_URL}/wishlist/${propId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } catch (err) {
        console.error("Wishlist sync error:", err);
      }
    }
  };

  const isPropertySaved = (id) => {
    if (!id) return false;
    return savedProperties.some((p) => getPropertyId(p) === id);
  };

  return (
    <SavedContext.Provider value={{ savedProperties, toggleSaveProperty, isPropertySaved }}>
      {children}
    </SavedContext.Provider>
  );
};