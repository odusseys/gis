import React from "react";
import { Select } from "@blueprintjs/select";
import { MenuItem, Button as MenuMain } from "@blueprintjs/core";

const renderPlaceOption = (place, { modifiers, handleClick }) => {
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={place.id}
      key={place.id}
      onClick={handleClick}
      text={place.name}
    />
  );
};

const PlaceSelector = ({ place_id, places, onSelect, onCreate }) => {
  const place = places.find(p => p.id === place_id);
  return (
    <Select
      items={places}
      itemPredicate={(q, p) => {
        return p.name.includes(q);
      }}
      itemRenderer={renderPlaceOption}
      onItemSelect={onSelect}
      noResults={<MenuItem text="Create a new place" onClick={onCreate} />}
    >
      <MenuMain
        text={place ? place.name : "Select a place"}
        rightIcon="double-caret-vertical"
      />
    </Select>
  );
};

export default PlaceSelector;
