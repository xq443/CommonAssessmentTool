import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ClientSearch.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ClientSearch() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const query = useQuery().get("query"); // Get the query parameter from the URL

  useEffect(() => {
    if (query) {
      handleSearch(query); // Call search with the first name
    }
  }, [query]);

const handleSearch = async (query) => { // Use 'query' as the parameter name
  console.log("Searching for clients with the following query:", query); // Log the search query

  try {
    const params = { firstName: query }; // Create params object
    console.log("Request parameters:", params); // Log the parameters being sent

    const response = await axios.get(`http://localhost:3001/api/clients/search`, {
      params: params // Send 'name' for first name search to match the server API
    });

    setClients(response.data);
    setError(null);
    
    console.log("Response data:", response.data); // Log the response data
  } catch (err) {
    setError("Error fetching clients. Please try again.");
    console.error("Fetch error:", err); // Log the error details
  }
};

  const handleClientClick = (clientId) => {
    navigate(`/client/${clientId}`); // Navigate to client detail page
  };

  return (
    <div className="centered-container">
      <div className="form-container">
        <h2>Search Results for First Name "{query}"</h2> {/* Clarified search context */}
        {error && <div className="error-message">{error}</div>}
        <div className="result-container">
          {clients.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {clients.map((client) => (
                <li
                  key={client.id}
                  className="client-item"
                  onClick={() => handleClientClick(client.id)} 
                  style={{ cursor: "pointer" }} 
                >
                  <strong>{client.firstName}</strong> (Last Name: {client.lastName}, Age: {client.age}, Gender: {client.gender})
                </li>
              ))}
            </ul>
          ) : (
            <div>No clients found for your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientSearch;
