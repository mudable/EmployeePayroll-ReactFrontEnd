import axios from 'axios';
import React, { Component } from 'react'

export class EmployeeService  {
 baseUrl="http://localhost:8082/employeePayrollservice";

 addEmployeeData(data){
    return axios.post(`${this.baseUrl}/create`,data);
 }
 getEmployeeData(){
 return axios.get(`${this.baseUrl}/getallcontact`);
 }
 deleteEmployeeData(employeeId){
   return axios.delete(`${this.baseUrl}/delete/${employeeId}`);
 }

 updateEmployeeData(employeeId,data){
  return axios.put(`${this.baseUrl}/update/${employeeId}`,data);
 }
 getDataById(employeeId){
  return axios.get(`${this.baseUrl}/get/${employeeId}`)
 }
}

export default new EmployeeService();