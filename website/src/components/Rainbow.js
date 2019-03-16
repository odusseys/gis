import React from "react";

const COLORS = [
  "#E70000",
  "#FF8C00",
  "#FFEF00",
  "#00811F",
  "#0044FF",
  "#760089"
];

export default ({ style, className }) => {
  return (
    <div style={{ display: "flex", ...style }} className={className}>
      {COLORS.map(c => (
        <div key={c} style={{ flex: 1, height: "100%", background: c }} />
      ))}
    </div>
  );
};
