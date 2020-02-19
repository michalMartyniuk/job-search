import React from "react";
import IventList from "../../Offers/IventList";

function AppliedIvents({ ivents, remove }) {
  if (!ivents || !ivents.length) {
    return <h2>Nie masz aplikowanych wydarzeń</h2>;
  }
  return (
    <IventList
      ivents={ivents}
      iventType="appliedIvents"
      title="Aplikowane wydarzenia"
      remove={remove}
    />
  );
}
export default AppliedIvents;
