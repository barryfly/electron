<template>
  <div class="bg-dark">
    <span class="toolbar-btn" v-for="(btn, index) in toolbar" :key="index">
      <Tooltip placement="top">
        <template #title>
          <span>{{ btn.name }}</span>
        </template>
        <a-button @click="btn.action">
          <template #icon>
            <component :is="btn.icon" />
          </template>
        </a-button>
      </Tooltip>
    </span>
  </div>
</template>

<script>
// 组件
import {
  UndoOutlined,
  RedoOutlined,
  BorderOutlined,
  CompassOutlined,
  ArrowRightOutlined,
  MinusOutlined,
  FontSizeOutlined,
  HighlightOutlined,
  DownloadOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons-vue";
import { Tooltip } from "ant-design-vue";

import brush from "assets/brush.svg";
import feather from "assets/feather.svg";
import arrowCoordinate from "utils/screen-capture/arrowCoordinate";
import { clipboard, nativeImage, remote } from "electron";
import fs from "fs";
import path from "path";

import { defineComponent, reactive, toRefs, computed, onMounted } from "vue";
export default defineComponent({
  name: "Toolbar",
  components: {
    UndoOutlined,
    RedoOutlined,
    BorderOutlined,
    CompassOutlined,
    ArrowRightOutlined,
    MinusOutlined,
    FontSizeOutlined,
    HighlightOutlined,
    DownloadOutlined,
    CloseOutlined,
    CheckOutlined,
    Tooltip,
  },
  props: {
    toolbarBottom: Number,
    canvasProps: Object,
    clipDesktop: Function,
  },
  setup(props, context) {
    const clickColor = (color) => {
      const { r, g, b, a } = color.rgba;
      state.config.lineColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    };
    const clickUndo = function() {
      console.log("undo");
      closeDropDown();
      let currentData = state.recordsQueue.pop();
      if (currentData) {
        state.recordsQueue.unshift(currentData);
        let preData = state.recordsQueue[state.recordsQueue.length - 1];
        if (preData) {
          displayCtx.putImageData(preData, 0, 0); //恢复前一次状态
        } else {
          //===0
          this.clipDesktop();
        }
      } else {
        state.recordsQueue.push(currentData);
      }
    };

    const clickRedo = function() {
      console.log("redo");
      closeDropDown();

      let nextData = state.recordsQueue.shift();
      if (nextData) {
        displayCtx.putImageData(nextData, 0, 0);
        state.recordsQueue.push(nextData);
      } else {
        state.recordsQueue.unshift(nextData); //0
      }
    };

    const clickSquare = function() {
      console.log("square");
      closeDropDown();
      assistRef.style.cursor = "crosshair";

      assistRef.onmousedown = (e) => {
        let x1 = e.clientX,
          y1 = e.clientY,
          left = canvasX,
          top = canvasY,
          X = x1 - left, //相对于画布，起点X
          Y = y1 - top; //相对于画布，起点Y
        //设置样式
        setStyle();
        //开始绘制
        // assistCtx.beginPath()
        assistCtx.moveTo(X, Y);

        //bind mousemove
        let x2, y2;
        document.onmousemove = (e) => {
          x2 = e.clientX;
          y2 = e.clientY;

          assistCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          assistCtx.beginPath();
          assistCtx.rect(X, Y, x2 - x1, y2 - y1);
          assistCtx.stroke();
        };

        document.onmouseup = () => {
          //清空辅助画布并绘制到显示画布
          assistCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          displayCtx.strokeRect(X, Y, x2 - x1, y2 - y1);
          //记录当前的状态并清理事件
          recordAndClearEvents();
        };
      };
    };

    const clickCircle = function() {
      console.log("circle");
      closeDropDown();
      assistRef.style.cursor = state.config.lineRadius50
        ? state.featherCursor
        : "crosshair";

      assistRef.onmousedown = (e) => {
        let x1 = e.clientX,
          y1 = e.clientY,
          left = canvasX,
          top = canvasY,
          X = x1 - left, //相对于画布，起点X
          Y = y1 - top; //相对于画布，起点Y
        //设置样式
        setStyle();
        //开始绘制
        // assistCtx.beginPath()
        assistCtx.moveTo(X, Y);

        //bind mousemove
        let w, h;
        document.onmousemove = (e) => {
          w = e.clientX - x1;
          h = e.clientY - y1;

          assistCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          assistCtx.beginPath();
          if (state.config.lineRadius50) {
            //模拟radius50%直线
            assistCtx.ellipse(
              X + w / 2,
              Y + h / 2,
              Math.abs(w / 2),
              state.config.lineWidth / 2,
              0,
              0,
              2 * Math.PI
            );
          } else {
            assistCtx.ellipse(
              X + w / 2,
              Y + h / 2,
              Math.abs(w / 2),
              Math.abs(h / 2),
              0,
              0,
              2 * Math.PI
            ); //centerx,centery,long radius,short radius,start angle,end angle
          }
          assistCtx.stroke();
        };

        document.onmouseup = () => {
          //清空辅助画布，绘制到显示画布
          assistCtx.clearRect(0, 0, canvasWidth, canvasHeight);

          displayCtx.beginPath();
          if (state.config.lineRadius50) {
            //模拟radius50%直线
            displayCtx.ellipse(
              X + w / 2,
              Y + h / 2,
              Math.abs(w / 2),
              state.config.lineWidth / 2,
              0,
              0,
              2 * Math.PI
            );
          } else {
            displayCtx.ellipse(
              X + w / 2,
              Y + h / 2,
              Math.abs(w / 2),
              Math.abs(h / 2),
              0,
              0,
              2 * Math.PI
            );
          }
          displayCtx.stroke();

          //记录当前的状态并清理事件
          recordAndClearEvents();
        };
      };
    };

    const clickArrow = function() {
      console.log("arrow");
      closeDropDown();
      assistRef.style.cursor = state.featherCursor;

      assistRef.onmousedown = (e) => {
        let x1 = e.clientX,
          y1 = e.clientY,
          left = canvasX,
          top = canvasY,
          X = x1 - left,
          Y = y1 - top;
        //设置样式
        setStyle();

        //绘制过程
        let X2, Y2, a1, b1, a2, b2, a3, b3;
        document.onmousemove = (e) => {
          X2 = e.clientX - left;
          Y2 = e.clientY - top;

          //获得箭头的坐标点
          [a1, b1, a2, b2, a3, b3] = arrowCoordinate(X, Y, X2, Y2);
          assistCtx.clearRect(0, 0, canvasWidth, canvasHeight); //这行不要可以绘制散射线
          assistCtx.beginPath();
          assistCtx.moveTo(X, Y);
          assistCtx.lineTo(X2, Y2);
          assistCtx.moveTo(a2, b2);
          assistCtx.lineTo(a1, b1);
          assistCtx.lineTo(X2, Y2);
          assistCtx.lineTo(a3, b3);
          assistCtx.lineTo(a2, b2);
          assistCtx.stroke();
        };
        document.onmouseup = () => {
          //清空辅助画布并绘制到显示画布
          assistCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          displayCtx.beginPath();
          displayCtx.moveTo(X, Y);
          displayCtx.lineTo(X2, Y2);
          displayCtx.moveTo(a2, b2);
          displayCtx.lineTo(a1, b1);
          displayCtx.lineTo(X2, Y2);
          displayCtx.lineTo(a3, b3);
          displayCtx.lineTo(a2, b2);
          displayCtx.stroke();

          //记录当前的状态并清理事件
          recordAndClearEvents();
        };
      };
    };

    const clickLine = function() {
      console.log("line");
      assistRef.style.cursor = state.featherCursor;
      if (state.config.lineRadius50) {
        clickCircle();
        return;
      }
      assistRef.onmousedown = (e) => {
        let x1 = e.clientX,
          y1 = e.clientY,
          left = canvasX,
          top = canvasY,
          X = x1 - left,
          Y = y1 - top;
        //设置样式
        setStyle();

        //绘制过程
        let X2, Y2;
        document.onmousemove = (e) => {
          X2 = e.clientX - left;
          Y2 = e.clientY - top;

          assistCtx.clearRect(0, 0, canvasWidth, canvasHeight); //这行不要可以绘制散射线
          assistCtx.beginPath();
          assistCtx.moveTo(X, Y);
          assistCtx.lineTo(X2, Y2);
          assistCtx.stroke();
        };
        document.onmouseup = () => {
          //清空辅助画布并绘制到显示画布
          assistCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          displayCtx.beginPath();
          displayCtx.moveTo(X, Y);
          displayCtx.lineTo(X2, Y2);
          displayCtx.stroke();

          //记录当前的状态并清理事件
          recordAndClearEvents();
        };
      };
    };

    const clickText = function() {
      console.log("txt");
      closeDropDown();
      assistRef.style.cursor = "text";
      state.inputText = true;

      assistRef.onmousedown = (e) => {
        let x = e.clientX,
          y = e.clientY;
        const textInput = document.createElement("div");
        textInput.className = "textInput";
        textInput.contentEditable = true;
        textInput.style.position = "absolute";
        textInput.style.left = x + "px";
        textInput.style.top = y + "px";
        textInput.style.zIndex = 9999;
        textInput.style.color = state.config.lineColor;
        textInput.style.padding = "5px";
        textInput.style.lineHeight = state.fontSize + "px";
        textInput.style.fontSize = state.fontSize + "px";
        textInput.style.fontFamily = "Microsoft YaHei,Sans Serif,System UI";
        textInput.style.cursor = "text";
        textInput.onblur = textInputBlur;
        textInput.onkeydown = textInputKeyDown;
        document.getElementById("app").appendChild(textInput);

        document.onmousemove = (e) => {
          textInput.style.width = e.clientX - x + "px";
          textInput.style.height = e.clientY - y + "px";
        };
        document.onmouseup = () => {
          textInput.focus();
          document.onmousemove = null;
          assistRef.onmousedown = null;
        };
      };
    };

    const clickBrush = function() {
      console.log("brush");
      closeDropDown();
      assistRef.style.cursor = state.brushCursor;

      assistRef.onmousedown = (e) => {
        let x1 = e.clientX,
          y1 = e.clientY,
          left = canvasX,
          top = canvasY,
          X = x1 - left,
          Y = y1 - top;
        //设置样式
        setStyle();
        //开始绘制
        // displayCtx.beginPath()
        displayCtx.moveTo(X, Y);
        //绘制过程
        document.onmousemove = (e) => {
          let x2 = e.clientX,
            y2 = e.clientY,
            X2 = x2 - left,
            Y2 = y2 - top;
          displayCtx.lineTo(X2, Y2);
          displayCtx.stroke();
        };
        document.onmouseup = () => {
          //记录当前的状态
          let currentData = displayCtx.getImageData(
            0,
            0,
            canvasWidth,
            canvasHeight
          );
          state.recordsQueue.push(currentData);

          //记录当前的状态并清理事件
          recordAndClearEvents();
        };
      };
    };

    const clickSave = function() {
      console.log("save");
      remote.dialog
        .showSaveDialog({
          title: "图片另存为",
          // defaultPath: this.$root.$data.savePath,
          filters: [
            { name: "*.png", extensions: ["png"] },
            { name: "*.jpeg", extensions: ["jpeg"] },
          ],
          nameFieldLabel: new Date().toLocaleTimeString(),
        })
        .then((res) => {
          const { ext } = path.parse(res.filePath);
          let url = displayRef.toDataURL("image/png");
          if (ext === ".jpeg" || ext === ".jpg") {
            url = displayRef.toDataURL("image/jpeg", 1);
          }
          const imageData = url.replace(/^data:image\/\w+;base64,/, "");
          const imageBuffer = new Buffer(imageData, "base64");
          // fs.writeFile(res.filePath, imageBuffer)
          const writeStream = fs.createWriteStream(res.filePath, {
            encoding: "utf8",
            autoClose: true,
          });
          writeStream.write(imageBuffer);
          writeStream.on("error", (err) => {
            if (err) throw err;

            let errNotification = new Notification(
              "保存失败,您可能取消了操作",
              { silent: true }
            );
            setTimeout(() => {
              errNotification.close();
            }, 1500);

            return;
          });
        });
    };

    const clickCancel = function() {
      console.log("cancel");
      //关闭下拉框
      closeDropDown();
      //初始化选择区域状态
      context.emit("initSelect");
      //改变为适合的cursor,并清理mousedown事件
      assistRef.style.cursor = "move";
      assistRef.onmousedown = null; //一定要清理掉，否则再次截图会无法拖拽，直接触发上次的mousedown事件
      //清空画布
      state.recordsQueue = [0];
      displayCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      //清空文本框
      const textInputs = document.getElementsByClassName("textInput");
      textInputs.forEach((div) => document.getElementById("app").removeChild(div));
    };

    const clickConfirm = function() {
      console.log("confirm");
      // 复制到clipboard
      // let url = displayRef.toDataURL('image/jpeg',1)
      // let url = document.getElementById('desktop-canvas').toDataURL('image/png')
      let url = displayRef.toDataURL("image/png");

      let image = nativeImage.createFromDataURL(url);
      clipboard.writeImage(image);

      clickCancel();
      //最小化/隐藏窗口
      remote.getCurrentWindow().minimize();
      // remote.getCurrentWindow().hide()
    };

    const closeDropDown = () => {
      console.log("close dropdown");
      state.showColorPicker = state.showLineShape = false;
    };

    const recordAndClearEvents = () => {
      console.log(canvasWidth, canvasHeight)
      let currentData = displayCtx.getImageData(
        0,
        0,
        canvasWidth,
        canvasHeight
      );
      state.recordsQueue.push(currentData);

      document.onmousemove = null;
      document.onmouseup = null;
    };

    const setStyle = () => {
      displayCtx.lineWidth = state.config.lineWidth;
      displayCtx.strokeStyle = state.config.lineColor;
      displayCtx.shadowColor = state.config.lineColor;
      // displayCtx.shadowBlur = state.config.shadowBlur
      displayCtx.lineCap = state.config.lineCap;
      displayCtx.setLineDash(state.config.lineDash);

      assistCtx.lineWidth = state.config.lineWidth;
      assistCtx.strokeStyle = state.config.lineColor;
      assistCtx.shadowColor = state.config.lineColor;
      // assistCtx.shadowBlur = state.config.shadowBlur
      assistCtx.lineCap = state.config.lineCap;
      assistCtx.setLineDash(state.config.lineDash);
    };

    const textInputBlur = (e) => {
      if (!e.target.textContent) return;

      //暂未实现改变字体大小,用文本编辑器又没多大必要
      let x = parseInt(e.target.style.left) - canvasX + 5; // padding 5px
      let y = parseInt(e.target.style.top) - canvasY + 5; //
      let divWidth = parseInt(e.target.style.width);
      let text = e.target.innerHTML + `<div><br></div>`; //like: 'afaf<div><br></div><div>gagdfgsdfg</div><div>hdfhh</div>'

      let rows = [];
      text.split("<div>").forEach((row) =>
        rows.push(
          row
            .replace(/<\/div>/g, "")
            .replace(/<br>/g, "")
            .replace(/&nbsp;/g, "")
        )
      );

      let totalLength = displayCtx.measureText(rows[0]).width; //第一行
      let n = Math.ceil(totalLength / divWidth); //回车之前的文字行数
      let words = Math.ceil((divWidth - 10 - 4) / (state.fontSize + 4)); //一行大约多少字符,width:padding 5 border 2 / 字体宽度+间距

      displayCtx.font = `${state.fontSize}px 黑体,Microsoft YaHei,Sans Serif,System UI`;
      // displayCtx.strokeStyle = state.config.lineColor
      displayCtx.fillStyle = state.config.lineColor;
      displayCtx.lineWidth = state.config.lineWidth;
      let lineGap = 1; //
      rows.forEach((row, index) => {
        if (index === 0) {
          for (let i = 0; i < n; i++) {
            let txt = "";
            for (let j in row) {
              if (j >= i * words && j < (i + 1) * words) {
                txt += row[j];
              }
            }
            // displayCtx.strokeText(txt,x,y+(state.fontSize+lineGap)*i)
            displayCtx.fillText(txt, x, y + (state.fontSize + lineGap) * i);
            txt = "";
          }
        } else {
          // displayCtx.strokeText(row,x,y+(state.fontSize+lineGap)*(n+index))
          displayCtx.fillText(
            row,
            x,
            y + (state.fontSize + lineGap) * (n + index)
          );
        }
      });

      //移除dom元素
     document.getElementById('app').removeChild(e.target);
      //记录当前状态
      let currentData = displayCtx.getImageData(
        0,
        0,
        canvasWidth,
        canvasHeight
      );
      state.recordsQueue.push(currentData);
    };

    const textInputKeyDown = (e) => {
      if (e.target.innerHTML === "" && e.keyCode === 8) {
        //backspace
        document.getElementById('app').removeChild(e.target);
      }
      if (e.keyCode === 46) {
        //del
        e.target.innerHTML = "";
        document.getElementById('app').removeChild(e.target);
      }
    };

    const toolbar = [
      { name: "撤销", action: clickUndo, icon: "UndoOutlined" },
      { name: "恢复", action: clickUndo, icon: "RedoOutlined" },
      { name: "矩形", action: clickSquare, icon: "BorderOutlined" },
      { name: "圆形", action: clickCircle, icon: "CompassOutlined" },
      { name: "箭头", action: clickArrow, icon: "ArrowRightOutlined" },
      { name: "直线", action: clickLine, icon: "MinusOutlined" },
      { name: "文本", action: clickText, icon: "FontSizeOutlined" },
      { name: "涂鸦", action: clickBrush, icon: "HighlightOutlined" },
      { name: "另存", action: clickSave, icon: "DownloadOutlined" },
      { name: "取消", action: clickCancel, icon: "CloseOutlined" },
      { name: "确定", action: clickConfirm, icon: "CheckOutlined" },
    ];

    const state = reactive({
      featherCursor: `url(${feather}) 0 30,default`,
      brushCursor: `url(${brush}) 0 30,default`,
      showColorPicker: false,
      showLineShape: false,
      inputText: false,
      fontSize: 16,
      config: {
        lineWidth: 2,
        lineColor: "#6EFF2A",
        lineCap: "round",
        lineDash: [0, 0],
        // shadowBlur: 2,
        lineRadius50: false,
        //选项显示用
        lineShape: "solid",
        radius: "0px",
      },
      recordsQueue: [0],
    });

    const canvasX = computed(() => this.canvasProps.canvasX);
    const canvasY = computed(() => this.canvasProps.canvasY);
    const canvasWidth = computed(() => this.canvasProps.canvasWidth);
    const canvasHeight = computed(() => this.canvasProps.canvasHeight);

    let displayRef = null;
    let displayCtx = null;
    let assistRef = null;
    let assistCtx = null;

    onMounted(() => {
      displayRef = document.getElementById("display-canvas");
      // eslint-disable-next-line no-unused-vars
      displayCtx = displayRef.getContext("2d");

      assistRef = document.getElementById("assist-canvas");
      // eslint-disable-next-line no-unused-vars
      assistCtx = assistRef.getContext("2d");
    });

    return {
      ...toRefs(state),
      toolbar,
      clickColor,
      clickUndo,
      clickRedo,
      clickSquare,
      clickCircle,
      clickArrow,
      clickLine,
      clickText,
      clickBrush,
      clickSave,
      clickCancel,
      clickConfirm,
      closeDropDown,
      recordAndClearEvents,
      setStyle,
    };
  },
});
</script>

<style scoped>
.bg-dark {
  background-color: #6c757d;
}
.toolbar-btn {
  display: inline-block;
  padding: 5px;
}
</style>
