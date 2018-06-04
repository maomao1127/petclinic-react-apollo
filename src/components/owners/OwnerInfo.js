import React, {Component} from "react"
import {Col, Row} from "antd"

class OwnerInfo extends Component {
  render() {
    const {owner} = this.props;
    return (
        <div style={{marginBottom: 30}}>
          <Row style={{borderTop: "solid 2px #ddd"}}>
            <Col span={12}><strong>Name</strong></Col>
            <Col span={12}>{owner.firstName + "  " + owner.lastName}</Col>
          </Row>
          <Row style={{borderTop: "solid 2px #ddd"}}>
            <Col span={12}><strong>Address</strong></Col>
            <Col span={12}>{owner.address}</Col>
          </Row>
          <Row style={{borderTop: "solid 2px #ddd"}}>
            <Col span={12}><strong>City</strong></Col>
            <Col span={12}>{owner.city}</Col>
          </Row>
          <Row style={{borderTop: "solid 2px #ddd"}}>
            <Col span={12}><strong>Telephone</strong></Col>
            <Col span={12}>{owner.telephone}</Col>
          </Row>
        </div>
    )
  }
}

export default OwnerInfo;