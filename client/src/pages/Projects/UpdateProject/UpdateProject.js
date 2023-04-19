import React,{useState} from 'react';
import { addProjectList,apiError, updateProjectList } from '../../../store/actions';
import  { FormFeedback,Form} from 'reactstrap';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Alert} from 'reactstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";


import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Dropzone from "react-dropzone";

//Import Images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";

const UpdateProject = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const location = useLocation();
  const { id,name, owner, isDesign1,description,start_date,end_date } = location.state;


    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: name,
            owner: owner,
            id:id,
            description: description,
            isDesign1:isDesign1,
            start_date:start_date,
            end_date:end_date
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Enter project title"),
            owner: Yup.string().required("Enter the name of creator"),
            description: Yup.string().required("Enter project description"),
            isDesign1: Yup.string().required("Select the field"),
            start_date:Yup.string().required("Choose start date"),
            end_date:Yup.string().required("Choose due date")
            // date: Yup.string().when("description", {
            //     is: val => (val && val.length > 0 ? true : false),
            //     then: Yup.string().oneOf(
            //         [Yup.ref("description")],
            //         "Confirm description Isn't Match"
            //     )
            // })
        }),
        onSubmit: (values) => {
            dispatch(updateProjectList(values));
            history.push("projects")
            console.log("values",values);
            // const result=axios.post('http://localhost:5000/api/v1/project/adding_project',values);
            // console.log("result",result);
        }
    });



    const { error, registrationError, success } = useSelector(state => ({
        // registrationError: state.Account.registrationError,
        success: state.Account.success,
        error: state.Account.error
    }));

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => history.push("projects"), 3000);
        }

        // setTimeout(() => {
        //     dispatch(resetRegisterFlag());
        // }, 3000);

    }, [dispatch, success, error, history]);

    document.title = "Update Project | Urolime Bug Tracker";





    // const SingleOptions = [
    //     { value: 'Watches', label: 'Watches' },
    //     { value: 'Headset', label: 'Headset' },
    //     { value: 'Sweatshirt', label: 'Sweatshirt' },
    //     { value: '20% off', label: '20% off' },
    //     { value: '4 star', label: '4 star' },
    //   ];

//     const [selectedMulti, setselectedMulti] = useState(null);

//     const handleMulti = (selectedMulti) => {
//     setselectedMulti(selectedMulti);
//     }  
    
//     //Dropzone file upload
//     const [selectedFiles, setselectedFiles] = useState([]);
//     const [files, setFiles] = useState([]);
  
//     const handleAcceptedFiles = (files) => {
//       files.map(file =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//           formattedSize: formatBytes(file.size),
//         })
//       );
//       setselectedFiles(files);
//     }

//         /**
//      * Formats the size
//      */
//     const formatBytes = (bytes, decimals = 2) => {
//         if (bytes === 0) return "0 Bytes";
//         const k = 1024;
//         const dm = decimals < 0 ? 0 : decimals;
//         const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

//         const i = Math.floor(Math.log(bytes) / Math.log(k));
//         return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
//     }

// document.title="Create Project | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Update the Project" pageTitle="Projects" />
                    <Row>
                        <Col lg={8}>
                            <Card>
                                <CardBody>
                                    <div>
                                    <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className="needs-validation" action="#">

                                                {success && success ? (
                                                    <>
                                                        {toast("Your Redirect To Login Page...", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                                        <ToastContainer autoClose={2000} limit={1} />
                                                        <Alert color="success">
                                                            Project Added Successfully and Your Redirect To Project Page...
                                                        </Alert>
                                                    </>
                                                ) : null}

                                                {error && error ? (
                                                    <Alert color="danger"><div>
                                                        {/* {registrationError} */}
                                                        Project has been Register Before, Please Use Another name... </div></Alert>
                                                ) : null}

                                                <div className="mb-3">
                                                    <Label htmlFor="name" className="form-label">Project Title <span className="text-danger">*</span></Label>
                                                    <Input
                                                        defaultValue={name}
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder="Enter project title"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.name || ""}
                                                        invalid={
                                                            validation.touched.name && validation.errors.name ? true : false
                                                        }
                                                    />
                                                    {validation.touched.name && validation.errors.name ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.name}</div></FormFeedback>
                                                    ) : null}

                                                </div>
                                                <div className="mb-3">
                                                    <Label htmlFor="owner" className="form-label">Created By <span className="text-danger">*</span></Label>
                                                    <Input
                                                        defaultValue={owner}
                                                        name="owner"
                                                        type="text"
                                                        placeholder="Enter the name of creator"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.owner || ""}
                                                        invalid={
                                                            validation.touched.owner && validation.errors.owner ? true : false
                                                        }
                                                    />
                                                    {validation.touched.owner && validation.errors.owner ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.owner}</div></FormFeedback>
                                                    ) : null}

                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="description" className="form-label">Project Description <span className="text-danger">*</span></Label>
                                                    <Input
                                                        defaultValue={description}
                                                        name="description"
                                                        type="text"
                                                        placeholder="Enter project description"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.description || ""}
                                                        invalid={
                                                            validation.touched.description && validation.errors.description ? true : false
                                                        }
                                                    />
                                                    {validation.touched.description && validation.errors.description ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.description}</div></FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                <Label htmlFor="isDesign1" className="form-label">Status</Label>
                                                  <Input
                                                     checked={isDesign1}
                                                     name="isDesign1"
                                                     type="select"
                                                     className="form-select"
                                                    //  id="ticket-field"
                                                     onChange={validation.handleChange}
                                                     onBlur={validation.handleBlur}
                                                     value={
                                                     validation.values.isDesign1 || ""
                                                     }
                                                  >
                                                        <option value="">Status</option>
                                                        <option value="true">True</option>
                                                        <option value="false">False</option>
                                                   </Input>
                                                     {validation.touched.isDesign1 &&validation.errors.isDesign1 ? (
                                                        <FormFeedback type="invalid"> {validation.errors.isDesign1}
                                                        </FormFeedback>
                                                        ) : null
                                                    }
                                                </div>

                                                <div className="mb-2">
                                                    <Label htmlFor="start_date" className="form-label">Start date <span className="text-danger">*</span></Label>
                                                    <Input
                                                        defaultValue={start_date}
                                                        name="start_date"
                                                        type="date"
                                                        placeholder="Choose due date"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.start_date || ""}
                                                        invalid={
                                                            validation.touched.start_date && validation.errors.start_date ? true : false
                                                        }
                                                    />
                                                    {validation.touched.start_date && validation.errors.start_date ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.start_date}</div></FormFeedback>
                                                    ) : null}

                                                </div>



                                                <div className="mb-2">
                                                    <Label htmlFor="end_date" className="form-label">Due date <span className="text-danger">*</span></Label>
                                                    <Input
                                                    defaultValue={end_date}
                                                        name="end_date"
                                                        type="date"
                                                        placeholder="Choose due date"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.end_date || ""}
                                                        invalid={
                                                            validation.touched.end_date && validation.errors.end_date ? true : false
                                                        }
                                                    />
                                                    {validation.touched.end_date && validation.errors.end_date ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.end_date}</div></FormFeedback>
                                                    ) : null}

                                                </div>

                                                {/* <div className="mb-4">
                                                    <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon
                                                        <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                </div> */}

                                                {/* <div className="mt-4">
                                                    <button  className="btn btn-success w-100" type="submit">Create</button>
                                                </div> */}



                                                {/* <div className="mb-2">
                                                    <Label htmlFor="end_date" className="form-label">Due date <span className="text-danger">*</span></Label>
                                                    <Input
                                                        name="date"
                                                        type="date"
                                                        placeholder="Choose due date"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.end_date || ""}
                                                        invalid={
                                                            validation.touched.end_date && validation.errors.end_date ? true : false
                                                        }
                                                    />
                                                    {validation.touched.end_date && validation.errors.end_date ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.end_date}</div></FormFeedback>
                                                    ) : null}

                                                </div> */}

                                                {/* <div className="mb-4">
                                                    <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon
                                                        <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                </div> */}

                                                <div className="mt-4">
                                                    <button  className="btn btn-success w-100" type="submit">Update</button>
                                                </div>

                                                {/* <div className="mt-4 text-center">
                                                    <div className="signin-other-title">
                                                        <h5 className="fs-13 mb-4 title text-muted">Create account with</h5>
                                                    </div>

                                                    <div>
                                                        <button type="button" className="btn btn-primary btn-icon waves-effect waves-light"><i className="ri-facebook-fill fs-16"></i></button>{" "}
                                                        <button type="button" className="btn btn-danger btn-icon waves-effect waves-light"><i className="ri-google-fill fs-16"></i></button>{" "}
                                                        <button type="button" className="btn btn-dark btn-icon waves-effect waves-light"><i className="ri-github-fill fs-16"></i></button>{" "}
                                                        <button type="button" className="btn btn-info btn-icon waves-effect waves-light"><i className="ri-twitter-fill fs-16"></i></button>
                                                    </div>
                                                </div> */}
                                            </Form>

                                    </div>
                                    


                                    {/* <div className="mb-3">
                                        <Label className="form-label" htmlFor="project-title-input">Project Title</Label>
                                        <Input type="text"  className="form-control" id="project-title-input"
                                            placeholder="Enter project title" />
                                    </div> */}


                                    {/* <div className="mb-3">
                                        <Label className="form-label" htmlFor="project-thumbnail-img">Thumbnail Image</Label>
                                        <Input className="form-control" id="project-thumbnail-img" type="file" accept="image/png, image/gif, image/jpeg" />
                                    </div> */}

                                    {/* <div className="mb-3">
                                        <Label className="form-label">Project Description</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data="<p>Hello from CKEditor 5!</p>"
                                            onReady={(editor) => {
                                                // You can store the "editor" and use when it is needed.
                                                
                                            }}
                                            onChange={(editor) => {
                                                editor.getData();
                                            }}
                                            />
                                    </div> */}

                                    {/* <Row>
                                        <Col lg={4}>
                                            <div className="mb-3 mb-lg-0">
                                                <Label htmlFor="choices-priority-input" className="form-label">Priority</Label>
                                                <select className="form-select" data-choices data-choices-search-false
                                                    id="choices-priority-input">
                                                    <option defaultValue="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mb-3 mb-lg-0">
                                                <Label htmlFor="choices-status-input" className="form-label">Status</Label>
                                                <select className="form-select" data-choices data-choices-search-false
                                                    id="choices-status-input">
                                                    <option defaultValue="Inprogress">Inprogress</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div>
                                                <Label htmlFor="datepicker-deadline-input" className="form-label">Deadline</Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    // options={{
                                                    // dateFormat: "d M, Y"
                                                    // }}
                                                    placeholder="Selact Date"
                                                />
                                            </div>
                                        </Col>
                                    </Row> */}
                                </CardBody>
                            </Card>
                            <Card>
                                {/* <CardHeader >
                                    <h5 className="card-title mb-0">Attached files</h5>
                                </CardHeader> */}
                                {/* <CardBody>
                                    <div>
                                        <p className="text-muted">Add Attached files here.</p>

                                        <Dropzone
                                            onDrop={acceptedFiles => {
                                            handleAcceptedFiles(acceptedFiles);
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                            <div className="dropzone dz-clickable">
                                                <div
                                                className="dz-message needsclick"
                                                {...getRootProps()}
                                                >
                                                <div className="mb-3">
                                                    <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                                </div>
                                                <h4>Drop files here or click to upload.</h4>
                                                </div>
                                            </div>
                                            )}
                                        </Dropzone>

                                        <ul className="list-unstyled mb-0" id="dropzone-preview">
                                        
                                        {selectedFiles.map((f, i) => {
                                            return (
                                                <Card
                                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                key={i + "-file"}
                                                >
                                                <div className="p-2">
                                                    <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                        data-dz-thumbnail=""
                                                        height="80"
                                                        className="avatar-sm rounded bg-light"
                                                        alt={f.name}
                                                        src={f.preview}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                        to="#"
                                                        className="text-muted font-weight-bold"
                                                        >
                                                        {f.name}
                                                        </Link>
                                                        <p className="mb-0">
                                                        <strong>{f.formattedSize}</strong>
                                                        </p>
                                                    </Col>
                                                    </Row>
                                                </div>
                                                </Card>
                                            );
                                            })}
                                        </ul>

                                    </div>
                                </CardBody> */}
                            </Card>

                            {/* <div className="text-end mb-4">
                                <button type="submit" className="btn btn-danger w-sm me-1">Delete</button>
                                <button type="submit" className="btn btn-secondary w-sm me-1">Draft</button>
                                <button  type="submit" className="btn btn-success w-sm">Create</button>
                            </div> */}
                        </Col>

                        {/* <Col lg={4}>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Privacy</h5>
                                </div>
                                <CardBody>
                                    <div>
                                        <Label htmlFor="choices-privacy-status-input" className="form-label">Status</Label>
                                        <select className="form-select" data-choices data-choices-search-false
                                            id="choices-privacy-status-input">
                                            <option defaultValue="Private">Private</option>
                                            <option value="Team">Team</option>
                                            <option value="Public">Public</option>
                                        </select>
                                    </div>
                                </CardBody>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Tags</h5>
                                </div>
                                <CardBody>
                                    <div className="mb-3">
                                        <Label htmlFor="choices-categories-input" className="form-label">Categories</Label>
                                        <select className="form-select" data-choices data-choices-search-false
                                            id="choices-categories-input">
                                            <option defaultValue="Designing">Designing</option>
                                            <option value="Development">Development</option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label htmlFor="choices-text-input" className="form-label">Skills</Label>
                                        <Select
                                            value={selectedMulti}
                                            isMulti={true}                                                            
                                            onChange={() => {
                                                handleMulti();
                                            }}
                                            // options={SingleOptions}
                                        />
                                    </div>
                                </CardBody>
                            </div>

                            <Card>
                                <CardHeader>
                                    <h5 className="card-title mb-0">Members</h5>
                                </CardHeader>
                                <CardBody>
                                    <div className="mb-3">
                                        <Label htmlFor="choices-lead-input" className="form-label">Team Lead</Label>
                                        <select className="form-select" data-choices data-choices-search-false
                                            id="choices-lead-input">
                                            <option defaultValue="Brent Gonzalez">Brent Gonzalez</option>
                                            <option value="Darline Williams">Darline Williams</option>
                                            <option value="Sylvia Wright">Sylvia Wright</option>
                                            <option value="Ellen Smith">Ellen Smith</option>
                                            <option value="Jeffrey Salazar">Jeffrey Salazar</option>
                                            <option value="Mark Williams">Mark Williams</option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="form-label">Team Members</Label>
                                        <div className="avatar-group">
                                            <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Brent Gonzalez">
                                                <div className="avatar-xs">
                                                    <img src={avatar3} alt="" className="rounded-circle img-fluid" />
                                                </div>
                                            </Link>
                                            <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Sylvia Wright">
                                                <div className="avatar-xs">
                                                    <div className="avatar-title rounded-circle bg-secondary">
                                                        S
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Ellen Smith">
                                                <div className="avatar-xs">
                                                    <img src={avatar4} alt="" className="rounded-circle img-fluid" />
                                                </div>
                                            </Link>
                                            <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Add Members">
                                                <div className="avatar-xs" data-bs-toggle="modal" data-bs-target="#inviteMembersModal">
                                                    <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                                                        +
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default UpdateProject;
