import React from "react";
import { RibbonContainer, RightCornerRibbon } from "react-ribbons";

export default function SellerNotificationColThree() {
  return (
      <RibbonContainer className="card card-info">
        <RightCornerRibbon
          backgroundColor="#0088ff"
          color="#f0f0f0"
          fontFamily="Open Sans"
        >
          Notice
        </RightCornerRibbon>
        <div className="card-body">
          <p style={{ fontSize: 14, lineHeight: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Corporis
            numquam, a labore nesciunt mollitia, eius quod inventore eligendi
            quasi sequi officiis accusamus.Qui minus in sint quas error maiores
            quam aut at laudantium facilis reiciendis quae debitis dolorum
            accusantium incidunt, cum consectetur repellendus ducimus pariatur
          </p>
        </div>
      </RibbonContainer>
  );
}
