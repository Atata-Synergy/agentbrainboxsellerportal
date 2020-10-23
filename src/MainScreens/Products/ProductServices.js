import React, { Component } from "react";
import { FlexboxGrid, Panel, Divider, Toggle } from "rsuite";

export default class ProductServices extends Component {
  render() {
    const services = [
      {
        serviceName: "ATATA SecurePay",
        description:
          "ATATA SecurePay enables buyer to safely pay for goods and get a refund once the goods has not been supplied",
        value: false,
        onChange: "",
      },
      {
        serviceName: "ATATA insurance",
        description:
          "Choose from varieties of insurance company to insure your goods, incase of unforeseen circumstances",
        value: false,
        onChange: "",
      },
      {
        serviceName: "ATATA Logistics",
        description:
          "We give you potential buyer list of close registered logistics to deliver their purchase. Deactivate only if you have your personal logistic mean",
        value: false,
        onChange: "",
      },
      
    ];
    return (
      <Panel header="Activate ATATA Service on Product">
        {services.map((service) => (
          <>
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={6}>
                {service.serviceName}
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6}>
                {service.description}
              </FlexboxGrid.Item>
              <FlexboxGrid.Item
                colspan={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 15,
                }}
              >
                <Toggle defaultChecked />
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <Divider />
          </>
        ))}
      </Panel>
    );
  }
}
