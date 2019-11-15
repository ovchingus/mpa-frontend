import { PatientsList } from './components/PatientsList/PatientsList';
import { Patient } from './components/Patient/Patient';
import { Associations } from './components/Associations/Associations';
import { CurrentState } from './components/CurrentState/CurrentState';
import { States } from './components/States/States';
import { NewPatientForm } from './components/NewPatientForm/NewPatientForm';
import { PatientHistory } from './components/PatientHistory/PatientHistory';

export const headerRoutes = [
    {
        name: 'Пациенты',
        path: '/patients',
        component: PatientsList,
        exact: true
    },
    {
        name: 'Создать пациента',
        path: '/patients/new',
        component: NewPatientForm,
        exact: true
    },
    {
        path: '/patient/:patientId',
        component: Patient
    }
];

export const sidebarRoutes = [
    {
        name: 'Черновик состояния',
        path: 'draft',
        component: States
    },
    {
        name: 'Текущее состояние',
        path: 'current',
        component: CurrentState
    },
    {
        name: 'История',
        path: 'history',
        component: PatientHistory
    },
    {
        name: 'Ассоциации',
        path: 'associations',
        component: Associations
    }
];

export const routes = sidebarRoutes.map(route => ({
    ...route,
    path: `/patient/:patientId/${route.path}`
}));
