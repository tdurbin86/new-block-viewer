import React from "react";
import "./Block.css";

function Block(props) {
  return (
	<tr className="block" onClick={props.onClick}>
 		<td>{props.id}</td>
		<td>{props.timestamp}</td>
		<td>{props.actions}</td>
	</tr>
  );
}

export default Block;