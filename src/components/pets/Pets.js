import React, {Component} from "react"
import {Col, Row} from "antd"
import Pet from "./Pet"
import {Visits} from "../visits";

class Pets extends Component {
  render() {
    const {pets, onEditPet, onAddVisit} = this.props;
    return (
        <div>
          {pets.length === 0 && <h3>This owner has no Pets</h3>}
          {pets.length > 0 && pets.map(pet => (
              <Row style={{borderTop: "solid 2px #ddd", marginTop: 10}} key={pet.id}>
                <Col span={12}>
                  <Pet pet={pet} onEdit={() => onEditPet(pet.id)}/></Col>
                <Col span={12}>
                  <Visits visits={pet.visits.visits} onAdd={() => onAddVisit(pet.id)}/>
                </Col>
              </Row>
          ))
          }
        </div>
    );
  }
}

export default Pets;