import React from "react";
import IventList from "../../Offers/IventList";

function AppliedIvents({ ivents, removeIvent }) {
  if (!ivents || !ivents.length) {
    return <h2>Nie masz aplikowanych wydarzeń</h2>;
  }
  return (
    <IventList
      ivents={ivents}
      iventType="appliedIvents"
      title="Aplikowane wydarzenia"
      removeIvent={removeIvent}
    />
  );
}
export default AppliedIvents;
