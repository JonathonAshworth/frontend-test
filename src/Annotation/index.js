import React from "react"
import rgba  from "../__lib__/unit_to_rgba"
import apply_matrix from "./apply_matrix"

export default props => <path {...{
    d:           apply_matrix(props.Matrix, props.Geometry),
    stroke:      rgba(props.StrokeColor),
    strokeWidth: props.StrokeThickness,
    fill:        rgba(props.FillColor)
  }}/>