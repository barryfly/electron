<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div :class="prefixCls" v-if="visible">
        <div :class="`${prefixCls}-content`">
          <div :class="`${prefixCls}-input__wrapper`">
            <a-input
              :class="`${prefixCls}-input`"
              placeholder="搜索"
              ref="inputRef"
              allow-clear
            >
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
            <span :class="`${prefixCls}-cancel`">
              取消
            </span>
          </div>

          <div :class="`${prefixCls}-not-data`" v-show="getIsNotData">
            暂无搜索结果
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<script>
import { defineComponent, computed, ref, unref } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { useDesign } from 'hooks/useDesign';

export default defineComponent({
    name: 'ModalSearch',
    props: {
        visible: { type: Boolean, default: false}
    },
    emits: [''],
    components: {
        SearchOutlined
    },

    setup() {
        const { prefixCls } = useDesign('search-modal');
        const keyword = ref('');
        const searchResult = ref([])
        const getIsNotData = computed(() => !keyword || unref(searchResult).length === 0);
        const hideModal = () => {
            console.log('hide')
        };
        const showModal = () => {
            console.log('show')
        };
        return {
            prefixCls,
            getIsNotData,
            hideModal,
            showModal
        };
    },
});
</script>

<style lang="less" scoped>
  @prefix-cls: ~'barry-search-modal';
  @footer-prefix-cls: ~'barry-search-footer';
  .@{prefix-cls} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 800;
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background-color: rgba(0, 0, 0, 0.25);
    justify-content: center;

    &--mobile {
      padding: 0;

      > div {
        width: 100%;
      }

      .@{prefix-cls}-input {
        width: calc(100% - 38px);
      }

      .@{prefix-cls}-cancel {
        display: inline-block;
      }

      .@{prefix-cls}-content {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }

      .@{footer-prefix-cls} {
        display: none;
      }

      .@{prefix-cls}-list {
        height: calc(100% - 80px);
        max-height: unset;

        &__item {
          &-enter {
            opacity: 0 !important;
          }
        }
      }
    }

    &-content {
      position: relative;
      width: 632px;
      margin: 0 auto auto auto;
      background-color: var(--white);
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      flex-direction: column;
    }

    &-input__wrapper {
      display: flex;
      padding: 14px 14px 0 14px;
      justify-content: space-between;
      align-items: center;
    }

    &-input {
      width: 100%;
      height: 48px;
      font-size: 1.5em;
      color: #1c1e21;
      border-radius: 6px;

      span[role='img'] {
        color: #999;
      }
    }

    &-cancel {
      display: none;
      font-size: 1em;
      color: #666;
    }

    &-not-data {
      display: flex;
      width: 100%;
      height: 100px;
      font-size: 0.9;
      color: rgb(150 159 175);
      align-items: center;
      justify-content: center;
    }

    &-list {
      max-height: 472px;
      padding: 0 14px;
      padding-bottom: 20px;
      margin: 0 auto;
      margin-top: 14px;
      overflow: auto;

      &__item {
        position: relative;
        display: flex;
        width: 100%;
        height: 56px;
        padding-bottom: 4px;
        padding-left: 14px;
        margin-top: 8px;
        font-size: 14px;
        color: #c9d1d9;
        cursor: pointer;
        background-color: var(white);
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 #d4d9e1;
        align-items: center;

        > div:first-child,
        > div:last-child {
          display: flex;
          align-items: center;
        }

        &--active {
          color: #fff;
          background-color: var(--primary);

          .@{prefix-cls}-list__item-enter {
            opacity: 1;
          }
        }

        &-icon {
          width: 30px;
        }

        &-text {
          flex: 1;
        }

        &-enter {
          width: 30px;
          opacity: 0;
        }
      }
    }
  }
</style>