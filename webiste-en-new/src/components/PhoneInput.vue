<template>
  <Input
    ref="phone"
    class="phone-select"
    v-model="phoneValue"
    :name="name"
    :readonly="readonly"
    :disabled="disabled"
    :value="phoneValue"
    :placeholder="placeholder"
    :maxlength="11"
    :class="{'disabled': disabled === '' || disabled}"
    :clearable="!disabled && !readonly"
    @on-change="inputHandler"
    @on-blur="blurHandler"
  >
    <Select
      name="nationalCode"
      v-model="countryId"
      :readonly="readonly"
      :disabled="disabled"
      :value="countryId"
      slot="prepend"
      style="width: 60px;text-align: center"
      @input="selectHandler"
    >
      <Option
        v-for="item in nationalCode"
        :key="item['id']"
        :value="item['nationalCode']"
        :label="'+' + item['nationalCode']"
      >
        <span>+{{item.nationalCode}}</span>
        <span style="float:right; color:#ccc; font-size: 12px">{{item.regionEn}}</span>
      </Option>
    </Select>
  </Input>
</template>

<script>

  import apiNationalCodes from '@/api/apiNationalCodes';
  export default {
    props: {
      name: {
        type: String,
        default: 'mobile'
      },
      value: {
        type: null,
        default: ''
      },
      readonly: {
        type: [Boolean, String],
        default: false
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      placeholder: {
        type: String
      }
    },
    data() {
      return {
        countryId: '86',
        phoneValue: this.value,
        oldValue: '',
        options: [],
        nationalCode:[
          {"id":1,"nationalCode":"853","regionEn":"Macau"},
          {"id":2,"nationalCode":"1","regionEn":"Canada"},
          {"id":3,"nationalCode":"1","regionEn":"America"},
          {"id":4,"nationalCode":"886","regionEn":"Taiwan"},
          {"id":5,"nationalCode":"852","regionEn":"Hong Kong"},
          {"id":6,"nationalCode":"65","regionEn":"Singapore "},
          {"id":7,"nationalCode":"44","regionEn":"England"},
          {"id":8,"nationalCode":"86","regionEn":"China"}
        ]
      }
    },

    methods: {
      inputHandler(e) {
        let target = e.target;
        let value = target.value;

        if (!value.length) {
          this.oldValue = '';
          this.postValue();
        }

        if (/^\d*$/.test(value)) {

          if (value.length > 11) {
            setTimeout(() => {
              this.phoneValue = this.oldValue;
              target.value = this.oldValue;
            }, 0);

            return
          }

          this.oldValue = value;
          this.postValue();
        } else {
          setTimeout(() => {
            this.phoneValue = this.oldValue;
            target.value = this.oldValue;
          }, 0)
        }
      },
      selectHandler() {
        this.postValue();
      },
      postValue() {
        let {
          phoneValue,
          countryId
        } = this;

        let ret = '';
        if (phoneValue.length && countryId.length) {
          ret = `${countryId},${phoneValue}`;
        }

        this.$emit('input', ret);
      },
      getValue() {
        let value = this.value.split(',');
        if (value.length === 2) {
          this.countryId = value[0];
          this.phoneValue = value[1];

          if (!/^\d*$/.test(value[1])) {
            this.phoneValue = '';
            this.postValue();
          }
        }
      },
      blurHandler(e) {
        this.$emit('onBlur', e)
      }
    },
    created() {
      apiNationalCodes().then(res=>{
        if(res.retCode===0){
           let data=res.data;
           let codeInfo=[];
           data.map(item=>{
               let nationalCodeList=item.nationalCodeList;
             nationalCodeList.map(item1=>{
               codeInfo.push(item1);
             })
           });
          this.nationalCode=codeInfo;
        }
      });
      this.getValue();
    }
  }
</script>

<style lang="scss" scoped>

  /deep/ .ivu-icon-ios-close-circle{
    top:5px!important;
  }
  /deep/ .ivu-select-selection .ivu-select-selected-value{
    line-height: 42px!important;
  }
  .phone-select {
    text-align: left;

    /deep/ .ivu-input-group-prepend {
      text-align: left;
    }

    /deep/ .ivu-select-item {
      padding-left: 10px;
      padding-right: 10px;
    }

    /deep/ .ivu-select-dropdown {

    }
  }
</style>
