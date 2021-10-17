<template>
    <section class="m-y-15">
            <a-row :gutter="[16,16]">
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="拖动校验">
                    <DragVerify ref="el1" :src="LogoImg"  @success="handleSuccess" />
                    <a-button class="m-t-15" type="primary" @click="handleBtnClick(el1)"> 还原 </a-button>
                </Card>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="圆角" tag="img">
                    <DragVerify ref="el2" :src="LogoImg"  @success="handleSuccess" circle />
                    <a-button class="m-t-15" type="primary" @click="handleBtnClick(el2)"> 还原 </a-button>
                </Card>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="自定义拖动背景色" tag="img">
                    <DragVerify ref="el3" :src="LogoImg"  @success="handleSuccess" 
        
        :barStyle="{
          backgroundColor: '#018ffb',
        }" />
                    <a-button class="m-t-15" type="primary" @click="handleBtnClick(el3)"> 还原 </a-button>
                </Card>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="自定义图标">
                    <DragVerify ref="el4" :src="LogoImg"  @success="handleSuccess">
                              <template #actionIcon="isPassing">
                                <BugOutlined v-if="isPassing" />
                                <RightOutlined v-else />
                              </template>
                    </DragVerify>
                    <a-button class="m-t-15" type="primary" @click="handleBtnClick(el4)"> 还原 </a-button>
                </Card>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <Card title="自定义提示">
                    <DragVerify ref="el5" :src="LogoImg"  @success="handleSuccess" text="拖动以进行校验" successText="校验成功">
                    <template #text="isPassing">
                      <div v-if="isPassing">
                        <BugOutlined />
                        成功
                      </div>
                      <div v-else>
                        拖动
                        <RightOutlined />
                      </div>
                    </template>
                    </DragVerify>
                    <a-button class="m-t-15" type="primary" @click="handleBtnClick(el5)"> 还原 </a-button>
                </Card>
            </a-col>
        </a-row>
</section>
</template>
<script>
import { defineComponent, ref } from 'vue';
  import { BugOutlined, RightOutlined } from '@ant-design/icons-vue';
import Card from 'components/card';
import DragVerify from 'components/verify';
import LogoImg from 'assets/logo.png';
import {useMessage} from 'hooks/useMessage'
export default defineComponent({
    components: { Card, DragVerify, BugOutlined, RightOutlined },

    setup() {
        const el1 = ref(null);
        const el2 = ref(null);
        const el3 = ref(null);
        const el4 = ref(null);
        const el5 = ref(null);
        const { createMessage } = useMessage();
        const handleSuccess = ({time}) => {
            createMessage.success(`校验成功,耗时${time}秒`);
        };
        
      function handleBtnClick(elRef) {
        if (!elRef) {
          return;
        }
        elRef.resume();
      }
        return {
            el1,
            el2,
            el3,
            el4,
            el5,
            LogoImg,
            handleSuccess,
            handleBtnClick
        };
    }
})
</script>
<style scoped>
</style>