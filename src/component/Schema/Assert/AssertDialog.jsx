import React from "react";
import PropTypes from "prop-types";
import { Form,  Row, Col, Select, Input } from "antd";
import If from "component/Global/If";
import { getAssertion } from "./helpers";
import AbstractComponent from "component/AbstractComponent";

const Option = Select.Option,
      FormItem = Form.Item;

export class AssertDialog extends AbstractComponent {

  state = {
    assertion: "",
    type: ""
  }

  static propTypes = {
    record: PropTypes.object.isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired
    })
  }

  onSelectAssertion = ( value ) => {
    this.setState({
      assertion: value
    });
  }

  onSelectType = ( value ) => {
    this.setState({
      type: value
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form,
          { record } = this.props,
          assertion = this.state.assertion || getAssertion( record ).assertion || "equals",
          type = this.state.type || record.assert.type || "any",
          value = record.assert.value || "";
    return (<React.Fragment>
      <Row gutter={24} >
          <Col span={8} >
            <FormItem label="Message Type">
              { getFieldDecorator( "assert.type", {
                initialValue: type,
                rules: [{
                  required: true
                }]
              })( <Select >
              <Option value="any">any</Option>
              <Option value="alert">alert</Option>
              <Option value="beforeunload">beforeunload</Option>
              <Option value="confirm">confirm</Option>
              <Option value="prompt">prompt</Option>
            </Select> ) }
            </FormItem>
          </Col>
      </Row>
      <Row gutter={24}>

        <Col span={8} >
          <FormItem label="Message">
            { getFieldDecorator( "assert.assertion", {
              initialValue: assertion,
              rules: [{
                required: true
              }]
            })( <Select
              onSelect={ this.onSelectAssertion }>
              <Option value="equals">equals</Option>
              <Option value="contains">contains</Option>
            </Select> ) }
          </FormItem>
        </Col>



        <If exp={ !!assertion }>
          <Col span={12} >
            <FormItem label="Value">
              { getFieldDecorator( "assert.value", {
                initialValue: value,
                rules: [{
                  required: true
                }]
              })(
                <Input />
              ) }
            </FormItem>
            <div className="under-field-decription">You can use
              { "" } <a onClick={ this.onExtClick } href="https://docs.puppetry.app/template">
              template expressions</a>
            </div>
          </Col>
        </If>



      </Row>
      </React.Fragment>);
  }
}