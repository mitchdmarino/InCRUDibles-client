import React from "react"

export default function displayDate () {
    const fullDate = new Date()


    return (
      <div>
        <h2 className="text-white tracking-tight text-2xl">
          {`${
            fullDate.getMonth() + 1
          } / ${fullDate.getDate()} / ${fullDate.getFullYear()}`}
        </h2>
      </div>
    )
}

