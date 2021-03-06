<template>

    <table class="operations__table" cellspacing="0">
        <tr v-bind:class="[operationsSortedBy.type, operationsSortedBy.isIncremental ? 'up' : 'down']">
            <th v-on:click="setSortType('date')">Дата</th>
            <th v-on:click="setSortType('type')">Операция</th>
            <th v-on:click="setSortType('area')">Площадь</th>
            <th v-on:click="setSortType('assessment')">Качество</th>
        </tr>
        <tr v-for="operation in operationsToShow" v-bind:key="operation.id">
            <td>{{ getFormattedDate(operation.date) }}</td>
            <td>{{ operation.type }}</td>
            <td>{{ operation.area }}</td>
            <td class="assessment-red"
                v-if="operation.assessment.toLowerCase() === 'плохо'">
                {{ operation.assessment }}
            </td>
            <td class="assessment-yellow"
                v-else-if="operation.assessment.toLowerCase() === 'удволетворительно'">
                {{ operation.assessment }}
            </td>
            <td class="assessment-green"
                v-else-if="operation.assessment.toLowerCase() === 'отлично'">
                {{ operation.assessment }}
            </td>
            <td class="assessment-gray"
                v-else-if="operation.assessment.toLowerCase() === 'нет оценки'">
                {{ operation.assessment }}
            </td>
        </tr>
    </table>
</template>

<script>
  import _ from 'lodash';

  export default {
    props: {
      operations: Array,
      setSortType: Function,
    },
    name: 'OperationsTable',
    data() {
      return {
        types: {
          0: 'Боронование зяби и паров',
          1: 'Вспашка с оборотом пласта',
          2: 'Протравливание семян',
          3: 'Авиаобработка',
          4: 'Остальное',
          5: 'Сбор урожая',
        },
        assessments: {
          0: 'Плохо',
          1: 'Удволетворительно',
          2: 'Отлично',
          3: 'Нет оценки',
        },
      };
    },
    computed: {
      operationsToShow() {
        let deepClonedOperations = _.cloneDeep(this.operations);
        this.mapToValues(deepClonedOperations);
        deepClonedOperations.sort((a, b) => {
          const sortType = this.$store.state.operations.sortBy.type.toLowerCase();
          const isIncremental = this.$store.state.operations.sortBy.isIncremental;
          function moreOrLess(sortBy, isFromSmallToBig) { // eslint-disable-line consistent-return
            if (isFromSmallToBig) return a[sortBy] < b[sortBy];
            if (!isFromSmallToBig) return a[sortBy] > b[sortBy];
          }
          switch (sortType.toLowerCase()) {
            case 'date':
              return moreOrLess('date', isIncremental);
            case 'type':
              return moreOrLess('type', isIncremental);
            case 'area':
              return moreOrLess('area', isIncremental);
            case 'assessment':
              return moreOrLess('assessment', isIncremental);
            default:
              return moreOrLess('date', isIncremental);
          }
        });
        return deepClonedOperations;
      },
      operationsSortedBy() {
        return this.$store.state.operations.sortBy;
      },
    },
    methods: {
      mapToValues(operations) {
        /* eslint-disable no-param-reassign */
        return operations.map((item) => {
          item.date = new Date(item.date.year, item.date.month, item.date.day);
          item.type = this.$data.types[item.type];
          item.assessment = this.$data.assessments[item.assessment];
          // Check if value exist
          if (item.type == null) item.type = 'Неизвестная операция';
          if (item.assessment == null) item.assessment = this.$data.assessments[3];
          return item;
        });
      },
      getFormattedDate(date) {
        return date.toLocaleString('ru-RU', {
          year: 'numeric',
          day: '2-digit',
          month: 'short',
        }).toUpperCase().replace(new RegExp('\\.|Г.', 'g'), '');
      },
    },
  };
</script>

<style lang="scss" scoped>
    .operations {
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
                    &.date {
                        &.up {
                            th:nth-child(1):after{
                                transform: rotate(180deg);
                            }
                        }
                        th:nth-child(1):after{
                            border-top: 5px solid #3399FF;
                        }
                    }
                    &.type {
                        &.up {
                            th:nth-child(2):after{
                                transform: rotate(180deg);
                            }
                        }
                        th:nth-child(2):after{
                            border-top: 5px solid #3399FF;
                        }
                    }
                    &.area {
                        &.up {
                            th:nth-child(3):after{
                                transform: rotate(180deg);
                            }
                        }
                        th:nth-child(3):after{
                            border-top: 5px solid #3399FF;
                        }
                    }
                    &.assessment {
                        &.up {
                            th:nth-child(4):after{
                                transform: rotate(180deg);
                            }
                        }
                        th:nth-child(4):after{
                            border-top: 5px solid #3399FF;
                        }
                    }
                    th {
                        text-align: left;
                        padding: 15px 15px;
                        cursor: pointer;
                        &:after {
                            transition: transform 0.35s ease;
                            transform-origin: 50% 50%;
                        }
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
                                border-top: 5px solid #A7A9AC;
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
                        padding: 20px 15px 20px 30px;
                        &:before {
                            content: '';
                            display: inline-block;
                            width: 25px;
                            height: 15px;
                            position: absolute;
                            top: 50%;
                            left: 0;
                            transform: translateY(-50%);
                            margin-right: 10px;
                            border-radius: 10px;
                            background: #66CC66;
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
