import payload from "../../data/stats/softballStats.json";

import { Table } from "../types/Types";

interface Header {
  abbreviation: string;
  full: string;
}
export const getStats = () => {
  if (!payload || payload.status !== 200) return [];

  const tables = <Table[]>[];
  payload.data.groups
    .filter((group) => group.name !== "Pitching")
    .forEach((group) => {
      const table: Table = { category: "", stats: {} };
      table.category = group.name!;
      group.subgroups!.forEach((subgroup) => {
        // table headers
        const tableHeaders = <Header[]>[];
        subgroup.stats.columns.slice(2).forEach((header) => {
          tableHeaders.push({
            abbreviation: header.header,
            full: header.displayName,
          });
        });
        const best = Array(subgroup.stats.rows[0].columns.length - 2).fill(0);
        const stina = <string[]>[];
        // rows has stats for each player, row[i] is a player
        subgroup.stats.rows.forEach((player) => {
          // track best stat among players for this subgroup
          if (player.columns[1].value === "C. D'agostino") {
            player.columns.slice(2).forEach((stat) => {
              stina.push(stat.value);
            });
          } else {
            player.columns.slice(2).forEach((stat, index) => {
              if (stat.value > best[index]) {
                best[index] = stat.value;
              }
            });
          }
        });
        // add table stats to object score among the team
        stina.forEach((value, index) => {
          // const key = table.headers[index].abbreviation;
          const { abbreviation, full } = tableHeaders[index];
          table.stats[abbreviation] = {
            full,
            value,
            best: value >= best[index],
          };
        });
      });
      tables.push(table);
    });
  return tables;
};
