import React from "react";
import IventList from "../../Offers/IventList";

function ClosedIvents({ items, remove, reactivate }) {
  if (!items || !items.length) {
    return <h2>Nie masz zamkniętych wydarzeń</h2>;
  }
  return (
    <IventList
      ivents={items}
      iventType="closedIvents"
      title="Zamknięte wydarzenia"
      remove={remove}
      reactivate={reactivate}
    />
  );
}
export default ClosedIvents;
