import React from "react"
import {Button, Form, Input} from 'antd';
import {Mutation} from "react-apollo"
import {ADD_OWNER, GET_OWNERS} from "./graphql";

const FormItem = Form.Item;

class AddOwner extends React.Component {

  handleSubmit = (e, addOwner) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        addOwner({variables: values});
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
        <Mutation mutation={ADD_OWNER} update={(cache, {data: {addOwner}}) => {
          const {owners} = cache.readQuery({query: GET_OWNERS});
          cache.writeQuery({
            query: GET_OWNERS,
            data: {owners: owners.concat([addOwner.owner])}
          });
          this.props.history.push(`/owners/${addOwner.owner.id}`);
        }}>
          {
            addOwner => (
                <div style={{margin: "0 10%"}}>
                  <h1>Add Owner</h1>
                  <Form onSubmit={e => this.handleSubmit(e, addOwner)}>
                    <FormItem
                        {...formItemLayout}
                        label="First Name"
                    >
                      {getFieldDecorator('firstName', {
                        rules: [{
                          required: true, message: 'Please input first name!',
                        }],
                      })(
                          <Input/>
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Last Name"
                    >
                      {getFieldDecorator('lastName', {
                        rules: [{
                          required: true, message: 'Please input last name!',
                        }],
                      })(
                          <Input/>
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Address"
                    >
                      {getFieldDecorator('address', {
                        rules: [{
                          required: true, message: 'Please input address!',
                        }],
                      })(
                          <Input/>
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="City"
                    >
                      {getFieldDecorator('city', {
                        rules: [{
                          required: true, message: 'Please input city!',
                        }],
                      })(
                          <Input/>
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Telephone"
                    >
                      {getFieldDecorator('telephone', {
                        rules: [{
                          required: true, message: 'Please input telephone!',
                        }],
                      })(
                          <Input/>
                      )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">Add Owner</Button>
                    </FormItem>
                  </Form>
                </div>
            )
          }
        </Mutation>
    );
  }
}

export default Form.create()(AddOwner);