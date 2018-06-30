import React from "react";
import "./RawBlock.css";

function RawBlock(props) {
  return (
	<tr className="rawblock">
 		<td colSpan={3}><div>{props.raw}</div></td>
	</tr>
  );
}

export default RawBlock;