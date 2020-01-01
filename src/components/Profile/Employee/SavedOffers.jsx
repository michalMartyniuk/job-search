import React from "react";
import OfferList from "../../Offers/OfferList";

function SavedOffers({ offers, remove }) {
  if (!offers || !offers.length) {
    return <h2>Nie masz zapisanych ofert</h2>;
  }
  return (
    <OfferList
      offers={offers}
      offerType="savedOffers"
      title="Zapisane oferty"
      remove={remove}
    />
  );
}
export default SavedOffers;
