import React from "react";
import IventList from "../../Offers/IventList";

function ActiveIvents({ ivents, close, edit }) {
  if (!ivents || !ivents.length) {
    return <h2>Nie masz aktywnych wydarzeń</h2>;
  }
  return (
    <IventList
      ivents={ivents}
      title="Aktywne wydarzenia"
      edit={edit}
      close={close}
    />
  );
}
export default ActiveIvents;
