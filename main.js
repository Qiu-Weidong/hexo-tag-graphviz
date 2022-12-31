// 这个地方 ide 会建议修改为 ES 模块，但实际上改了会报错。
const Viz = require('viz.js');
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });

const graphvizTab = async (args, content) => {

    try {
        let result = await viz.renderString(content);
        // 将 svg 标签的 width 和 height 删掉，以便随窗口大小缩放。
        let re = /<svg\s+width\s*=\s*"[^"]*"\s+height\s*=\s*"[^"]*"/;
        result = result.replace(re, '<svg ');
        return `<div
                style="margin: 0 0 20px; 
                text-align: center;"
                >
                <div>
                ${result}
                </div>
                <div style="text-align: center;margin: -8px 0 10px;color: #858585;">${args}</div>
                </div>`;
    } catch (error) {
        console.log(error);
        viz = new Viz({ Module, render });
        return `<div
                    style="margin: 0 0 20px; 
                    text-align: center;"
                    >
                    <div>${content}</div>
                    <div><b>${error}</b></div>
                    
                    </div>`;
    }

}

hexo.extend.tag.register('graphviz', graphvizTab, { ends: true, async: true });


