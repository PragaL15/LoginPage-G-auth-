import React, { useState } from "react";
import RegulationForm from "../forms/regulation_form";
import DegreeForm from "../forms/degree_from";
import BranchForm from "../forms/branch";
import CourseForm from "../forms/course";
import CategoryForm from "../forms/category";
import Button from "../../components/Button/button";

function MainForm() {
  const [showForm, setShowForm] = useState(null);

  const toggleForm = (formName) => {
    setShowForm((prevForm) => (prevForm === formName ? null : formName));
  };

  return (
    <div>
      <h1>Main Form</h1>
      <div className="form" style={{
        display:'flex'
      }}>
        <Button onClick={() => toggleForm("regulation")} label="Regulation" />
        <Button onClick={() => toggleForm("degree")} label="Degree" />
        <Button onClick={() => toggleForm("branch")} label="Branch" />
        <Button onClick={() => toggleForm("course")} label="Course" />
        <Button onClick={() => toggleForm("category")} label="Category" />
      </div>            


      {showForm === "regulation" && <RegulationForm />}
      {showForm === "degree" && <DegreeForm />}
      {showForm === "branch" && <BranchForm />}
      {showForm === "course" && <CourseForm />}
      {showForm === "category" && <CategoryForm />}



    </div>
  );
}

export default MainForm;
