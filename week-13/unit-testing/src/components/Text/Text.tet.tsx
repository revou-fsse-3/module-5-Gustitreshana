import { render} from "@testing-library/react"
import { describe } from "node:test"
import Text from "."

describe("test for text component", () => {

    test("component should be retunr text", () => {
        render(<Text children={"testing text"} />)
        console.log("abcde")
    })
})