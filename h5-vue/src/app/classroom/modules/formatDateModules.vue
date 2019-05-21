<template>
  <div>
    <slot>
      {{time}}
    </slot>
  </div>
</template>

<script>
  import formatDate from 'utils/formatDate';

  /**
   * @property {string}     date            日期时间戳或者日期对象
   * @property {boolean}    format          格式
   */
  export default {
    props: {
      date: {
        type: [Number, Object, String],
        request: true
      },
      format: {
        type: String,
        default: 'yyyy-MM-dd'
      },
    },
    data: () => {
      return {

      }
    },
    computed: {
      time(){
        return formatDate(this.date, this.format)
      }
    },
    methods: {

    }
  }
</script>
