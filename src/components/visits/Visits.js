import React, {Component} from "react"
import {Button, Col, Row} from "antd"

class Visits extends Component {
  render() {
    const {visits} = this.props;
    return (
        <div>
          <div style={{marginBottom: 20, marginTop: 10}}>
            <Row>
              <Col span={8}><strong>Visit Date</strong></Col>
              <Col span={8}><strong>Description</strong></Col>
            </Row>
            {
              visits.map(visit => (
                  <Row key={visit.id}>
                    <Col span={8}>{visit.date}</Col>
                    <Col span={8}>{visit.description}</Col>
                  </Row>
              ))
            }
          </div>
          <Button type="primary" onClick={this.props.onAdd}>Add Visit</Button>
        </div>
    )
  }
}

export default Visits;