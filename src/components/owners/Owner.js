//希望用到cacheredirect
import React, {Component} from "react"
import {Query} from "react-apollo"
import {Button} from 'antd';
import {GET_OWNER} from "./graphql";
import {Pets} from "../pets"
import OwnerInfo from "./OwnerInfo"

class Owner extends Component {

  render() {
    const {id} = this.props.match.params;
    return (
        <div style={{margin: "0 10%"}}>
          <h1>Owner Information</h1>
          <Query query={GET_OWNER} variables={{id: id}}>
            {
              ({data: {owner}, loading}) => {
                if (loading) return (<p>Loading...</p>);
                return (
                    <div>
                      <OwnerInfo owner={owner}/>
                      <Button type="primary"
                              onClick={() => this.props.history.push(`/owners/${id}/edit`)}>Edit Owner</Button>
                      <Button type="primary" style={{marginLeft: 20}}
                              onClick={() => this.props.history.push(`/owners/${id}/pets/new`)}>Add New Pet</Button>
                      <h2 style={{marginTop: 20}}>Pets and Visits</h2>
                      <Pets pets={owner.pets}
                            onEditPet={petId => this.props.history.push(`/owners/${id}/pets/${petId}/edit`)}
                            onAddVisit={petId => this.props.history.push(`/owners/${id}/pets/${petId}/visits/new`)}/>
                    </div>
                )
              }
            }
          </Query>
        </div>
    )
  }
}

export default Owner;