import React, { useState, useEffect } from 'react'
import './payroll-form.css'
import profile1 from '../assets/images.png'
import profile2 from '../assets/profileImage3.png'
import profile3 from '../assets/profile3.png'
import profile4 from '../assets/profile4.png'
import EmployeeService from '../Service/EmployeeService'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const PayrollForm = (props) => {
  let value = {
    name: ' ',
    profileArray: [
      { url: '../assets/images.png' },
      { url: '../assets/profileImage3.png' },
      { url: '../assets/profile3.png' },
      { url: '../assets/profile4.png' }

    ],
    allDepartments: ['HR', 'Sales', 'Engineers', 'Finanace', 'Others'],
    departmentValue: [],
    salary: '',
    gender: '',
    note: '',
    day: '',
    month: '',
    year: '',
    startDate: '',
    profilePic: '',
    isUpdated: false,

  }
  const [formValue, setForm] = useState(value)
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getEmployeeDataById(params.id);
    }
  }, [params.id]);

  const getEmployeeDataById = (id) => {
    EmployeeService.getDataById(id)
      .then((response) => {
        let object = response.data.data;
        console.log(object);
        setData(object);
      })
      .catch((err) => {
        alert("error is", err);
      });
  };

  const setData = (obj) => {
    let array = obj.startDate;
    console.log(array);
    console.log(obj);
    console.log();
    setForm({
      ...formValue,
      ...obj,
      employeeId: obj.employeeId,
      name: obj.name,
      gender: obj.gender,
      salary: obj.salary,
      note: obj.note,
      isUpdated: true,
      day: array[0] + array[1],
      month: array[3] + array[4] + array[5],
      year: array[7] + array[8] + array[9] + array[10],
      departmentValue: obj.departments

    });
  };

  const changeValue = (event) => {
    console.log('====================================');
    console.log(event.target.name);
    console.log('====================================');
    setForm({ ...formValue, [event.target.name]: event.target.value })
  }

  const save = async (event) => {
    event.preventDefault();

    let obj = {
      name: formValue.name,
      gender: formValue.gender,
      salary: formValue.salary,
      startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
      note: formValue.note,
      profilePic: formValue.profilePic,
      departments: formValue.departmentValue
    };
    console.log(obj);

    if (formValue.isUpdated) {
      var answer = window.confirm("Do you want to update the employee data");
      if (answer === true) {
        EmployeeService.updateEmployeeData(params.id, obj)
          .then((response) => {
            alert("data updated successfully");
          })
          .catch((error) => {
            toast.error("something went wrong", error);
          });
      } else {
        window.location.reload();
      }


    } else {
      EmployeeService.addEmployeeData(obj)
        .then((respose) => {
          console.log(respose);
          const employeeData = respose.data.data;
          console.log(employeeData);
          alert("Data Added Successfully");
        })

    }
  }
  const onCheckChange = (name) => {
    let index = formValue.departmentValue.indexOf(name);
    let checkArray = [...formValue.departmentValue]
    if (index > -1)
      checkArray.splice(index, 1)
    else
      checkArray.push(name);
    setForm({ ...formValue, departmentValue: checkArray });
  }
  const getChecked = (name) => {
    return formValue.departmentValue && formValue.departmentValue.includes(name);
  }
  return (
    <div class="form-content">
      <form class="form" action="#" onSubmit={save} >

        <div class="form-head">Employee Payroll Form</div>
        <div class="row-content">
          <label for="name" class="label text">Name</label>
          <input type="text" name="name" id="name" class="input required" placeholder="Your Name ..." value={formValue.name} onChange={changeValue} /><br />
        </div>
        <div class="text-error"> </div>

        <div class="row-content">
          <label class="label text" for="profile2">Profile image</label>
          <div class="profile-radio-content">
            <label>
              <input type="radio" id="profile2" name="profilePic" checked={formValue.profilePic === '../assets/images.png'}
                value="../assets/images.png" onChange={changeValue} />
              <img class="profile" id="image1" src={profile1} alt="" />
            </label>
            <label>
              <input type="radio" id="profile2" name="profilePic" checked={formValue.profilePic === '../assets/profileImage3.png'}
                value="../assets/profileImage3.png" onChange={changeValue} />
              <img class="profile" id="image1" src={profile2} alt="" />
            </label>
            <label>
              <input type="radio" id="profile2" name="profilePic" onChange={changeValue} checked={formValue.profilePic === '../assets/profile3.png'}
                value="../assets/profile3.png" />
              <img class="profile" id="image1" src={profile3} alt="" />
            </label>
            <label>
              <input type="radio" id="profile2" name="profilePic" onChange={changeValue} checked={formValue.profilePic === "../assets/profile4.png"}
                value="../assets/profile4.png" />
              <img class="profile" id="image1" src={profile4} alt="" />
            </label>
          </div>
        </div>

        <div class="row-content">
          <label class="label text" for="gender">Gender</label>
          <div>
            <input type="radio" id="male" name="gender" value="Male" onChange={changeValue} />
            <label class="text" for="male">Male</label>
            <input type="radio" id="female" name="gender" value="Female" onChange={changeValue} />
            <label class="text" for="female">Female</label>
          </div>
        </div>


        <div class="row-content">
          <label class="label text" for="department">Department</label>
          {/* <div>
            <input class="checkbox" type="checkbox" id="v" name="departments" value="HR" checked={formValue.departmentValue === 'HR'} onChange={changeValue} />
            <label class="text" for="hr">HR</label>
            <input class="checkbox" type="checkbox" id="Sales" name="departments" value="Sales" checked={formValue.departmentValue === 'Sales'} onChange={changeValue} />
            <label class="text" for="sales">Sales</label>
            <input class="checkbox" type="checkbox" id="Finance" name="departments" value="Finance" onChange={changeValue} checked={formValue.departmentValue === 'Finance'} />
            <label class="text" for="finance">Finance</label>
            <input class="checkbox" type="checkbox" id="Engineer" name="departments" value="Engineer" onChange={changeValue} checked={formValue.departmentValue === 'Engineer'} />
            <label class="text" for="engineer">Engineer</label>
            <input class="checkbox" type="checkbox" id="Others" name="departments" value="Others" onChange={changeValue} checked={formValue.departmentValue === 'Others'} />
            <label class="text" for="others">Others</label>
          </div> */}
          <div>
            {formValue.allDepartments.map(item => (
              <span key={item}>
                <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                  checked={getChecked(item)} value={item} />
                <label className="text" htmlFor={item}>{item}</label>
              </span>
            ))}
          </div>
        </div>

        {/* <div class="row-content">
          <label class="label text" for="salary">Choose Your Salary: </label>
          <input class="input required" type="range" name="salary" id="salary" value={formValue.salary} onChange={changeValue} />
        </div> */}

        <div class="row-content">
          <label for="name" class="label text">Salary</label>
          <input type="text" name="salary" id="name" class="input required" placeholder="Enter salary.." value={formValue.salary} onChange={changeValue} /><br />
        </div>
        <div class="text-error"> </div>

        <div class="row-content">
          <label class="label text" for="startDate">Start Date</label>
          <div>
            <select id="day" name="day" onChange={changeValue} value={formValue.day}>
              <option value="">Day</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <select id="month" name="month" onChange={changeValue} value={formValue.month}>
              <option value="">Month</option>
              <option value="Jan">Jan</option>
              <option value="Feb">February</option>
              <option value="Mar">March</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sep">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </select>
            <select id="year" name="year" onChange={changeValue} value={formValue.year}>
              <option value="">Year</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
            </select>
          </div>
        </div>

        <div class="row-content">
          <label class="label text" for="notes">Notes</label>
          <textarea id="notes" class="input required" name="note" placeholder="" style={{ height: '100px' }} onChange={changeValue} value={formValue.note}></textarea>
        </div>

        <div class="buttonParent">
          <Link to="/home">
          <a  class="resetButton button cancelButton">Cancel</a> </Link>
          <div class="submit-reset">
            
              <button type="submit" class="button submitButton" id="submitButton" >
                {formValue.isUpdated ? "Update" : "Submit"} </button>
            <button type="reset" class="resetButton button">Reset</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default PayrollForm
