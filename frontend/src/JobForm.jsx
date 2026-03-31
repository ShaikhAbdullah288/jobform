import React, { useRef, useState } from "react";
import "./JobForm.css";

function JobForm() {
  const [message, setMessage] = useState("");
const [error, setError] = useState("");
  
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    role: "frontend",
    coverLetter: "",
    resume: null

  }
  const [form, setForm] = useState(initialForm);
  const fileRef = useRef()


  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setForm({ ...form, resume: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  setMessage("");
  setError("");

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("phone", form.phone);
  formData.append("role", form.role);
  formData.append("coverLetter", form.coverLetter);
  formData.append("resume", form.resume);

  try {
    const res = await fetch("https://formbackend-u4qm.onrender.com/api/jobs", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Application submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        role: "frontend",
        coverLetter: "",
        
      });
      fileRef.current.value = "";
    } else {
      setError(data.error || "Something went wrong");
    }

  } catch (err) {
    setError("❌ Network error. Try again.");
  }
};
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   for (let key in form) {
  //     data.append(key, form[key]);
  //   }

  //   try {
  //     const res = await fetch("https://formbackend-u4qm.onrender.com/api/jobs", {
  //       method: "POST",
  //       body: data
  //     });

  //     const result = await res.json();
  //     alert(result.message);
  //     setForm(initialForm)
  //     fileRef.current.value = "";
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error submitting form");
  //   }
          

  // };

  return (
    <div className="container">
      <div className="card">
        <h2>🚀 Apply for Job</h2>
        
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input value={form.name} name="name" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={form.email} name="email" type="email" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input value={form.phone} name="phone" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select value={form.role} name="role" onChange={handleChange}>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">FullStack Developer</option>
              <option value="datascientist">Data Scientists</option>
              <option value="cybersecurity">Cybersecurity Analysts</option>
              <option value="aimlengineer">AI/ML engineers</option>
            </select>
          </div>

          <div className="form-group">
            <label>Cover Letter</label>
            <textarea value={form.coverLetter} name="coverLetter" rows="4" onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label>Upload Resume</label>
            <input ref={fileRef} type="file" name="resume" onChange={handleChange} required />
          </div>

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
