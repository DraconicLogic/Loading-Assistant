import * as helpers from "./helpers"

describe.only("ContainerOverview.jsx Helper Functions", () => {
  const testContainerContent = [
    {"stackContent":["AC","AC","AC","AC","AC","AC","AC","AC","AC","AC","AC","AC"]},{"stackContent":["FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT"]},
    {"stackContent":["ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS"]},
    {"stackContent":["NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR"]}
  ]
  describe("flattenContainer", () => {
    it("Takes an array of arrays and returns a flat array", () => {
     
      const expected = ["AC","AC","AC","AC","AC","AC","AC","AC","AC","AC","AC","AC", "FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR"]
      const flattened = helpers.flattenContainer(testContainerContent)
      expect(flattened).toBe(expected)
    })
  })
})