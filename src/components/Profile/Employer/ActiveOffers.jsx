import React from "react";
import OfferList from "../../Offers/OfferList";

function ActiveOffers({ offers, edit, close }) {
  if (!offers || !offers.length) {
    return <h2>Nie masz aktywnych ofert</h2>;
  }
  return (
    <OfferList
      offers={offers}
      title="Aktywne oferty"
      edit={edit}
      close={close}
    />
  );
}
export default ActiveOffers;
