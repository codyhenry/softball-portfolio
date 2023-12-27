export const getAge = () => {
  var today = new Date();
  var birthDate = new Date(2007, 6, 4);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const gradeLevel = new Map([
  [16, "Sophomore"],
  [17, "Junior"],
  [18, "Senior"],
]);

interface BioProps {
  schools?: Array<{ team: string; position: string; number: number }>;
}

export function Bio({
  schools = [
    { team: "St. Thomas Aquinas Raiders", position: "SS", number: 10 },
  ],
}: BioProps) {
  return (
    <div>
      <h1>Christina D'Agostino</h1>
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
