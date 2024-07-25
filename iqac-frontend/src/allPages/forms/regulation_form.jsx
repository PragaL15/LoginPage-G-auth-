import React, { useState } from "react";
import apiHost from "../../utils/api";
import InputBox from "../../components/InputBox/inputbox";

function RegulationForm() {
  const [regulationValue, setRegulationValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post the regulation value to the backend
      const response = await fetch(`${apiHost}/api/rf/regulation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regulation: regulationValue }),
        
      });

      if (response.ok) {
        console.log("Regulation submitted successfully");
        // Handle success, such as showing a success message or redirecting
      } else {
        console.error("Failed to submit regulation");
        // Handle error, such as displaying an error message
      }
    } catch (error) {
      console.error("Error submitting regulation:", error);
      // Handle error, such as displaying an error message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputBox
          type="text"
          value={regulationValue}
          onChange={(e) => setRegulationValue(e.target.value)}
          placeholder="Enter Regulation"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegulationForm;
