import {useState} from 'react'

import React from "react";

export default function ProfileForm() {
  const initialForm = {
    name: '',
    color: ''

  }
  const [form, setForm] = useState(initialForm);

  const handleCreateProfile = (e, form, setForm) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div>
      <form onSubmit={(e) => handleCreateProfile(e, form, setForm)}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label htmlFor="color">Color:</label>
        <select
          name="color"
          type="dropdown"
          id="color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        >
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
          <option value="pink">pink</option>
          <option value="yellow">yellow</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
