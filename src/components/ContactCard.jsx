import React from 'react'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {useNavigate} from 'react-router-dom'


function ContactCard(props) {

  const { dispatch } = useGlobalReducer()
  const navigate = useNavigate()

  return (
<div className="card contact-card text-white bg-dark border-secondary " onClick={() => {navigate(`/${props.type}/${props.uId}`) } }>
  <div className="card-body p-2 d-flex flex-column justify-content-between">
    <h5 className="card-title text-center mb-2">{props.peopleName}</h5>
    <ul className="list-group list-group-flush">
      <li type="button" className="list-group-item bg-danger text-white text-center p-1">+ Add to favorite</li>
    </ul>
  </div>
</div>
  )
}

export default ContactCard