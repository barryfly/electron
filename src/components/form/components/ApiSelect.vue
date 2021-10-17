<template>
  <Select
    @dropdownVisibleChange="handleFetch"
    v-bind="attrs"
    :options="getOptions"
    v-model="state"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        未找到
      </span>
    </template>
  </Select>
</template>
<script>
  import { defineComponent, ref, watchEffect, computed, unref, watch } from 'vue';
  import { Select } from 'ant-design-vue';
  import { isFunction } from 'utils/is';
  import { useRuleFormItem } from 'hooks/useFormItem';
  import { useAttrs } from 'hooks/useAttrs';
  import { get, omit } from 'lodash-es';
  import { LoadingOutlined } from '@ant-design/icons-vue';


  export default defineComponent({
    name: 'ApiSelect',
    components: {
      Select,
      LoadingOutlined,
    },
    inheritAttrs: false,
    props: {
      value: {
        type: [Object, Number, String, Array]
      },
      numberToString: {
        type: Boolean,
        default: false
      },
      api: {
        type: Function,
        default: null,
      },
      // api params
      params: {
        type: Object,
        default: () => ({}),
      },
      // support xxx.xxx.xx
      resultField: {
        type: String,
        default: ''
      },
      labelField: {
        type: String,
        default: 'Label'
      },
      valueField: {
        type: String,
        default: 'value'
      },
      immediate: {
        type: Boolean,
        default: true
      },
    },
    emits: ['options-change', 'change'],
    setup(props, { emit }) {
      const options = ref([]);
      const loading = ref(false);
      const isFirstLoad = ref(true);
      const attrs = useAttrs();

      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props);

      const getOptions = computed(() => {
        const { labelField, valueField, numberToString } = props;

        return unref(options).reduce((prev, next) => {
          if (next) {
            const value = next[valueField];
            prev.push({
              label: next[labelField],
              value: numberToString ? `${value}` : value,
              ...omit(next, [labelField, valueField]),
            });
          }
          return prev;
        }, [] );
      });

      watchEffect(() => {
        props.immediate && fetch();
      });

      watch(
        () => props.params,
        () => {
          !unref(isFirstLoad) && fetch();
        },
        { deep: true }
      );

      async function fetch() {
        const api = props.api;
        if (!api || !isFunction(api)) return;

        try {
          loading.value = true;
          const res = await api(props.params);
          if (Array.isArray(res)) {
            options.value = res;
            emitChange();
            return;
          }
          if (props.resultField) {
            options.value = get(res, props.resultField) || [];
          }
          emitChange();
        } catch (error) {
          console.warn(error);
        } finally {
          loading.value = false;
        }
      }

      async function handleFetch() {
        if (!props.immediate && unref(isFirstLoad)) {
          await fetch();
          isFirstLoad.value = false;
        }
      }

      function emitChange() {
        emit('options-change', unref(options));
      }

      return { state, attrs, getOptions, loading, handleFetch };
    },
  });
</script>
