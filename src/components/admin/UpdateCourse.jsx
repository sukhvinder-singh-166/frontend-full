import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: "",
    CourseId: id || "",
    price: "",
    description: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      course.name === "" ||
      course.price === "" ||
      course.description === ""
    ) {
      alert("All fields are required");
      return;
    }
    axios
      .post(
        `http://localhost:4000/admin/UpdateCourse/${id}`,
        course
      )
      .then((response) => {
        console.log(response.data);
        alert("Course updated successfully");
        navigate("/admin/allCourses");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
        alert("Error updating the course!");
      });

    // Clear form fields after successful submission
    setCourse({
      name: "",
      CourseId: "",
      price: "",
      description: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Update Course</h1>
      <form className="bg-white p-4 rounded-md shadow-md flex flex-col gap-4">
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type="text"
          placeholder="new Name"
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type="number"
          placeholder="new Price"
          value={course.price}
          onChange={(e) => setCourse({ ...course, price: e.target.value })}
        />
        <input
          className="p-2 rounded-md border-2 border-gray-300"
          type="text"
          placeholder="new Description"
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;