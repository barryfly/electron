<template>
  <div :class="prefixCls" class="relative">
    <InputPassword
      v-if="showInput"
      v-bind="$attrs"
      allowClear
      :value="innerValueRef"
      @change="handleChange"
      :disabled="disabled"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </InputPassword>
    <div :class="`${prefixCls}-bar`">
      <div :class="`${prefixCls}-bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch, unref, watchEffect } from 'vue';
import { Input } from 'ant-design-vue';
import { useDesign } from 'hooks/useDesign';

export default defineComponent({
    name: 'StrengthMeter',
    components: { InputPassword: Input.Password },
    props: {
      value: {type: String},
      showInput: {type: Boolean, default: true},
      disabled: {type: Boolean, default: false},
    },
    emits: ['score-change', 'change'],
    setup(props, { emit }) {
        const innerValueRef = ref('');
        const { prefixCls } = useDesign('strength-meter');

        const countRules = (val) => {
            let rules = {
                len: 0,
                num: 0,
                lower: 0,
                upper: 0,
                symbol: 0
            };

            rules.len = val.length;

            for(let i=0; i<rules.len; i++) {
                let c = val.charCodeAt(i);
                if(c >= 48 && c <= 57) {
                    rules.num++;
                } else if(c >= 97 && c <= 122) {
                    rules.lower++;
                } else if(c >= 65 && c <= 90) {
                    rules.upper++;
                } else {
                    rules.symbol++;
                }
            }

            return rules;
        };

        const lenScore = (num) => {
            // 长度规则：总分25，小于8个字符得5分，小于10个字符得10分，大于10个字符得25分
            let result = 0;
            if (num > 10) { return result = 25; }
            if (num <= 10 && num > 8) { return result = 10; }
            if (num < 8 ) { return result = 5; }
            return result
        };

        const numScore = (num) => {
            // 数字规则：总分20，没有数字得5分，小于2个数字得10分，大于2个字符得20分
            let result = 5;
            if (num > 2) { return result = 20; }
            if (num <= 2) { return result = 10; }
            return result
        };

        const symbolScore = (num) => {
            // 符号规则：总分25，没有符号得0分，1个符号得10分，大于1个字符得25分
            let result = 0;
            if (num > 1) { return result = 25; }
            if (num === 1) { return result = 10; }
            return result
        };

        const letterScore = (lower, upper) => {
            // 字母规则：总分25，没有字母得0分，全是小写或大写得10分，大小写混合字母得25分
            let result = 0;
            if (lower > 0 && upper > 0) { return result = 25; }
            if (lower > 0 || upper > 0 ) { return result = 10; }
            
            return result
        };

        const extraScore = (num, symbol, lower, upper) => {
            // 额外规则：总分5，字母和数字得2分，字母、数字和符号得3分，大小写字母、数字和符号得5分
            let result = 2;
            if (lower > 0 && upper > 0 && symbol > 0 && num > 0) { return result = 5; }
            if (symbol > 0 && (lower > 0 || upper > 0) ) { return result = 3; }
            
            return result
        };

        const getScore = (password) => {
            let score = 0;
            let {len, num, lower, upper, symbol} = countRules(password);
            score += lenScore(len);
            score += numScore(num);
            score += symbolScore(symbol);
            score += letterScore(lower,upper);
            score += extraScore(num, symbol,lower,upper);

            return score;
        };

        const getLevel = (score) => {
            //五个等级 >=90，>=80，>=70，>=60，>=0
            let level = 0;
            if (score >= 90) {return level = 4;}
            if (score >= 80) {return level = 3;}
            if (score >= 70) {return level = 2;}
            if (score >= 60) {return level = 1;}
            return level
        };

        const getPasswordStrength = computed(() => {
            const { disabled } = props;
            if (disabled) return -1;
            const innerValue = unref(innerValueRef);
            const score = innerValue ? getScore(innerValue) : -1;
            const level = score === -1 ? -1 : getLevel(score);
            emit('score-change', level);
            return level;
        });

        function handleChange(e) {
            innerValueRef.value = e.target.value;
        }

        watchEffect(() => {
            innerValueRef.value = props.value || '';
        });

        watch(
            () => unref(innerValueRef),
            (val) => {
                emit('change', val);
            }
        );

        return {
            getPasswordStrength,
            handleChange,
            prefixCls,
            innerValueRef,
        };
    },
});
</script>
<style lang="less" scoped>
  @prefix-cls: ~'barry-strength-meter';

  .@{prefix-cls} {
    &-bar {
      position: relative;
      height: 6px;
      margin: 10px auto 6px;
      background-color: var(--gray);
      border-radius: 6px;

      &::before,
      &::after {
        position: absolute;
        z-index: 10;
        display: block;
        width: 20%;
        height: inherit;
        background-color: transparent;
        border-color: var(--white);
        border-style: solid;
        border-width: 0 5px 0 5px;
        content: '';
      }

      &::before {
        left: 20%;
      }

      &::after {
        right: 20%;
      }

      &--fill {
        position: absolute;
        width: 0;
        height: inherit;
        background-color: transparent;
        border-radius: inherit;
        transition: width 0.5s ease-in-out, background 0.25s;

        &[data-score='0'] {
          width: 20%;
          background-color: var(--danger);
        }

        &[data-score='1'] {
          width: 40%;
          background-color: var(--danger);
        }

        &[data-score='2'] {
          width: 60%;
          background-color: var(--warning);
        }

        &[data-score='3'] {
          width: 80%;
          background-color: var(--green);
        }

        &[data-score='4'] {
          width: 100%;
          background-color: var(--green);
        }
      }
    }
  }
</style>
