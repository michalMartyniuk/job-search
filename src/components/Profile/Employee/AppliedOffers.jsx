import React from "react";
import OfferList from "../../Offers/OfferList";

function AppliedOffers({ offers, remove }) {
  if (!offers || !offers.length) {
    return <h2>Nie masz aplikowanych ofert</h2>;
  }
  return (
    <OfferList
      offers={offers}
      offerType="appliedOffers"
      title="Aplikowane oferty"
      remove={remove}
    />
  );
}
export default AppliedOffers;
