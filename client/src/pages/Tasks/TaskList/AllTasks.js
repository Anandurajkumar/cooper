import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../../Components/Common/TableContainer';
import DeleteModal from "../../../Components/Common/DeleteModal";

// Import Scroll Bar - SimpleBar
import SimpleBar from 'simplebar-react';

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal, ModalBody, Row, Label, Input, Button, ModalHeader, FormFeedback, Form } from 'reactstrap';

import {
  getTaskList,
  addNewTask,
  updateTask,
  deleteTask,
} from "../../../store/actions";

import {
  OrdersId,
  Project,
  CreateBy,
  DueDate,
  Description,
  Status,
  Priority
} from "./TaskListCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Components/Common/Loader";

const Assigned = [
  { id: 1, imgId: "anna-adame", img: "avatar-1.jpg", name: "Anna Adame" },
  { id: 2, imgId: "frank-hook", img: "avatar-3.jpg", name: "Frank Hook" },
  { id: 3, imgId: "alexis-clarke", img: "avatar-6.jpg", name: "Alexis Clarke" },
  { id: 4, imgId: "herbert-stokes", img: "avatar-2.jpg", name: "Herbert Stokes" },
  { id: 5, imgId: "michael-morris", img: "avatar-7.jpg", name: "Michael Morris" },
  { id: 6, imgId: "nancy-martino", img: "avatar-5.jpg", name: "Nancy Martino" },
  { id: 7, imgId: "thomas-taylor", img: "avatar-8.jpg", name: "Thomas Taylor" },
  { id: 8, imgId: "tonya-noble", img: "avatar-10.jpg", name: "Tonya Noble" },
];


const AllTasks = () => {
  const dispatch = useDispatch();

  const { taskList, isTaskCreated, isTaskSuccess, error } = useSelector((state) => ({
    taskList: state.Tasks.taskList,
    isTaskCreated: state.Tasks.isTaskCreated,
    isTaskSuccess: state.Tasks.isTaskSuccess,
    error: state.Tasks.error,
  }));
  // console.log(taskList)

  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState([]);
  const [TaskList, setTaskList] = useState([]);

  // Delete Task
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTask(null);
    } else {
      setModal(true);
      setDate(defaultdate());
    }
  }, [modal]);

  // Delete Data
  const onClickDelete = (task) => {
    setTask(task);
    setDeleteModal(true);
  };

  useEffect(() => {
    setTaskList(taskList);
  }, [taskList]);

  // Delete Data
  const handleDeleteTask = () => {
    if (task) {
      dispatch(deleteTask(task._id));
      setDeleteModal(false);
    } setTimeout(() => window.onload(window.location.reload(true)), 1);
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use thi setTimeout(() => window.onload(window.location.reload(true)), 1);s flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      taskId: (task && task.taskId) || '',
      project: (task && task.project) || '',
      task: (task && task.task) || '',
      creater: (task && task.creater) || '',
      dueDate: (task && task.dueDate) || '',
      description: (task && task.description) || '',
      status: (task && task.status) || 'New',
      priority: (task && task.priority) || 'High',
      // subItem: (task && task.subItem) || [],
    },
    validationSchema: Yup.object({
      // taskId: Yup.string().required("Please Enter Task Id"),
      project: Yup.string().required("Please Enter Project Name"),
      task: Yup.string().required("Please Enter Your bug"),
      creater: Yup.string().required("Please Enter Creater Name"),
      // dueDate: Yup.string().required("Please Enter Due Date"),
      status: Yup.string().required("Please Enter Status"),
      priority: Yup.string().required("Please Enter Priority"),
      // subItem: Yup.array().required("Please Enter")
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log(values)
        const updatedTask = {
          _id: task ? task._id : 0,
          taskId: values.taskId,
          project: values.project,
          task: values.task,
          creater: values.creater,
          description: values.description,
          dueDate: date,
          status: values.status,
          priority: values.priority,
          // subItem: values.subItem,
        };
        // update customer
        dispatch(updateTask(updatedTask));
        validation.resetForm();
      } else {
        const newTask = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          taskId: values["taskId"],
          project: values["project"],
          task: values["task"],
          creater: values["creater"],
          dueDate: date,
          status: values["status"],
          description: values["description"],
          priority: values["priority"],
          // subItem: values["subItem"],
        };
        // save new customer
        dispatch(addNewTask(newTask));
        validation.resetForm();

      }
      toggle();
      setTimeout(() => window.onload(window.location.reload(true)), 1);

    },
  });

  // Update Data
  const handleCustomerClick = useCallback((arg) => {
    const task = arg;
    setTask({
      _id: task._id,
      taskId: task.bug_id,
      project: task.project,
      task: task.title,
      creater: task.reporter,
      dueDate: task.due_date,
      status: task.status,
      priority: task.priority,
      // subItem: task.subItem,
      description: task.description,

    });
// console.log(task)
    setIsEdit(true);
    toggle();
  }, [toggle]);

  // Add Data
  const handleTaskClicks = () => {
    setTask("");
    setIsEdit(false);
    toggle();
  };

  useEffect(() => {
    if (!isEmpty(taskList)) setTaskList(taskList);
  }, [taskList]);

  useEffect(() => {
    if (taskList && !taskList.length) {
      dispatch(getTaskList());

    }
  }, [dispatch, taskList]);


  useEffect(() => {
    setTaskList(taskList);
  }, [taskList]);

  useEffect(() => {
    if (!isEmpty(taskList)) {
      setTaskList(taskList);
      setIsEdit(false);
    }
  }, [taskList]);

  // Node API 
  // useEffect(() => {
  //   if (isTaskCreated) {
  //     setTask(null);
  //     dispatch(getTaskList());
  //   }
  // }, [
  //   dispatch,
  //   isTaskCreated,
  // ]);

  // Checked All
  const checkedAll = () => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".taskCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
  };

  // Delete Multiple
  const deleteMultiple = () => {
    const ele = document.querySelectorAll(".taskCheckBox:checked");
    const checkall = document.getElementById("checkBoxAll");
    ele.forEach((element) => {
      dispatch(deleteTask(element.value));
    });
    checkall.checked = false;
  };

  const columns = useMemo(
    () => [
      {
        Header: <input type="checkbox" id="checkBoxAll" onClick={() => checkedAll()} />,
        Cell: (cellProps) => {
          return <input type="checkbox" className="taskCheckBox" value={cellProps.row.original._id} />;
        },
        id: '#',
      },
      // {
      //   Header: "Order ID",
      //   accessor: "bug_id",
      //   filterable: false,
      //   Cell: (cellProps) => {
      //     return <OrdersId {...cellProps} />;
      //   },
      // },
      {
        Header: "Project",
        accessor: "project",
        filterable: false,
        Cell: (cellProps) => {
          return <Project {...cellProps} />;
        },
      },
      {
        Header: "Bugs",
        accessor: "title",
        filterable: false,
        Cell: (cellProps) => {
          return <React.Fragment>
            <div className="d-flex">
              <div className="flex-grow-1 tasks_name">{cellProps.value}</div>
              <div className="flex-shrink-0 ms-4">
                <ul className="list-inline tasks-list-menu mb-0">
                  <li className="list-inline-item">
                    <Link to="/apps-tasks-details">
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    {/* {console.log(cellProps)} */}
                    <Link to="#" onClick={() => { 
                      const taskData = cellProps.row.original; handleCustomerClick(taskData)
                    }}>
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="remove-item-btn" onClick={() => { const taskData = cellProps.row.original; onClickDelete(taskData); }}>
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>;
        },
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: false,
        Cell: (cellProps) => {
          return <Description {...cellProps} />;
        },
      },
      {
        Header: "Reported By",
        accessor: "reporter",
        filterable: false,
        Cell: (cellProps) => {
          return <CreateBy {...cellProps} />;
        },
      },
      // {
      //   Header: "Assigned To",
      //   accessor: "subItem",
      //   filterable: false,
      //   Cell: (cell) => {
      //     const assigned = cell.value.map((item) => item.img ? item.img : item);
      //     return (<React.Fragment>
      //       <div className="avatar-group">
      //         {assigned.map((item, index) => (

      //           <Link key={index} to="#" className="avatar-group-item">
      //             <img src={process.env.REACT_APP_API_URL + "/images/users/" + item} alt="" className="rounded-circle avatar-xxs" />
      //           </Link>

      //         ))}


      //       </div>
      //     </React.Fragment>);
      //   },
      // },
      {
        Header: "Due Date",
        accessor: "due_date",
        filterable: false,
        Cell: (cellProps) => {
          return <DueDate {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: false,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Priority",
        accessor: "priority",
        filterable: false,
        Cell: (cellProps) => {
          return <Priority {...cellProps} />;
        },
      },
    ],
    [handleCustomerClick]
  );

  const defaultdate = () => {
    let d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear()).toString());
  };

  const [date, setDate] = useState(defaultdate());

  const dateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setDate(joinDate);
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteTask}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Bugs</h5>
                <div className="flex-shrink-0">
                  <button className="btn btn-danger add-btn me-1" onClick={() => { setIsEdit(false); toggle(); }}><i className="ri-add-line align-bottom me-1"></i> Create Bug</button>
                  <button className="btn btn-soft-danger" onClick={() => setDeleteModalMulti(true)}><i className="ri-delete-bin-2-line"></i></button>
                </div>
              </div>
            </div>
            <div className="card-body pt-0">
              {/* {isTaskSuccess && taskList.length ? ( */}
              <TableContainer
                columns={columns}
                data={(taskList || [])}
                isGlobalFilter={true}
                isAddUserList={false}
                customPageSize={8}
                className="custom-header-css"
                divClass="table-responsive table-card mb-3"
                tableClass="align-middle table-nowrap mb-0"
                theadClass="table-light table-nowrap"
                thClass="table-light text-muted"
                handleTaskClick={handleTaskClicks}
                isTaskListFilter={true}
              />
              {/* ) : (<Loader error={error} />) */}
              {/* }  */}
              <ToastContainer closeButton={false} />
            </div>
          </div>
        </Col>
      </div>


      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName='modal fade zoomIn'
      >
        <ModalHeader className="p-3 bg-soft-info" toggle={toggle}>
          {!!isEdit ? "Edit Task" : "Create Bug"}
        </ModalHeader>
        <Form onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}>
          <ModalBody className="modal-body">
            <Row className="g-3">
              {/* <Col lg={12}>
                <Label for="taskId-field" className="form-label">Order Id</Label>
                <Input
                  name="taskId"
                  id="taskId-field"
                  className="form-control"
                  placeholder="Enter Task Id "
                  type="text"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.taskId || ""}
                  invalid={
                    validation.touched.taskId && validation.errors.taskId ? true : false
                  }
                />
                {validation.touched.taskId && validation.errors.taskId ? (
                  <FormFeedback type="invalid">{validation.errors.taskId}</FormFeedback>
                ) : null}
              </Col> */}

              <Col lg={12}>
                <Label for="projectName-field" className="form-label">Project Name</Label>
                <Input
                  name="project"
                  id="projectName-field"
                  className="form-control"
                  placeholder="Project name"
                  type="text"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.project || ""}
                  invalid={
                    validation.touched.project && validation.errors.project ? true : false
                  }
                />
                {validation.touched.project && validation.errors.project ? (
                  <FormFeedback type="invalid">{validation.errors.project}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <div>
                  <Label for="tasksTitle-field" className="form-label">Bug Title</Label>
                  <Input
                    name="task"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Title"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.task || ""}
                    invalid={
                      validation.touched.task && validation.errors.task ? true : false
                    }
                  />
                  {validation.touched.task && validation.errors.task ? (
                    <FormFeedback type="invalid">{validation.errors.task}</FormFeedback>
                  ) : null}


                </div>
              </Col>
              <Col lg={12}>
                <Label for="clientName-field" className="form-label">Reporter Name</Label>
                <Input
                  name="creater"
                  id="clientName-field"
                  className="form-control"
                  placeholder="name"
                  type="text"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.creater || ""}
                  invalid={
                    validation.touched.creater && validation.errors.creater ? true : false
                  }
                />
                {validation.touched.creater && validation.errors.creater ? (
                  <FormFeedback type="invalid">{validation.errors.creater}</FormFeedback>
                ) : null}
              </Col>

              <Col lg={12}>
                <Label for="description-field" className="form-label">Description </Label>
                <Input
                  name="description"
                  id="description-field"
                  className="form-control"
                  placeholder="name"
                  type="text"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  invalid={
                    validation.touched.description && validation.errors.description ? true : false
                  }
                />
                {validation.touched.description && validation.errors.description ? (
                  <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                ) : null}
              </Col>

              {/* <Col lg={12}>
                <Label className="form-label">Assigned To</Label>
                <SimpleBar style={{ maxHeight: "95px" }}>
                  <ul className="list-unstyled vstack gap-2 mb-0">
                    {Assigned.map((item, key) => (<li key={key}>
                      <div className="form-check d-flex align-items-center">
                        <Input name="subItem" className="form-check-input me-3" type="checkbox"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={item.img}
                          invalid={validation.touched.subItem && validation.errors.subItem ? true : false}
                          id={item.imgId} />

                        <Label className="form-check-label d-flex align-items-center" htmlFor={item.imgId}>
                          <span className="flex-shrink-0">
                            <img src={process.env.REACT_APP_API_URL + "/images/users/" + item.img} alt="" className="avatar-xxs rounded-circle" />
                          </span>
                          <span className="flex-grow-1 ms-2">
                            {item.name}
                          </span>
                        </Label>
                        {validation.touched.subItem && validation.errors.subItem ? (
                          <FormFeedback type="invalid">{validation.errors.subItem}</FormFeedback>
                        ) : null}
                      </div>
                    </li>))}
                  </ul>
                </SimpleBar>
              </Col> */}

              <Col lg={6}>
                <Label for="duedate-field" className="form-label">Due Date</Label>

                <Flatpickr
                  name="dueDate"
                  id="duedate-field"
                  className="form-control"
                  placeholder="Select a date"
                  options={{
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "d M, Y",
                  }}
                  onChange={(e) =>
                    dateformate(e)
                  }
                  value={validation.values.dueDate || ""}
                />
                {validation.touched.dueDate && validation.errors.dueDate ? (
                  <FormFeedback type="invalid">{validation.errors.dueDate}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label for="ticket-status" className="form-label">Status</Label>
                <Input
                  name="status"
                  type="select"
                  className="form-select"
                  id="ticket-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={
                    validation.values.status || ""
                  }
                >
                  <option value="">Status</option>
                  <option value="New">New</option>
                  <option value="Inprogress">Inprogress</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Input>
                {validation.touched.status &&
                  validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <Label for="priority-field" className="form-label">Priority</Label>
                <Input
                  name="priority"
                  type="select"
                  className="form-select"
                  id="priority-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={
                    validation.values.priority || ""
                  }
                >
                  <option value="">Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Input>
                {validation.touched.priority &&
                  validation.errors.priority ? (
                  <FormFeedback type="invalid">
                    {validation.errors.priority}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                type="button"
                onClick={() => {
                  setModal(false);
                }}
                className="btn-light"
              >Close</Button>
              <button type="submit" className="btn btn-success" id="add-btn">{!!isEdit ? "Update Bug" : "Add Bug"}</button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AllTasks;
// console.log(AllTasks)