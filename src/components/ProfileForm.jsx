import {useState} from 'react'
import axios from 'axios'
import React from "react";
export default function ProfileForm({handleSubmit, initialForm}) {
  
  const [form, setForm] = useState(initialForm);
  return (
    <form onSubmit={(e) => handleSubmit(e, form, setForm)}>
      <div className="flex justify-center">
        <label htmlFor="name"></label>
        <input
          className="rounded-full w-40 font-semibold shadow-lg shadow-indigo-500/40 text-blue-500"
          maxLength={10}
          placeholder="Name"
          type="text"
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <select
          className="rounded-full font-semibold shadow-lg shadow-indigo-500/40 text-blue-500 h-10"
          name="color"
          type="dropdown"
          id="color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          required
        >
          <option value="red">Red</option>
          <option value="chartreuse">Green</option>
          <option value="blue">Blue</option>
          <option value="hotpink">Pink</option>
          <option value="orange">Orange</option>
        </select>
      </div>
      <br></br>
      <div className="flex justify-center">
        <div className="flex justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full font-semibold shadow-lg shadow-indigo-500/40 h-10 w-[80px]">
          <button className="mx-auto" type="submit">Submit</button>
        </div>
      </div>
    </form>
  )
}