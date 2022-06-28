import {useState} from 'react'
import axios from 'axios'
import React from "react";
export default function ProfileForm({handleSubmit, initialForm}) {
  
  const [form, setForm] = useState(initialForm);
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, form, setForm)}>
        <div className="flex justify-center">
          <label htmlFor="name"></label>
          <input
            className="rounded-full font-semibold shadow-lg shadow-indigo-500/40 text-blue-500"
            placeholder="Name"
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <select
            className="rounded-full font-semibold shadow-lg shadow-indigo-500/40 text-blue-500 h-10"
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
        </div>
        <br></br>
        <div className="flex justify-center">
          <div className="hover:bg-white hover:text-blue-500 bg-blue-500 text-white rounded-full p-2 rounded-full font-semibold shadow-lg shadow-indigo-500/40 h-10">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}