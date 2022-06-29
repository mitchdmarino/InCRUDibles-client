import { getByPlaceholderText } from "@testing-library/react"
import React from "react"

const date = () => {
    const fullDate = new Date()

    return (
      <div>
        <input
          type="text"
          value={fullDate}
        />
      </div>
    )
}

export default Date