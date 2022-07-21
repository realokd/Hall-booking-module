import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
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
  const [old, setold] = useState(0);

  const dbhit = () => {
    axios.get(`${baseurl}/hall/book/`).then((res) => {
      setda(res.data);
    });
  };
  useEffect(() => {
    dbhit();
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
      dbhit();
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
      title: "Status",
      dataIndex: "id",
      key: "id",
      render: (t, r, i) => {
        // console.log(r.status);
        if (update == false) {
          if (r.status[0].search(/waiting/) >= 0) {
            return <Tag color="warning">Pending</Tag>;
          }
          if (r.status[0].search(/approved/) >= 0) {
            return <Tag color="success">Approved</Tag>;
          }
          if (r.status[0].search(/rejected/) >= 0) {
            return <Tag color="error">Rejected</Tag>;
          }
        }
        if (update == true) {
          if (r.status[1].search(/waiting/) >= 0) {
            return <Tag color="warning">Pending</Tag>;
          }
          if (r.status[1].search(/approved/) >= 0) {
            return <Tag color="success">Approved</Tag>;
          }
          if (r.status[1].search(/rejected/) >= 0) {
            return <Tag color="error">Rejected</Tag>;
          }
        }
      },
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
  }

  const oldbooks = () => {
    if (old === 0) {
      axios
        .get(`${baseurl}/hall/book/`, {
          params: {
            old: 1,
          },
        })
        .then((res) => {
          setold(1);
          setda(res.data);
          console.log(res.data);
        });
    } else {
      setold(0);
      dbhit();
    }
  };
  return (
    <>
      <Button type="primary" className="float-right mb-4" onClick={oldbooks}>
        {old === 0 ? `Previous Bookings` : `Current Bookings`}
      </Button>
      <Table
        columns={columns}
        scroll={{ y: 450 }}
        rowKey="id"
        expandable={{
          onExpand: (expanded, record) => {
            if (expanded === true && edit === true) {
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
                  {edit && (
                    <>
                      <span className="font-bold text-lg">Select Place : </span>
                      <select
                        id={`${record.id}_select`}
                        className="w-full h-9 bg-slate-50 focus:bg-grey border"
                      ></select>
                    </>
                  )}

                  {update && (
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
    </>
  );
};

export default Bookings;

Bookings.defaultProps = {
  perm: {
    isEditable: false,
    isUpdatable: false,
  },
};
