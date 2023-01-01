// 这个地方 ide 会建议修改为 ES 模块，但实际上改了会报错。
const Viz = require('viz.js');
const { Module, render } = require('viz.js/full.render.js');

let viz = new Viz({ Module, render });


const parseArgs = (args) => {
    let result = {
        title: '',
        align: 'center', // 默认居中
        maxWidth: null
    };

    if(args.length == 1 && ! args[0].includes(':')) {
        result.title = args[0];
    }
    else {
        for(let arg of args) {
            let pair = arg.split(':');
            if(pair.length != 2) {
                continue;
            }
            else if(pair[0] == 'title') {
                result.title = pair[1];
            }
            else if(pair[0] == 'align') {
                result.align = pair[1];
            }
            else if(pair[0] == 'maxWidth' || pair[0] == 'max-width') {
                // 检查 pair[1]是否有单位
                if(! isNaN(pair[1])) {
                    result.maxWidth = pair[1] + 'px';
                }
                else {
                    result.maxWidth = pair[1];
                }
                
            }
        }
    }

    return result;
}

const graphvizTab = async (args, content) => {
    const arg = parseArgs(args);
    try {
        let result = await viz.renderString(content);
        // 将 svg 标签的 width 和 height 删掉，以便随窗口大小缩放。
        let re = /<svg\s+width\s*=\s*"[^"]*"\s+height\s*=\s*"[^"]*"/;
        result = result.replace(re, '<svg ');

        // 修改 title 为 arg
        re = /<title>.*?<\/title>/;
        result = result.replace(re, `<title>${arg.title}</title>`);

        const maxWidthStyle = arg.maxWidth != null ? `max-width: ${arg.maxWidth};` : '';
        const alignStyle = arg.align == 'left'? '': arg.align == 'right' ? 'margin-left: auto;' : 'margin: 0 auto;'; 
        const style = maxWidthStyle != '' || alignStyle != '' ? `style="${maxWidthStyle} ${alignStyle}"` : '';
        
        return `<div style="margin: 0 0 20px;">
                    <div ${style}>
                    ${result}
                    <div style="text-align: center;margin: -8px 0 10px;color: #858585;">${arg.title}</div>
                    </div>
                    
                </div>`;
    } catch (error) {
        console.log(error);
        viz = new Viz({ Module, render });
        return `<div
                style="margin: 0 0 20px; text-align: center;"
                >
                    <div>${content}</div>
                    <div><b>${error}</b></div>
                    
                </div>`;
    }

}

hexo.extend.tag.register('graphviz', graphvizTab, { ends: true, async: true });


