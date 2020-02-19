import React from "react";
import OfferList from "../../Offers/OfferList";

function ClosedOffers({ items, remove, reactivate }) {
  if (!items || !items.length) {
    return <h2>Nie masz zamkniętych ofert</h2>;
  }
  return (
    <OfferList
      offers={items}
      offerType="closedOffers"
      title="Zamknięte oferty"
      remove={remove}
      reactivate={reactivate}
    />
  );
}
export default ClosedOffers;
