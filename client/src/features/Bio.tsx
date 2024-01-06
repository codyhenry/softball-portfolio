const getAge = () => {
  const today = new Date();
  const birthDate = new Date(2007, 6, 4);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};

const gradeLevel = new Map([
  [16, "Sophomore"],
  [17, "Junior"],
  [18, "Senior"],
]);

export function Bio({
  schools = [
    { team: "St. Thomas Aquinas Raiders", position: "SS", number: 10 },
  ],
}: {
  schools?: Array<{ team: string; position: string; number: number }>;
}) {
  return (
    <div>
      {/* TODO: make the header sticky */}
      <h1>Christina D&aposAgostino</h1>
      <p>Age:{getAge()}</p>
      <p>Grade:{gradeLevel.get(getAge())}</p>
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
      </table>
    </div>
  );
}
