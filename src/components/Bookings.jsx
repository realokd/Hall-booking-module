import { Table, Button, Input, Tag } from "antd";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { baseurl } from "../App";

const Bookings = (props) => {
  const edit = props.perm.isEditable;
  const update = props.perm.isUpdatable;

  const [da, setda] = useState([]);
  const [remark, setremark] = useState("");
  useEffect(() => {
    axios.get(`${baseurl}/hall/book/`).then((res) => {
      console.log(res.data);
      setda(res.data);
    });
  }, []);

  const rem = (e) => {
    setremark(e.target.value);
  };
  const reject = (i) => {
    da[i].rejected = true;
    // console.log(i);
  };

  const approvereject = (i) => {
    const dataa = {
      id: da[i].id,
      rejected: da[i].rejected,
      remarks: remark,
    };
    axios.put(`${baseurl}/hall/book/`, dataa).then((res) => {
      console.log(res.data);
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "hall_name",
      key: "hall_name",
    },
    {
      title: "Occupancy",
      dataIndex: "occupancy",
      key: "occupancy",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (t, r, i) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              approvereject(i);
            }}
          >
            Approve
          </Button>{" "}
          <Button
            type="primary"
            danger
            onClick={() => {
              reject(i);
              approvereject(i);
            }}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];
  if (edit === false && update === false) {
    columns.pop();
    columns.push({
      title: "Status",
      dataIndex: "id",
      key: "id",
      render: (t, r, i) => (
        <>
          {r.status.map((item) => {
            if (item.search(/waiting/) >= 0) {
              return <Tag color="warning">{item}</Tag>;
            } else if (item.search(/rejected/) >= 0) {
              return <Tag color="error">{item}</Tag>;
            } else {
              return <Tag color="success">{item}</Tag>;
            }
          })}
        </>
      ),
    });
  }
  return (
    <Table
      columns={columns}
      scroll={{ y: 450 }}
      rowKey="id"
      expandable={{
        onExpand: (expanded, record) => {
          if (expanded === true) {
            axios
              .get(`${baseurl}/hall/list/`, {
                params: {
                  start: record.start,
                  end: record.end,
                  occupancy: record.occupancy,
                  include_images: "False",
                },
              })
              .then((res) => {
                let arr = res.data;
                let selec = document.getElementById(`${record.id}_select`);
                selec.innerHTML = `<option value=${record.hall}>Keep Requested(${record.hall_name})</option>`;
                arr.map((item) => {
                  selec.innerHTML += `<option value='${item.id}' className="bg-white border text-white" >${item.name}</option>`;
                });
              });
          }
        },
        expandedRowRender: (record, index, indent, expanded) => {
          console.log("expand");
          return (
            <>
              <div className="grid grid-cols-2 grid-rows-2">
                <span>
                  <span className="font-bold">From : </span>
                  <span className="text-lg font-bold">
                    {record.start.split("T")[0]} /{" "}
                    {record.start.split("T")[1].substr(0, 5)}
                  </span>
                </span>
                <span>
                  <span className="font-bold">To : </span>
                  <span className="text-lg font-bold">
                    {record.end.split("T")[0]} /{" "}
                    {record.end.split("T")[1].substr(0, 5)}
                  </span>
                </span>
                <br />
                <br />
              </div>
              <div>
                {record.remarks.map((item, i) => {
                  return <Tag color="success">{item}</Tag>;
                })}
              </div>
              <div className="flex flex-col justify-between">
                {update && (
                  <>
                    <span className="font-bold text-lg">Select Place : </span>
                    <select
                      id={`${record.id}_select`}
                      className="w-full h-9 bg-slate-50 focus:bg-grey border"
                    ></select>
                  </>
                )}

                {edit && (
                  <div className="mt-5">
                    <span className="font-bold text-lg">Add Remarks : </span>
                    <Input.TextArea onChange={rem} />{" "}
                  </div>
                )}
              </div>
            </>
          );
        },
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={da}
    />
  );
};

export default Bookings;

Bookings.defaultProps = {
  perm: {
    isEditable: false,
    isUpdatable: false,
  },
};
