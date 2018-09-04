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
                isIncremental: true,

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
            state.operations.sortBy = { type: sortType.type, isIncremental: sortType.isIncremental };
        },
    },
    actions: {
        async getOperations(store) {
            const fieldService = new FieldService();
            const plannedOperations = await fieldService.getOperations();
            const doneOperations = await fieldService.getOperations();

            store.commit('setPlannedOperations', plannedOperations);
            store.commit('setDoneOperations', doneOperations);
        },
    },
});
