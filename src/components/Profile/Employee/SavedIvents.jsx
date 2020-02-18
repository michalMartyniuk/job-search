import React from "react";
import IventList from "../../Offers/IventList";

function SavedIvents({ ivents, remove }) {
  if (!ivents || !ivents.length) {
    return <h2>Nie masz zapisanych szkoleń</h2>;
  }
  return (
    <IventList
      ivents={ivents}
      iventType="savedIvents"
      title="Zapisane oferty szkoleń i konferencji"
      remove={remove}
    />
  );
}
export default SavedIvents;
