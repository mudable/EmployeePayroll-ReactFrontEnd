import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './Home.css'
import EmployeeService from '../Service/EmployeeService'
import { Link, useNavigate } from 'react-router-dom'
import profile1 from '../assets/images.png'
import profile2 from '../assets/profileImage3.png'
import profile3 from '../assets/profile3.png'
import profile4 from '../assets/profile4.png'


const Home = (props) => {
    let navigate = useNavigate();
    let value = {
        employeeArray: [],
        AllEmployeeArray: []
    };

    const updateEmployee = (employeeId) => {

        navigate(`/Payroll-form/${employeeId}`);
        // props.history.push(`Payroll-form/${employeeId}`);
    }
    const [formValue, setForm] = useState(value)


    useEffect(() => {
        getAllEmployeeData();
    }, [])



    const getAllEmployeeData = () => {
        EmployeeService.getEmployeeData()
            .then((response) => {
                setForm({
                    employeeArray: response.data,
                    AllEmployeeArray: response.data,
                });
                console.log(response.data);
            });
    }


    const removeEmployee = (employeeId) => {
        let ans = window.confirm(
            "Do you want to delete the Employee");
        if (ans === true) {
            EmployeeService.deleteEmployeeData(employeeId)
                .then((response) => {
                    alert("Employee Deleted Successfully");
                    window.location.reload();
                    getAllEmployeeData();
                })
                .catch((error) => {
                    toast.error("something went wrong");
                });
        }
        else {
            alert("Employee not deleted");
        }
    }



    return (
        <div>
            <body>
                <header class="header-content header">
                    <div class="logo-content">
                        <img src="" alt="logo" />
                        <div>
                            <span class="emp-text">EMPLOYEE</span>
                            <span class="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div class="main-content">
                    <div class="header-content employee-header">
                        <div class="emp-detail-text">
                            Employee Details
                        </div>
                        <Link to="/form">
                            <a class="add-button" onclick="">
                                <img src="" alt="" />
                                Add User
                            </a></Link>
                    </div>
                </div>
                <div class="table-main">
                    <table id="display" class="table">
                        <thead>
                            <tr >
                                <th>ProfilePic</th>
                                <th> Name </th>
                                <th>Gender </th>
                                <th>Department </th>
                                <th> Salary </th>
                                <th> StartDate </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                formValue.employeeArray &&
                                formValue.employeeArray.map((element, index) => (
                                    <tr>
                                        <td>
                                            <img
                                                className="profile"
                                                src={
                                                    element.profilePic ===
                                                        "../assets/images.png"
                                                        ? profile1
                                                        : element.profilePic ===
                                                            "../assets/profileImage3.png"
                                                            ? profile2
                                                            : element.profilePic ===
                                                                "../assets/profile3.png"
                                                                ? profile3
                                                                : profile4
                                                }
                                                alt=""
                                            />
                                           
                                        </td>
                                        <td>{element.name}</td>
                                        <td>{element.gender}</td>
                                        <td>{element.departments}</td>
                                        <td>{element.salary}</td>
                                        <td>{element.startDate}</td>
                                        <td>
                                            <button onClick={() => removeEmployee(element.employeeId)} alt="delete" scr="deleteIcon">Delete</button>
                                        </td>
                                        <td>
                                            <button onClick={() => updateEmployee(element.employeeId)} alt="Edit" scr="editIcon">Edit</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </body>
        </div>
    )
}

export default Home