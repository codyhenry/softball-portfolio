import { useState, useEffect } from "react";

function DesktopStats() {
  return (
    <>
      <h2>Batting</h2>
      <table />
      <h2>Baserunning</h2>
      <table />
      <h2>Fielding</h2>
      <table />
    </>
  );
}

export function Stats() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 990);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsDesktop(window.innerWidth > 990)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setIsDesktop(window.innerWidth > 990)
      );
  });
  return <h1>Player Statistics</h1>;
  // {isDesktop &&}
}

<table>
  <thead>
    <tr>
      <th>Team</th>
      <th>Position</th>
      <th>Number</th>
    </tr>
  </thead>
  <tbody>
    {schools.map((school) => (
      <tr key={school.team}>
        <td>{school.team}</td>
        <td>{school.position}</td>
        <td>{school.number}</td>
      </tr>
    ))}
  </tbody>
</table>;
