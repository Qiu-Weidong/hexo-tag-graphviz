// 这个地方 ide 会建议修改为 ES 模块，但实际上改了会报错。
const Viz = require('viz.js');
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });

const graphvizTab = async (args, content) => {

    try {
        const result = await viz.renderString(content);
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




