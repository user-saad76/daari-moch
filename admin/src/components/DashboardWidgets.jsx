import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Required for calendar styling

const Message = ({ name, time, message }) => (
  <div className="d-flex align-items-center border-bottom py-3">
    <img
      className="rounded-circle flex-shrink-0"
      src="assets/img/user.jpg"
      alt=""
      style={{ width: '40px', height: '40px' }}
    />
    <div className="w-100 ms-3">
      <div className="d-flex w-100 justify-content-between">
        <h6 className="mb-0">{name}</h6>
        <small>{time}</small>
      </div>
      <span>{message}</span>
    </div>
  </div>
);

const ToDoItem = ({ text, checked }) => (
  <div className={`d-flex align-items-center ${checked ? 'pt-2' : 'border-bottom py-2'}`}>
    <input className="form-check-input m-0" type="checkbox" defaultChecked={checked} />
    <div className="w-100 ms-3">
      <div className="d-flex w-100 align-items-center justify-content-between">
        <span>{checked ? <del>{text}</del> : text}</span>
        <button className={`btn btn-sm ${checked ? 'text-primary' : ''}`}>
          <i className="fa fa-times"></i>
        </button>
      </div>
    </div>
  </div>
);

const DashboardWidgets = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        {/* Messages */}
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-0">Messages</h6>
              <a href="#">Show All</a>
            </div>
            <Message name="Jhon Doe" time="15 minutes ago" message="Short message goes here..." />
            <Message name="Jhon Doe" time="15 minutes ago" message="Short message goes here..." />
            <Message name="Jhon Doe" time="15 minutes ago" message="Short message goes here..." />
            <Message name="Jhon Doe" time="15 minutes ago" message="Short message goes here..." />
          </div>
        </div>

        {/* Calendar */}
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Calendar</h6>
              <a href="#">Show All</a>
            </div>
            <div className="bg-dark p-2 rounded">
              <Calendar onChange={setDate} value={date} />
            </div>
          </div>
        </div>

        {/* To Do List */}
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">To Do List</h6>
              <a href="#">Show All</a>
            </div>

            <div className="d-flex mb-2">
              <input
                className="form-control bg-dark border-0"
                type="text"
                placeholder="Enter task"
              />
              <button type="button" className="btn btn-primary ms-2">Add</button>
            </div>

            <ToDoItem text="Short task goes here..." checked={false} />
            <ToDoItem text="Short task goes here..." checked={false} />
            <ToDoItem text="Short task goes here..." checked={true} />
            <ToDoItem text="Short task goes here..." checked={false} />
            <ToDoItem text="Short task goes here..." checked={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
