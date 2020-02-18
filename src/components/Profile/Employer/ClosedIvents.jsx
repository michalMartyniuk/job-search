import React from "react";
import IventList from "../../Offers/IventList";

function ClosedIvents({ ivents, removeIvent, reactivateIvent }) {
  if (!ivents || !ivents.length) {
    return <h2>Nie masz zamkniętych wydarzeń</h2>;
  }
  return (
    <IventList
      ivents={ivents}
      iventType="closedIvents"
      title="Zamknięte wydarzenia"
      removeIvent={removeIvent}
      reactivateIvent={reactivateIvent}
    />
  );
}
export default ClosedIvents;
