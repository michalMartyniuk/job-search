import React from "react";
import IventList from "../../Offers/IventList";

function ActiveIvents({ ivents, closeIvent }) {
  if (!ivents || !ivents.length) {
    return <h2>Nie masz aktywnych wydarzeń</h2>;
  }
  return (
    <IventList
      ivents={ivents}
      title="Aktywne wydarzenia"
      closeIvent={closeIvent}
    />
  );
}
export default ActiveIvents;
