import React, { useState } from "react";
import apiHost from "../../utils/api";
import InputBox from "../../components/InputBox/inputbox";

function CategoryForm() {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post the category value to the backend
      const response = await fetch(`${apiHost}/api/rf/course-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: category }),
      });

      if (response.ok) {
        console.log("Category submitted successfully");
        // Handle success, such as showing a success message or redirecting
      } else {
        console.error("Failed to submit category");
        // Handle error, such as displaying an error message
      }
    } catch (error) {
      console.error("Error submitting category:", error);
      // Handle error, such as displaying an error message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputBox
          value={category}
          type="text"
          onChange={(e) => setCategory(e.target.value)} // Fix the typo here
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CategoryForm;
