import { useState, useEffect } from "react";
import { getTables } from "../test/jsonParser";

// overflowX - scroll (desktop)
// overflowY - scroll (mobile)

// TODO make a interface file to import from

interface Table {
  category: string;
  stats: { [key: string]: { full: string; value: string; best: boolean } };
}

function StatsTable({
  stats,
  isDesktop,
}: {
  stats: { [key: string]: { full: string; value: string; best: boolean } };
  isDesktop: boolean;
}) {
  return (
    <div>
      {isDesktop ? (
        <table>
          <thead>
            <tr>
              {Object.keys(stats).map((stat) => (
                // on hover change to full
                <th key={stat}>{stat}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(stats).map((stat) => (
                <td key={stat}>{stats[stat].value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : (
        <table>
          <tbody>
            {Object.keys(stats).map((stat) => (
              <tr key={stat}>
                {/* on hover change to full */}
                <th>{stat}</th>
                <td>{stats[stat].value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// make swipeable
function Carousel({ tables }: { tables: Array<Table> }) {
  const [tableIndex, setTableIndex] = useState(0);
  const handleNext = () => setTableIndex((tableIndex + 1) % tables.length);
  // there are 3 tables
  const handlePrev = () =>
    setTableIndex((tables.length + tableIndex - 1) % tables.length);

  return (
    <div>
      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <h2>{tables[tableIndex].category}</h2>
      <StatsTable stats={tables[tableIndex].stats} isDesktop={false} />
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

function DesktopStats({ tables }: { tables: Array<Table> }) {
  return tables.map((table) => (
    <div key={table.category} data-testid="desktop-component">
      <h2>{table.category}</h2>
      <StatsTable stats={table.stats} isDesktop />
    </div>
  ));
}

export function Stats() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 990);
  const tables = getTables();
  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsDesktop(window.innerWidth > 990)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setIsDesktop(window.innerWidth > 990)
      );
  });
  return (
    <>
      <h1>Player Statistics</h1>
      {isDesktop ? (
        <DesktopStats tables={tables} />
      ) : (
        <Carousel tables={tables} />
      )}
    </>
  );
}
