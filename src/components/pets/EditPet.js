import React, {Component} from "react"
import {Button, DatePicker, Form, Input, Select} from "antd"
import {GET_PET, GET_PET_TYPES, UPDATE_PET} from "./graphql";
import {Mutation, Query} from "react-apollo"
import {GET_OWNER} from "../owners/graphql";
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

class EditPetForm extends Component {

  handleSubmit = (e, updatePet) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          'birthDate': fieldsValue['birthDate'].format('YYYY-MM-DD'),
        };
        console.log('Received values of form: ', values);
        updatePet({variables: {...values, petId: this.props.pet.id}});
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
        <Mutation mutation={UPDATE_PET} update={(cache, {data: {updatePet}}) => {
          this.props.history.push(`/owners/${owner.id}`);
        }}>
          {
            updatePet => (
                <div style={{margin: "0 10%"}}>
                  <h1>Update Pet from {owner.firstName + " " + owner.lastName}</h1>
                  <Form onSubmit={e => this.handleSubmit(e, updatePet)}>
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
                      <Button type="primary" htmlType="submit">Update Pet
                        from {owner.firstName + " " + owner.lastName}</Button>
                    </FormItem>
                  </Form>
                </div>
            )
          }
        </Mutation>
    )
  }
}

const EditPetFormHoc = Form.create({
  mapPropsToFields(props) {
    console.log(props)
    const pet = props.pet;
    if (pet) {
      const result = {};
      result["name"] = Form.createFormField({value: pet.name});
      result["birthDate"] = Form.createFormField({value: moment(pet.birthDate, "YYYY-MM-DD")});
      result["typeId"] = Form.createFormField({value: pet.type.id});
      return result;
    }
  },
})(EditPetForm);

const EditPet = props => (
    <Query query={GET_OWNER} variables={{id: props.match.params.id}}>
      {
        ({data: {owner}, loading: get_owner_loading}) => (
            <Query query={GET_PET_TYPES}>
              {
                ({data: {pettypes}, loading: get_pet_types_loading}) => (
                    <Query query={GET_PET} variables={{id: props.match.params.petId}}>
                      {
                        ({data: {pet}, loading: get_pet_loading}) => {
                          if (get_owner_loading || get_pet_types_loading || get_pet_loading) return (<p>Loading</p>);
                          return (
                              <EditPetFormHoc owner={owner} pettypes={pettypes} pet={pet} history={props.history}/>
                          )
                        }
                      }
                    </Query>
                )
              }
            </Query>
        )
      }
    </Query>
);

export default EditPet;