import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import BracetsTree from '../BracetsTree';
import { useRouter } from 'next/router'

import generator from 'tournament-generator';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 4
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 20
    }
  }
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 20,
      offset: 4
    }
  }
};



const NTForm = () => {

  const router = useRouter()

  const [tournire, setTournire] = useState([])

  const onFinish = (values) => {
    console.log("Received values of form:", values)
    var myTournament = {
      name: values.Tournamentname,
      teams: values.teams,
      games: generator(values.teams, { type: 'single-round' })
    };
    setTournire(myTournament)
  };

  useEffect(() => {
    console.log(console.log('myTournament', tournire));
  }, [tournire])

  async function onSave(tournire) {
    if (tournire.length === 0) return
    try {
      const url = 'http://localhost:3000/api/tournaments'
      console.log("Received values for save", tournire)
      const res = await fetch(
        url, {
        method: 'POST',
        body: JSON.stringify(tournire),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      const json = await res.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
    router.push('/tournaments')
  }


  return (
    <>
      <Form
        name="new_tournament"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tournament name"
          name="Tournamentname"
          rules={[
            {
              required: true,
              message: 'Please input your Tournament name!',
            },
          ]}
        >
          <Input
            style={{
              width: "60%",
              margin: "0.5rem"
            }}
          />
        </Form.Item>
        <Form.List
          name="teams"
          rules={[
            {
              validator: async (_, teams) => {
                if (!teams || teams.length < 2) {
                  return Promise.reject(new Error("Min 2 teams"));
                }
              }
            }
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Team" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input team`s name or delete this field."
                      }
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="team name"
                      style={{
                        width: "60%",
                        margin: "0.5rem"
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%"
                  }}
                  icon={<PlusOutlined />}
                >
                  Add team
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
      <BracetsTree games={tournire?.games?.data} />
      <Button
        onClick={() => {
          onSave(tournire)
        }}
      >
        Save
      </Button>
    </>
  );

};

export default NTForm;