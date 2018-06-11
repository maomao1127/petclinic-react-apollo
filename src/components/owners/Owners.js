import React from "react"
import {Button, Table} from "antd"
import {Query} from "react-apollo"
import {Link} from "react-router-dom";
import {GET_OWNERS} from "./graphql";

const getPets = pets => {
  if (pets.length > 0) {
    const arr = [...pets];
    const head = arr.shift();
    return arr.reduce((petStr, currentValue) => petStr + "," + currentValue.name, head.name);
  }

  return "";
};

const getVisits = pets => {
  if (pets.length > 0) {
    const arr = [...pets];
    const head = arr.shift();
    return arr.reduce((total, currentValue) => total + currentValue.visits.totalCount, head.visits.totalCount);
  }
  return 0;
};

const getDataSource = owners => {
  console.log(owners)
  if (owners) {
    return owners.map(owner => (
        {
          ...owner,
          name: owner.firstName + " " + owner.lastName,
          pets: getPets(owner.pets),
          visits: getVisits(owner.pets)
        }
    ));
  }
  return [];
};

class Owners extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
            <Link to={`/owners/${record.id}`}><span>{record.firstName + " " + record.lastName}</span></Link>
        )
      }, {
        title: "Address",
        dataIndex: "address",
        key: "address",
      }, {
        title: "City",
        dataIndex: "city",
        key: "city",
      }, {
        title: "Telephone",
        dataIndex: "telephone",
        key: "telephone",
      }, {
        title: "Pets",
        dataIndex: "pets",
        key: "pets",
      }, {
        title: "Visits",
        dataIndex: "visits",
        key: "visits"
      }];
  }

  render() {
    return (
        <div style={{margin: "0 10%"}}>
          <Query query={GET_OWNERS}>
            {
              ({data, error, loading}) => {
                if (error) return (<p>出错啦!{error.message}</p>);
                return (
                    <div>
                      {!loading && <h3>{data.owners.length} Owners found</h3>}
                      <Table dataSource={getDataSource(data.owners)} columns={this.columns} loading={loading}
                             rowKey={"id"}/>
                    </div>
                )
              }
            }
          </Query>
          <Button type="primary" onClick={() => this.props.history.push("/owners/add")}>Add Owner</Button>
        </div>
    )
  }
}

export default Owners;