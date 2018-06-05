import React from "react"
import {Mutation, Query} from "react-apollo"
import {Button, Input, Table} from "antd"
import {ADD_SPEC, GET_SPECS, REMOVE_SPEC, UPDATE_SPEC} from "./graphql";

const getDataSource = specialties => {
  if (specialties) {
    return [...specialties, {id: -1, name: ""}]
  }
  return [];
};

class Specialties extends React.Component {

  add = (id, addSpecialty) => {
    const value = document.getElementById(`input_${id}`).value;
    if (value !== "") {
      addSpecialty({variables: {name: value}});
    }
  };

  update = (id, updateSpecialty) => {
    const value = document.getElementById(`input_${id}`).value;
    const defaultValue = document.getElementById(`input_${id}`).defaultValue;
    if (value !== "" && value !== defaultValue) {
      updateSpecialty({variables: {name: value, specialtyId: id}});
    }
  };

  reset = (id) => {
    document.getElementById(`input_${id}`).value = document.getElementById(`input_${id}`).defaultValue;
  };

  handleError = (id, error) => {
    document.getElementById(`error_${id}`).innerHTML = error.message;
    document.getElementById(`error_${id}`).style.display = "block";
    document.getElementById(`suc_${id}`).style.display = "none";
  };

  handleSuc = id => {
    document.getElementById(`suc_${id}`).innerHTML = "OK:saved";
    document.getElementById(`error_${id}`).style.display = "none";
    document.getElementById(`suc_${id}`).style.display = "block";
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text, record) => {
          return (
              <div>
                <Input style={{width: "50%", marginRight: "20px"}} defaultValue={record.name}
                       id={`input_${record.id}`}/>
                {record.name !== "" && (
                    <Mutation mutation={UPDATE_SPEC}
                              onError={error => this.handleError(record.id, error)}
                              onCompleted={() => this.handleSuc(record.id)}>
                      {
                        updateSpecialty => (<Button type="primary"
                                                    onClick={() => this.update(record.id, updateSpecialty)}>Update</Button>)
                      }
                    </Mutation>)
                }
                {record.name !== "" && (
                    <Mutation mutation={REMOVE_SPEC}
                              update={(cache, {data: {removeSpecialty}}) => {
                                cache.writeQuery({
                                  query: GET_SPECS,
                                  data: {specialties: [...removeSpecialty.specialties]}
                                });
                              }}
                              onError={error => this.handleError(record.id, error)}
                              onCompleted={() => this.handleSuc(record.id)}>
                      {
                        removeSpecialty => (
                            <Button type="primary"
                                    onClick={() => removeSpecialty({variables: {specialtyId: record.id}})}>Remove</Button>)
                      }
                    </Mutation>)
                }
                {record.name === "" && (
                    <Mutation mutation={ADD_SPEC}
                              update={(cache, {data: {addSpecialty}}) => {
                                const {specialties} = cache.readQuery({query: GET_SPECS});
                                cache.writeQuery({
                                  query: GET_SPECS,
                                  data: {specialties: specialties.concat([addSpecialty.specialty])}
                                });
                              }}
                              onError={error => this.handleError(record.id, error)}
                              onCompleted={() => this.handleSuc(record.id)}>
                      {
                        addSpecialty => (
                            <Button type="primary" onClick={() => this.add(record.id, addSpecialty)}>Add</Button>
                        )
                      }
                    </Mutation>)
                }
                <Button type="primary" onClick={() => this.reset(record.id)}>Reset</Button>
                <br/>
                <p id={`error_${record.id}`} style={{color: "red", marginTop: 5, display: "none"}}></p>
                <p id={`suc_${record.id}`} style={{marginTop: 5, display: "none"}}></p>
              </div>
          )
        }
      }];

    return (
        <div style={{margin: "0 10%"}}>
          <h1>Edit or add specialties</h1>
          <Query query={GET_SPECS}>
            {
              ({data: {specialties}, loading}) => (
                  <Table columns={columns} dataSource={getDataSource(specialties)} loading={loading}
                         rowKey={"id"} pagination={false}/>
              )
            }
          </Query>
          {/*<Button type="primary" style={{marginTop: 20}} onClick={() => this.props.history.push("/home")}>Home</Button>*/}
        </div>
    )
  }
}

export default Specialties;