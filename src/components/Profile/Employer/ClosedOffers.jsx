import React from "react";
import OfferList from "../../Offers/OfferList";

function ClosedOffers({ offers, remove, reactivate }) {
  if (!offers || !offers.length) {
    return <h2>Nie masz zamkniętych ofert</h2>;
  }
  return (
    <OfferList
      offers={offers}
      offerType="closedOffers"
      title="Zamknięte oferty"
      remove={remove}
      reactivate={reactivate}
    />
  );
}
export default ClosedOffers;
