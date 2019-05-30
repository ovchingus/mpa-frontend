import * as actionCreaters from '../reducers/graph';
import * as service from '../../Services/draftService';

export const get = (diseaseId) => {
    return async (dispatch) => {
        const graph = await service.getGraph(diseaseId);

        dispatch(actionCreaters.put(graph));

        return graph;
    };
};

export const clear = () => {
    return dispatch => dispatch(actionCreaters.clear());
};
