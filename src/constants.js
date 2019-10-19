import PatientsList from './components/PatientsList/PatientsList';
import { PatientInfo } from './components/PatientInfo/PatientInfo';
import { Patient } from './components/Patient/Patient';
import { StatusDraft } from './components/StatusDraft/StatusDraft';
// import { States } from './components/States/States';
import { Associations } from './components/Associations/Associations';
import { CurrentState } from './components/CurrentState/CurrentState';
import { States } from './components/States/States';

export const headerRoutes = [
    {
        name: 'Пациенты',
        path: '/patients',
        component: PatientsList
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
        component: PatientInfo
    },
    {
        name: 'Информация',
        path: 'info',
        component: PatientInfo
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
