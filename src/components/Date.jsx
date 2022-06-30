import { getByPlaceholderText } from "@testing-library/react"
import React from "react"

export default function displayDate () {
    const fullDate = new Date()


    return (
      <div>
        <h2 className="text-white">
        {`${fullDate.getMonth()+1} / ${fullDate.getDate()} / ${fullDate.getFullYear()}`}
        </h2>
      </div>
    )
}

