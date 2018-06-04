import React from "react"
import {Button, Form, Input} from 'antd';
import {Mutation, Query} from "react-apollo"
import {GET_OWNER, UPDATE_OWNER} from "./graphql";

const FormItem = Form.Item;

class EditOwnerForm extends React.Component {

  handleSubmit = (e, updateOwner) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        updateOwner(
            {variables: {...values, ownerId: this.props.owner.id}}
        );
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
        <Mutation mutation={UPDATE_OWNER} update={(cache, {data: {updateOwner}}) => {
          this.props.history.push(`/owners/${updateOwner.owner.id}`);
        }}>
          {
            updateOwner => (
                <div style={{margin: "0 10%"}}>
                  <h1>Update Owner</h1>
                  <Form onSubmit={e => this.handleSubmit(e, updateOwner)}>
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
                      <Button type="primary" htmlType="submit">Update Owner</Button>
                    </FormItem>
                  </Form>
                </div>
            )
          }
        </Mutation>
    );
  }
}

const EditOwnerFormHoc = Form.create({
  mapPropsToFields(props) {
    const owner = props.owner;
    if (owner) {
      const keys = Object.keys(owner);
      const result = {};
      keys.forEach(key => result[key] = Form.createFormField({value: owner[key]}));
      return result;
    }
  },
})(EditOwnerForm);

const EditOwner = props => (
    <Query query={GET_OWNER} variables={{id: props.match.params.id}}>
      {
        ({data: {owner}, loading}) => {
          if (loading) return (<p>Loading</p>);
          return (
              <EditOwnerFormHoc owner={owner} history={props.history}/>
          );
        }
      }
    </Query>
);

export default EditOwner;