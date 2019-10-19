import React from 'react';
import { connect } from 'react-redux';
import NewPatientForm from '../NewPatientFormModal/NewPatientFormModal';
import * as patientsThunks from '../../redux/thunks/patients';
import { NavLink } from 'react-router-dom';

export class PatientsList extends React.Component {
    componentDidMount () {
        this.props.getPatients();
    }

    render () {
        const { patients } = this.props;

        return (
            <section className={'PatientsList'}>
                <h2>Patients</h2>
                <ul className={'PatientsList-List'}>
                    {patients.map(patient => {
                        return (
                            <NavLink to={`/patient/${patient.id}/states`} key={patient.id}>
                                <li
                                    className={'PatientsList-Item'}
                                    style={{ cursor: 'pointer' }}>
                                    {patient.name} ({patient.birthDate})
                                </li>
                            </NavLink>
                        );
                    })}
                </ul>
            </section>
        );
    }
}

export default connect(
    store => ({
        patients: store.patients || []
    }),
    {
        getPatients: patientsThunks.get
    }
)(PatientsList);
