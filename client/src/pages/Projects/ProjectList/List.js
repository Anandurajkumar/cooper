import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, UncontrolledDropdown } from 'reactstrap';
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from 'react-toastify';


//redux
import { useSelector, useDispatch } from 'react-redux';


//Import Icons
import FeatherIcon from "feather-icons-react";

//import action
import {
    getProjectList as onGetProjectList,
    deleteProjectList as onDeleteProjectList,
} from "../../../store/actions";

const List = () => {
    const dispatch = useDispatch();

    const { projectLists } = useSelector((state) => ({
        projectLists: state.Projects.projectLists,
    }));

    const [project, setProject] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(onGetProjectList());
    }, [dispatch]);

    useEffect(() => {
        setProject(projectLists);
    }, [projectLists]);

    // delete
    const onClickData = (project) => {
        setProject(project);
        setDeleteModal(true);
    };

    const handleDeleteProjectList = () => {
        if (project) {
            dispatch(onDeleteProjectList(project));
            setDeleteModal(false);
        }
    };

    const activebtn = (ele) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };
    console.log("from UI",projectLists);


    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteProjectList()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <Row className="g-4 mb-3">
                <div className="col-sm-auto">
                    <div>
                        <Link to="/projects-create" className="btn btn-success"><i
                            className="ri-add-line align-bottom me-1"></i> Add New Project</Link>
                    </div>
                </div>
                {/* <div className="col-sm">
                    <div className="d-flex justify-content-sm-end gap-2">
                        <div className="search-box ms-2">
                            <Input type="text" className="form-control" placeholder="Search..." />
                            <i className="ri-search-line search-icon"></i>
                        </div>

                        <select className="form-control w-md" data-choices data-choices-search-false>
                            <option >Status</option>
                            <option value="Active">Active</option>
                            <option value="Block">Block</option>
                        </select>
                    </div>
                </div> */}
            </Row>
            <div className="row">
                {(projectLists || []).map((item, index) => (
                    <React.Fragment key={index}>
                        {item.isDesign1 ?
                            <Col xxl={3} sm={6} className="project-card">
                                <Card className="card-height-100">
                                    <CardBody>
                                        <div className="d-flex flex-column h-100">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p className="text-muted mb-4">Created by: {item.owner}</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="d-flex gap-1 align-items-center">
                                                        {/* <button type="button" className={`btn avatar-xs mt-n1 p-0 favourite-btn `} onClick={(e) => activebtn(e.target)}>
                                                            <span className="avatar-title bg-transparent fs-15">
                                                                <i className="ri-star-fill"></i>
                                                            </span>
                                                        </button> */}
                                                        <UncontrolledDropdown direction='start'>
                                                            <DropdownToggle tag="button" className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15">
                                                                <FeatherIcon icon="more-horizontal" className="icon-sm" />
                                                            </DropdownToggle>

                                                            <DropdownMenu className="dropdown-menu-end">
                                                                <DropdownItem href="/bugs"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View Bugs</DropdownItem>
                                                                <Link
                                                                   to={{
                                                                    pathname:'/projects-update',
                                                                    state:{id:item._id,name:item.name,owner:item.owner,isDesign1:item.isDesign1,description:item.description,start_date:item.start_date,end_date:item.end_date}
                                                                   }}
                                                                ><DropdownItem><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</DropdownItem></Link>
                                                                
                                                                <div className="dropdown-divider"></div>
                                                                <DropdownItem href="#" onClick={() => onClickData(item)} data-bs-toggle="modal" data-bs-target="#removeProjectModal"><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Remove</DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar-sm">
                                                        <span className={"avatar-title rounded p-2 bg-soft-" }>
                                                            <img src="" alt="" className="img-fluid p-1" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">

                                                    <h5 className="mb-1 fs-15">                                               
                                                     <Link   to={{
                                                                    pathname:'/projects-overview',
                                                                    state:{start_date:item.start_date,end_date:item.end_date,description:item.description}
                                                                   }}>{item.name}</Link>
                                                    </h5>
                                                    <p className="text-muted text-truncate-two-lines mb-3"></p>
                                                </div>
                                            </div>
                                            <div className="mt-auto">
                                                <div className="d-flex mb-2">
                                                    <div className="flex-grow-1">
                                                        <div>Status: {item.status?"Active":"Inactive"}</div>
                                                    </div>
                                                    {/* <div className="flex-shrink-0">
                                                        <div><i className="ri-list-check align-bottom me-1 text-muted"></i> </div>
                                                    </div> */}
                                                </div>
                                                <div className="progress progress-sm animated-progess">
                                                    <div className="progress-bar bg-success"
                                                        role="progressbar" aria-valuenow="34" aria-valuemin="0" aria-valuemax="100"
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                    <div className="card-footer bg-transparent border-top-dashed py-2">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1">
                                                <div className="avatar-group">
                                                    {/* {item.subItem.map((item, key) => (
                                                        <React.Fragment key={key}>
                                                            {item.imgFooter ? <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Darline Williams">
                                                                <div className="avatar-xxs">
                                                                    <img src={item.imgFooter} alt="" className="rounded-circle img-fluid" />
                                                                </div>
                                                            </Link> : <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Add Members">
                                                                <div className="avatar-xxs">
                                                                    <div className={item.bgColor ? "avatar-title rounded-circle bg-" + item.bgColor : "avatar-title rounded-circle bg-light border-dashed border text-primary fs-16 "}>
                                                                        {item.imgNumber}
                                                                    </div>
                                                                </div>
                                                            </Link>}
                                                        </React.Fragment>
                                                    ))} */}
                                                </div>
                                            </div>
                                            {/* <div className="flex-shrink-0">
                                                <div className="text-muted">
                                                    <i className="ri-calendar-event-fill me-1 align-bottom"></i>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            : item.isDesign2 ?
                                <Col xxl={3} sm={6} className="project-card">
                                    <Card>
                                        <CardBody>
                                            <div className={`p-3 mt-n3 mx-n3 bg-soft-${item.cardHeaderClass} rounded-top`}>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-grow-1">
                                                        <h5 className="mb-0 fs-14"><Link to="/bugs" className="text-dark">{item.label}</Link></h5>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <div className="d-flex gap-1 align-items-center my-n2">
                                                            <button type="button" className={`btn avatar-xs mt-n1 p-0 favourite-btn ${item.ratingClass}`} onClick={(e) => activebtn(e.target)}>
                                                                <span className="avatar-title bg-transparent fs-15">
                                                                    <i className="ri-star-fill"></i>
                                                                </span>
                                                            </button>
                                                            <UncontrolledDropdown direction='start'>
                                                                <DropdownToggle tag="button" className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15">
                                                                    <FeatherIcon icon="more-horizontal" className="icon-sm" />
                                                                </DropdownToggle>

                                                                <DropdownMenu className="dropdown-menu-end">
                                                                    <DropdownItem href="/bugs"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</DropdownItem>
                                                                    <DropdownItem href="projects-create"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</DropdownItem>
                                                                    <div className="dropdown-divider"></div>
                                                                    <DropdownItem href="#" onClick={() => onClickData(item)} data-bs-toggle="modal" data-bs-target="#removeProjectModal"><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Remove</DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-3">
                                                <Row className="gy-3">
                                                    <Col xs={6}>
                                                        <div>
                                                            <p className="text-muted mb-1">Status</p>
                                                            <div className={"fs-12 badge badge-soft-" + item.statusClass}>{item.status}</div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div>
                                                            <p className="text-muted mb-1">Deadline</p>
                                                            <h5 className="fs-14">{item.deadline}</h5>
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <div className="d-flex align-items-center mt-3">
                                                    <p className="text-muted mb-0 me-2">Team :</p>
                                                    <div className="avatar-group">

                                                        {item.subItem.map((item, key) => (
                                                            <React.Fragment key={key}>
                                                                {item.imgTeam ? <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Darline Williams">
                                                                    <div className="avatar-xxs">
                                                                        <img src={item.imgTeam} alt="" className="rounded-circle img-fluid" />
                                                                    </div>
                                                                </Link> : <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Donna Kline">
                                                                    <div className="avatar-xxs">
                                                                        <div className={item.bgColor ? "avatar-title rounded-circle bg-" + item.bgColor : "avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary"}>
                                                                            {item.imgNumber}
                                                                        </div>
                                                                    </div>
                                                                </Link>}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="d-flex mb-2">
                                                    <div className="flex-grow-1">
                                                        <div>Progress</div>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <div>{item.progressBar}</div>
                                                    </div>
                                                </div>
                                                <div className="progress progress-sm animated-progess">
                                                    <div className="progress-bar bg-success"
                                                        role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
                                                        style={{ width: item.progressBar }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                : item.isDesign3 ?
                                    <Col xxl={3} sm={6} className="project-card">
                                        <Card>
                                            <CardBody>
                                                <div className={`p-3 mt-n3 mx-n3 bg-${item.cardHeaderClass} rounded-top`}>
                                                    <div className="d-flex gap-1 align-items-center justify-content-end my-n2">
                                                        <button type="button" className={`btn avatar-xs mt-n1 p-0 favourite-btn ${item.ratingClass}`} onClick={(e) => activebtn(e.target)}>
                                                            <span className="avatar-title bg-transparent fs-15">
                                                                <i className="ri-star-fill"></i>
                                                            </span>
                                                        </button>
                                                        <UncontrolledDropdown>

                                                            <DropdownToggle tag="button" className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15">
                                                                <FeatherIcon icon="more-horizontal" className="icon-sm" />
                                                            </DropdownToggle>

                                                            <DropdownMenu className="dropdown-menu-end">
                                                                <DropdownItem href="/bugs"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</DropdownItem>
                                                                <DropdownItem href="/projects-create"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</DropdownItem>
                                                                <DropdownItem divider />
                                                                <DropdownItem href="#" onClick={() => onClickData(item)} data-bs-toggle="modal" data-bs-target="#removeProjectModal"><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Remove</DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </div>
                                                    <div className="text-center pb-3">
                                                        <img src={item.img} alt="" height="32" />
                                                    </div>
                                                </div>

                                                <div className="py-3">
                                                    <h5 className="fs-14 mb-3"><Link to="/bugs" className="text-dark">{item.label}</Link></h5>
                                                    <Row className="gy-3">
                                                        <Col xs={6}>
                                                            <div>
                                                                <p className="text-muted mb-1">Status</p>
                                                                <div className={"fs-12 badge badge-soft-" + item.statusClass}>{item.status}</div>
                                                            </div>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <div>
                                                                <p className="text-muted mb-1">Deadline</p>
                                                                <h5 className="fs-14">{item.deadline}</h5>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <div className="d-flex align-items-center mt-3">
                                                        <p className="text-muted mb-0 me-2">Team :</p>
                                                        <div className="avatar-group">
                                                            {item.subItem.map((item, key) => (
                                                                <React.Fragment key={key}>
                                                                    {item.imgTeam ? <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Darline Williams">
                                                                        <div className="avatar-xxs">
                                                                            <img src={item.imgTeam} alt="" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </Link> : <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Donna Kline">
                                                                        <div className="avatar-xxs">
                                                                            <div className={item.bgColor ? "avatar-title rounded-circle bg-" + item.bgColor : "avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary"}>
                                                                                {item.imgNumber}
                                                                            </div>
                                                                        </div>
                                                                    </Link>}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="d-flex mb-2">
                                                        <div className="flex-grow-1">
                                                            <div>Tasks</div>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div><i className="ri-list-check align-bottom me-1 text-muted"></i> {item.number}</div>
                                                        </div>
                                                    </div>
                                                    <div className="progress progress-sm animated-progess">
                                                        <div className="progress-bar bg-success"
                                                            role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100"
                                                            style={{ width: item.progressBar }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    : null
                        }
                    </React.Fragment>
                ))}
                
            </div>
            <Row className="g-0 text-center text-sm-start align-items-center mb-4">
                    <Col sm={6}>
                        <div>
                            <p className="mb-sm-0 text-muted">Showing <span className="fw-semibold">1</span> to <span className="fw-semibold">10</span> of <span className="fw-semibold text-decoration-underline">12</span> entries</p>
                        </div>
                    </Col>

                    <Col sm={6}>
                        <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                            <li className="page-item disabled">
                                <Link to="#" className="page-link">Previous</Link>
                            </li>
                            <li className="page-item active">
                                <Link to="#" className="page-link">1</Link>
                            </li>
                            <li className="page-item ">
                                <Link to="#" className="page-link">2</Link>
                            </li>
                            <li className="page-item">
                                <Link to="#" className="page-link">3</Link>
                            </li>
                            <li className="page-item">
                                <Link to="#" className="page-link">4</Link>
                            </li>
                            <li className="page-item">
                                <Link to="#" className="page-link">5</Link>
                            </li>
                            <li className="page-item">
                                <Link to="#" className="page-link">Next</Link>
                            </li>
                        </ul>
                    </Col>
                </Row>



        </React.Fragment>
    );
};

export default List;
