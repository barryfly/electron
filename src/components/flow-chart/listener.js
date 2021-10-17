export default function RegisteListener(flowInstance, callback, isHover) {
    // 节点node
    // flowInstance.on("element:click", ({data, e, position }) => callback({ data, e, position }, 'element:click'));
    flowInstance.on("node:click", ({data, e, position }) => callback({ data, e, position }, 'node:click'));
    // flowInstance.on("node:dbclick", ({data, e, position }) => callback({ data, e, position }, 'node:dbclick'));
    // flowInstance.on("node:mousedown", ({ data, e }) => callback({ data, e, },'node:mousedown'));
    // flowInstance.on("node:mouseup", ({ data, e }) => callback({ data, e },'node:mouseup'));
    // flowInstance.on("node:mousemove", ({ data, e }) => callback({ data, e },'node:mousemove'));
    // 鼠标Hover开关
    if (isHover) {
        flowInstance.on("node:mouseenter", ({ data, e }) => callback({ data, e },'node:mouseenter'));
        flowInstance.on("node:mouseleave", ({ data, e }) => callback({ data, e },'node:mouseleave'));
    }
    flowInstance.on("node:contextmenu", ({ data, e }) => callback({ data, e },'node:contextmenu'));

    // 边edge
    flowInstance.on("edge:click", ({ data, e }) => callback({ data, e },'edge:click'));
    flowInstance.on("edge:dbclick", ({ data, e }) => callback({ data, e },'edge:dbclick'));
    flowInstance.on("edge:contextmenu", ({ data, e }) => callback({ data, e },'edge:contextmenu'));

    // 画布blank
    // flowInstance.on("blank:mousemove", ({ data, e }) => callback({ data, e }, 'blank:mousemove'));

    // history
    flowInstance.on("history:change", ({ data }) => callback({ data}, 'history:change'));
    return flowInstance;
}