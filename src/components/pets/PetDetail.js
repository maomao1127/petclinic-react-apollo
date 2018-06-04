import React, {Component} from "react"
import {Query} from "react-apollo"
import {GET_PET} from "./graphql";
import {Table} from "antd"

class PetDetail extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      }, {
        title: "Birth Date",
        dataIndex: "birthDate",
        key: "birthDate",
      }, {
        title: "Type",
        dataIndex: "type.name",
        key: "type.name",
      }, {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
        render: (text, record) => (
            <span>{record.owner.firstName + " " + record.owner.lastName}</span>
        )
      }];
  }

  render() {
    const {petId} = this.props;
    return (
        <Query query={GET_PET} variables={{id: petId}}>
          {
            ({data, loading}) => (
                !loading && <Table dataSource={[data.pet]} columns={this.columns} loading={loading}
                                   rowKey={"id"} pagination={false}/>)
          }
        </Query>
    )
  }
}

export default PetDetail;