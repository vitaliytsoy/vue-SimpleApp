<template>
    <section class="operations">
        <div class="container container-operations">
            <h2 class="">Операции на поле 112</h2>
            <div class="operations__toggle">
                <div class="operations__toggle__item"
                     v-bind:class="{isActive: isPlannedShown}"
                     v-on:click="toggleOperationsType('planned')"
                >
                    Запланированные операции
                </div>
                <div class="operations__toggle__item"
                     v-bind:class="{isActive: !isPlannedShown}"
                     v-on:click="toggleOperationsType('done')"
                >
                    Выполненные операции
                </div>
            </div>
            <v-operations-table v-if="isPlannedShown"
                                :operations="plannedOperations"
                                :setSortType="setOperationsSortedBy">
            </v-operations-table>
            <v-operations-table v-else
                                :operations="doneOperations"
                                :setSortType="setOperationsSortedBy">
            </v-operations-table>
        </div>
    </section>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  import OperationsTable from './OperationsTable.vue';

  export default {
    name: 'Operations',
    components: {
      'v-operations-table': OperationsTable,
    },
    created() {
      this.getOperations();
    },
    data() {
      return {
        isPlannedShown: true,
      };
    },
    computed: {
      doneOperations() {
        return this.$store.state.operations.done;
      },
      plannedOperations() {
        return this.$store.state.operations.planned;
      },
      sortOperationsBy() {
        return this.$store.state.operations.sortBy;
      },
    },
    methods: {
      ...mapMutations([
        'setOperationsSortedBy',
      ]),
      ...mapActions([
        'getOperations',
      ]),
      toggleOperationsType(toggleTo) {
        toggleTo === 'planned' && !this.isPlannedShown ? this.isPlannedShown = !this.isPlannedShown : '';
        toggleTo === 'done' && this.isPlannedShown ? this.isPlannedShown = !this.isPlannedShown : '';
      },
    },
  };
</script>

<style lang="scss" scoped>
    .container-operations {
        background: #FFFFFF;
        box-shadow: 0 0 20px 0 rgba(0,0,0,0.20);
    }
    .operations {
        &__toggle {
            display: flex;
            flex-flow: row wrap;
            text-transform: uppercase;
            font-size: 12px;
            margin-top: 40px;
            &__item {
                cursor: pointer;
                &.isActive {
                    color: #3399FF;
                }
                &:not(:first-child) {
                    padding-left: 30px;
                }
            }
        }
    }
</style>
