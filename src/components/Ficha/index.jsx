import React from 'react'
import styles from './Ficha.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ({ id, name, email, avatar, deleteUser }) {
    return (
        <div className={"card mb-3 shadow " + styles.ficha}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={avatar} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{email}</p>
                        <p className="card-text d-flex justify-content-between">
                            <small className="text-muted">Id: {id}</small>
                            <div className="button-group">
                            <button className="btn btn-info btn-sm mx-1"><FaEdit /></button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteUser(id) }><FaTrash /></button>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
