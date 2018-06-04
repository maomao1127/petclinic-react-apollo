import React from "react"
import {Query} from "react-apollo"
import {Table} from "antd"
import {GET_VETS} from "./graphql"

const getSpecialties = specialties => {
  if (specialties.length > 0) {
    const arr = [...specialties];
    const head = arr.shift();
    return arr.reduce((str, currentValue) => str + "," + currentValue.name, head.name);
  }
  return "none";
};

const getDataSource = vets => {
  if (vets) {
    return vets.map(vet => (
        {...vet, name: vet.firstName + " " + vet.lastName, specialties: getSpecialties(vet.specialties)}
    ));
  }
  return [];
};

class Veterinarians extends React.Component {
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      }, {
        title: "Specialties",
        dataIndex: "specialties",
        key: "specialties",
      }];

    return (
        <div style={{margin: "0 10%"}}>
          <Query query={GET_VETS}>
            {
              ({data: {vets}, loading}) => (
                  <div>
                    <h1>Veterinarians</h1>
                    <Table dataSource={getDataSource(vets)} columns={columns} loading={loading} rowKey={"id"}/>
                  </div>
              )
            }
          </Query>
        </div>
    )
  }
}

export default Veterinarians;