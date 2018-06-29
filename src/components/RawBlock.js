import React from "react";
import "./RawBlock.css";

function RawBlock(props) {
  return (
	<tr className="rawblock">
 		<td colSpan={3}>{props.raw}</td>
	</tr>
  );
}

export default RawBlock;