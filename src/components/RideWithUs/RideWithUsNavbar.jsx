import React from 'react'
import { Link } from 'react-router-dom'

const RideWithUsNavbar = () => {
    return (
        <header>
            <div className="container">
                <nav className="navbar navbar-expand-lg p-0">
                    <Link href="index.html">
                        <img
                            className="img-fluid logo"
                            src="/assets/images/newlogo3.png"
                            alt="logo"
                        />
                    </Link>
                    <button
                        className="navbar-toggler ml-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#offcanvasNavbar"
                    >
                        <span className="navbar-toggler-icon">
                            <i className="ri-menu-line" />
                        </span>
                    </button>
                    <div className="nav-option order-md-2">
                        <div className="nav-option order-md-2">
                            <Link href="javascript:void()" className="btn theme-btn">
                                Apply
                            </Link>
                        </div>
                    </div>
                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex={-1}
                        id="offcanvasNavbar"
                    >
                        <div className="offcanvas-header">
                            <h4
                                className="offcanvas-title"
                                id="offcanvasNavbarLabel"
                                style={{ fontWeight: 600 }}
                            >
                                Menu
                            </h4>
                            {/*<button class="navbar-toggler btn-close" id="offcanvas-close"></button>*/}
                            <button
                                className="navbar-toggler btn-close"
                                data-bs-toggle="collapse"
                                data-bs-target="#offcanvasNavbar"
                            />
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1">
                                <li className="nav-item">
                                    <Link className="nav-link" href="ridewithus.html">
                                        Ride with us
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        Add Restaurant
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        Bites for business{" "}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        {" "}
                                        Supported by Bites
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default RideWithUsNavbar