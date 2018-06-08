import React, {Component} from "react"
import {Button, DatePicker, Form, Input} from "antd"
import {Mutation} from "react-apollo"
import {ADD_VISIT, GET_VISITS_OF_PET} from "./graphql";
import {PetDetail} from "../pets";

const FormItem = Form.Item;

class AddVisitForm extends Component {

  handleSubmit = (e, addVisit) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          'date': fieldsValue['date'].format('YYYY/MM/DD'),
        };
        console.log('Received values of form: ', values);
        addVisit({variables: {...values, petId: this.props.petId}});
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

    return (
        <Mutation mutation={ADD_VISIT} update={(cache, {data: {addVisit}}) => {
          const id = `Pet:${this.props.petId}`;
          const {visits} = cache.readFragment(
              {
                fragment: GET_VISITS_OF_PET,
                fragmentName: "Visits",
                id
              });
          cache.writeData({
            id: id,
            data: {
              visits: {
                totalCount: visits.totalCount + 1,
                visits: visits.visits.concat([addVisit.visit]),
                __typename: "VisitConnection"
              }
            }
          });
          this.props.history.push(`/owners/${this.props.ownerId}`);
        }}>
          {
            addVisit => (
                <div>
                  <h1>Add Visit</h1>
                  <Form onSubmit={e => this.handleSubmit(e, addVisit)}>
                    <FormItem
                        {...formItemLayout}
                        label="Date"
                    >
                      {getFieldDecorator('date', {
                        rules: [{
                          type: 'object', required: true, message: 'Please select visit date!'
                        }],
                      })(
                          <DatePicker/>
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Description"
                    >
                      {getFieldDecorator('description', {
                        rules: [{
                          required: true, message: 'Please input description!',
                        }],
                      })(
                          <Input/>
                      )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">Add Visit</Button>
                    </FormItem>
                  </Form>
                </div>
            )
          }
        </Mutation>
    )
  }
}

const AddVisitFormHoc = Form.create()(AddVisitForm);

class AddVisit extends Component {
  render() {
    const {id, petId} = this.props.match.params;
    return (
        <div style={{margin: "0 10%"}}>
          <PetDetail petId={petId}/>
          <AddVisitFormHoc petId={petId} ownerId={id} history={this.props.history}/>
        </div>
    )
  }
}

export default AddVisit;