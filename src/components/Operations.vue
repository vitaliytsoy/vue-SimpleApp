<template>
    <section class="operations">
        <div class="container container-operations">
            <h2 class="">Операции на поле 112</h2>
            <div class="operations__toggle">
                <div class="operations__toggle__item">Запланированные операции</div>
                <div class="operations__toggle__item">Выполненные операции</div>
            </div>
            <v-operations-table v-bind:operations="doneOperations"></v-operations-table>
        </div>
    </section>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  import OperationsTable from './OperationsTable';

  export default {
    name: 'Operations',
    components: {
      'v-operations-table': OperationsTable,
    },
    created() {
      this.getOperations();
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
                &:not(:first-child) {
                    padding-left: 30px;
                }
            }
        }
        &__table {
            width: 96%;
            margin: 30px 0 20px 0;
            tr {
                color: #333333;
                letter-spacing: -0.52px;
                height: 40px;
                font-size: 14px;
                &:not(:first-child) {
                    td {
                        border-bottom: 1px solid #EDEEEE;
                    }
                }
                &:first-child {
                    background: #EDEEEE;
                    font-size: 13px;
                    th {
                        text-align: left;
                        padding: 15px 15px;
                        cursor: pointer;
                        &:nth-child(1) {
                            width: 12%;
                            &:after {
                                content: '';
                                display: inline-block;
                                width: 0;
                                height: 0;
                                margin: 0 0 2px 5px;
                                border-left: 5px solid transparent;
                                border-right: 5px solid transparent;
                                border-top: 5px solid #3399FF;
                            }
                        }
                        &:nth-child(2) {
                            width: 38%;
                            &:after {
                                content: '';
                                display: inline-block;
                                width: 0;
                                height: 0;
                                margin: 0 0 2px 5px;
                                border-left: 5px solid transparent;
                                border-right: 5px solid transparent;
                                border-top: 5px solid #A7A9AC;
                            }
                        }
                        &:nth-child(3) {
                            width: 20%;
                            &:after {
                                content: '';
                                display: inline-block;
                                width: 0;
                                height: 0;
                                margin: 0 0 2px 5px;
                                border-left: 5px solid transparent;
                                border-right: 5px solid transparent;
                                border-top: 5px solid #A7A9AC;
                            }
                        }
                        &:nth-child(4) {
                            width: 20%;
                            &:after {
                                content: '';
                                display: inline-block;
                                width: 0;
                                height: 0;
                                margin: 0 0 2px 5px;
                                border-left: 5px solid transparent;
                                border-right: 5px solid transparent;
                                border-top: 5px solid #A7A9AC;
                            }
                        }
                    }
                }
                td {
                    position: relative;
                    padding: 20px 15px;
                    &:nth-child(1) {
                        font-size: 12px;
                        opacity: 0.8;
                    }
                    &:nth-child(3) {
                        padding-left: 60px;
                        &:before {
                            content: '';
                            display: inline-block;
                            width: 40px;
                            height: 40px;
                            position: absolute;
                            top: 50%;
                            left: 15px;
                            transform: translateY(-50%);
                            background: url("../assets/crop-wheat.png") 0 0 / 100% auto no-repeat;
                        }
                    }
                    &:nth-child(4) {
                        &:before {
                            content: '';
                            display: inline-block;
                            width: 25px;
                            height: 15px;
                            position: relative;
                            top: 3px;
                            margin-right: 10px;
                            border-radius: 10px;
                            background: #66CC66;
                        }
                        .green {

                        }
                        .red {

                        }
                    }
                    &.assessment {
                        &-green {
                            &:before {
                                background: #66CC66;
                            }
                        }
                        &-red {
                            &:before {
                                background: #FF7360;
                            }
                        }
                        &-yellow {
                            &:before {
                                background: #FFE06D;
                            }
                        }
                        &-gray {
                            &:before {
                                background: #EDEEEE;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
