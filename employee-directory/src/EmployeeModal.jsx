// EmployeeModal.js
import React, { useEffect, useRef } from 'react';

export default function EmployeeModal({ employee, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!employee) return null;

  return (
    <div 
      className="overlay-bg" 
      id="overlay" 
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="modal" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modalName"
      >
        <div className="modal-header">
          <div className={`modal-avatar ${employee.avc}`}>{employee.av}</div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <i className="ti ti-x"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-name" id="modalName">{employee.name}</div>
          <div className="modal-role" id="modalRole">{employee.role}</div>
          <div className="modal-badges">
            <span className="badge badge-dept">{employee.dept}</span>
            <span className="badge badge-status">Active</span>
          </div>
          <div className="divider"></div>
          <div className="info-row">
            <i className="ti ti-mail" aria-hidden="true"></i>
            <span className="info-lbl">Email</span>
            <span className="info-val">{employee.email}</span>
          </div>
          <div className="info-row">
            <i className="ti ti-phone" aria-hidden="true"></i>
            <span className="info-lbl">Phone</span>
            <span className="info-val">{employee.phone}</span>
          </div>
          <div className="info-row">
            <i className="ti ti-map-pin" aria-hidden="true"></i>
            <span className="info-lbl">Location</span>
            <span className="info-val">{employee.location}</span>
          </div>
          <div className="info-row">
            <i className="ti ti-calendar" aria-hidden="true"></i>
            <span className="info-lbl">Start date</span>
            <span className="info-val">{employee.start}</span>
          </div>
          <div className="info-row">
            <i className="ti ti-user-check" aria-hidden="true"></i>
            <span className="info-lbl">Reports to</span>
            <span className="info-val">{employee.manager}</span>
          </div>
          <div className="divider"></div>
          <div className="bio-section">
            <div className="bio-lbl">Bio</div>
            <div className="bio-text">{employee.bio}</div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-action">
            <i className="ti ti-mail" aria-hidden="true"></i> Send email
          </button>
          <button className="btn-action">
            <i className="ti ti-user" aria-hidden="true"></i> View profile
          </button>
        </div>
      </div>
    </div>
  );
}