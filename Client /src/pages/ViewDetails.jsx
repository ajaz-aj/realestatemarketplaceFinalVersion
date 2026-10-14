import React from "react";
import { useLocation } from "react-router-dom";
import ViewDetailsHero from "../components/ViewDetailsHero";
import ViewDetailsDescription from "../components/ViewDetailsDescription";
import ViewMoreAbout from "../components/ViewMoreAbout";
import ViewNeighborhood from "../components/ViewNeighborhood";

function ViewDetails() {
  const location = useLocation();
  const property = location.state?.property;

  return (
    <div>
      <ViewDetailsHero property={property} />
      <ViewDetailsDescription property={property} />
      <ViewMoreAbout property={property} />
      <ViewNeighborhood property={property} />
    </div>
  );
}

export default ViewDetails;