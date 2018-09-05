import Vue from 'vue';
import Vuex from 'vuex';
import FieldService from './http/FieldService';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
    state: {
        operations: {
            done: [] as object[],
            planned: [] as object[],
            sortBy: {
                type: 'date',
                isIncremental: false,

            },
        },
    },
    mutations: {
        setPlannedOperations: (state, operationsList) => {
            state.operations = {
                ...state.operations,
                planned: operationsList,
            };
        },
        setDoneOperations: (state, operationsList) => {
            state.operations = {
                ...state.operations,
                done: operationsList,
            };
        },
        setOperationsSortedBy(state, sortType) {
            if(state.operations.sortBy.type.toLowerCase() === sortType.toLowerCase()) {
                state.operations.sortBy = { type: state.operations.sortBy.type, isIncremental: !state.operations.sortBy.isIncremental }
            } else {
                state.operations.sortBy = { type: sortType, isIncremental: false }
            }
        },
    },
    actions: {
        async getOperations(store) {
            const fieldService = new FieldService();
            const plannedOperations = await fieldService.getOperations();
            const doneOperations = await fieldService.getOperations_2();

            store.commit('setPlannedOperations', plannedOperations);
            store.commit('setDoneOperations', doneOperations);
        },
    },
    getters: {
        plannedOperations: state => {
            return state.operations.planned;
        },
        doneOperations: state => {
            return state.operations.done;
        }
    },
});
