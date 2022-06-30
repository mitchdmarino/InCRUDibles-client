import { useState } from "react";
import axios from "axios";
import React from "react";

export default function ProfileForm({ handleSubmit, initialForm, isCreate }) {
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
          className="rounded-full bg-white p-2 w-24 font-semibold shadow-lg shadow-indigo-500/40 text-blue-500 h-10"
          name="color"
          type="color"
          id="color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          required
        />
      </div>
      <br></br>
      {isCreate ? (
        <div className="flex justify-center">
          <div className="flex justify-center bg-white text-blue-500 hover:bg-blue-700 hover:text-white rounded-full font-semibold shadow-lg shadow-indigo-500/40 h-10 w-[80px]">
            <button className="mx-auto" type="submit">
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center bg-white ml-[180px] mt-[-25px] text-blue-500 hover:bg-blue-700 hover:text-white rounded-full font-semibold shadow-lg shadow-indigo-500/40 h-10 w-[80px]">
          <button className="" type="submit">
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
