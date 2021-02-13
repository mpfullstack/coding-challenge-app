import * as React from "react";
import Table from "../../common/components/Table";

const MatchesTable = () => {
  const [matchesData, setMatches] = React.useState([]);

  React.useEffect(async () => {
    const matches = await service.getMatches();
  }, []);

  return (
    <Table />
  );
}

export default MatchesTable;