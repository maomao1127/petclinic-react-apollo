import React, {Component} from "react"
import {Button, Col, Row} from 'antd';

class Pet extends Component {
  render() {
    const {pet} = this.props;
    return (
        <div>
          <div style={{marginBottom: 20, marginTop: 10}}>
            <Row>
              <Col span={12}><strong>Name</strong></Col>
              <Col span={12}>{pet.name}</Col>
            </Row>
            <Row>
              <Col span={12}><strong>Birth Date</strong></Col>
              <Col span={12}>{pet.birthDate}</Col>
            </Row>
            <Row>
              <Col span={12}><strong>Type</strong></Col>
              <Col span={12}>{pet.type.name}</Col>
            </Row>
          </div>
          <Button type="primary"
                  onClick={this.props.onEdit}>Edit Pet</Button>
        </div>
    )
  }
}

export default Pet;