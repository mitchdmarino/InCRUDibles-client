import { useState } from "react";
import axios from "axios";
import React from "react";
export default function ProfileForm({ handleSubmit, initialForm }) {
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
        <input
          className=" font-semibold shadow-lg shadow-indigo-500/40 text-blue-500 h-10"
          name="color"
          type="color"
          id="color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          required
        />
        {/* <option value="#F06666">Red</option>
          <option value="#F89A4C">Orange</option>
          <option value="#EEE86D">Yellow</option>
          <option value="#52F49F">Green</option>
          <option value="#6699F0">Blue</option>
          <option value="#9F6DE1">Purple</option>
          <option value="#F08CD2">Pink</option>
        </select> */}
      </div>
      <br></br>
      <div className="flex justify-center">
        <div className="flex justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full font-semibold shadow-lg shadow-indigo-500/40 h-10 w-[80px]">
          <button className="mx-auto" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
