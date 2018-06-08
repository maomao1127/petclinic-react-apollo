import React, {Component} from "react"
import {Button, DatePicker, Form, Input, Select} from "antd"
import {ADD_PET, GET_PET_TYPES, GET_PETS_OF_OWNER} from "./graphql";
import {Mutation, Query} from "react-apollo"
import {GET_OWNER} from "../owners/graphql";

const FormItem = Form.Item;
const Option = Select.Option;

class AddPetForm extends Component {

  handleSubmit = (e, addPet) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          'birthDate': fieldsValue['birthDate'].format('YYYY/MM/DD'),
        };
        console.log('Received values of form: ', values);
        addPet({variables: {...values, ownerId: this.props.owner.id}});
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const {owner, pettypes} = this.props;

    return (
        <Mutation mutation={ADD_PET} update={(cache, {data: {addPet}}) => {
          const id = `Owner:${owner.id}`;
          const {pets} = cache.readFragment(
              {
                fragment: GET_PETS_OF_OWNER,
                fragmentName: "Pets",
                id
              });
          cache.writeData({id: id, data: {pets: pets.concat([addPet.pet])}});
          this.props.history.push(`/owners/${owner.id}`);
        }}>
          {
            addPet => (
                <div style={{margin: "0 10%"}}>
                  <h1>Add Pet for {owner.firstName + " " + owner.lastName}</h1>
                  <Form onSubmit={e => this.handleSubmit(e, addPet)}>
                    <FormItem
                        {...formItemLayout}
                        label="Name"
                    >
                      {getFieldDecorator('name', {
                        rules: [{
                          required: true, message: 'Please input name!',
                        }],
                      })(
                          <Input/>
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="BirthDate"
                    >
                      {getFieldDecorator('birthDate', {
                        rules: [{
                          type: 'object', required: true, message: 'Please select birth date!'
                        }],
                      })(
                          <DatePicker/>
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Types"
                    >
                      {getFieldDecorator('typeId', {initialValue: pettypes[0].id}, {
                        rules: [
                          {required: true, message: 'Please select a type!'},
                        ],
                      })(
                          <Select placeholder="Please select a type">
                            {
                              pettypes.map(pettype => (
                                  <Option value={pettype.id} key={pettype.id}>{pettype.name}</Option>))
                            }
                          </Select>
                      )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">Add Pet
                        for {owner.firstName + " " + owner.lastName}</Button>
                    </FormItem>
                  </Form>
                </div>
            )
          }
        </Mutation>
    )
  }
}

const AddPetFormHoc = Form.create()(AddPetForm);

const AddPet = props => (
    <Query query={GET_OWNER} variables={{id: props.match.params.id}}>
      {
        ({data: {owner}, loading}) => {
          if (loading) return (<p>Loading</p>);
          return (
              <Query query={GET_PET_TYPES}>
                {
                  ({data: {pettypes}, loading}) => {
                    if (loading) return (<p>Loading</p>);
                    return (
                        <AddPetFormHoc owner={owner} history={props.history} pettypes={pettypes}/>
                    )
                  }
                }
              </Query>
          );
        }
      }
    </Query>
);

export default AddPet;