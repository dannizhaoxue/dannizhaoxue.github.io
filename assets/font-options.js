window.DanniType={
 fonts:{
  din:{label:'DIN Condensed',family:'"DIN Condensed","Arial Narrow",sans-serif',weight:700,note:'直立窄体，轮廓清楚，接近参考的字形'},
  impact:{label:'Impact',family:'Impact,"Arial Narrow",sans-serif',weight:400,note:'已选用；紧凑厚重，经典海报字形'},
  narrow:{label:'Arial Narrow Bold',family:'"Arial Narrow",Arial,sans-serif',weight:700,note:'更轻、更利落，减少字块的压迫感'},
  condensedBold:{label:'Avenir Condensed / Bold',family:'"Avenir Next Condensed","Arial Narrow",sans-serif',weight:700,note:'保留窄体结构，把字重降下来'},
  condensed:{label:'Avenir Condensed / Heavy',family:'"Avenir Next Condensed","Arial Narrow",sans-serif',weight:900,note:'旧版较重的字形，作为对照'},
  helvetica:{label:'Helvetica Neue Bold',family:'"Helvetica Neue",Arial,sans-serif',weight:700,note:'中性、平直，字面更宽'},
  avenir:{label:'Avenir Next Bold',family:'"Avenir Next",Arial,sans-serif',weight:700,note:'几何轮廓，转角更柔和'},
  futura:{label:'Futura Bold',family:'Futura,"Helvetica Neue",sans-serif',weight:700,note:'圆形与尖角对比更鲜明'},
  menlo:{label:'Menlo',family:'Menlo,Consolas,monospace',weight:700,note:'等宽对照'},
  georgia:{label:'Georgia',family:'Georgia,"Times New Roman",serif',weight:700,note:'衬线对照'}
 },
 choices:['din','impact','narrow','condensedBold','condensed','helvetica','avenir','futura'],
 names:{songti:{family:'"Songti SC",serif',weight:400,spacing:'.035em'},songtiBold:{family:'"Songti SC",serif',weight:700,spacing:'.035em'},heiti:{family:'"Heiti SC","STHeiti",sans-serif',weight:300,spacing:'.035em'},heitiWide:{family:'"Heiti SC","STHeiti",sans-serif',weight:500,spacing:'.16em'}}
};

Object.assign(window.DanniType.names,{
 pingfang:{label:'现代黑体',family:'"PingFang SC",sans-serif',weight:500,spacing:'.015em'},
 pingfangLight:{label:'轻黑体',family:'"PingFang SC",sans-serif',weight:300,spacing:'.06em'},
 hiragino:{label:'冬青黑体',family:'"Hiragino Sans GB",sans-serif',weight:600,spacing:'.035em'},
 rounded:{label:'圆体',family:'"Yuanti SC",sans-serif',weight:500,spacing:'.045em'},
 kaiti:{label:'楷体',family:'"Kaiti SC",serif',weight:400,spacing:'.04em'},
 xingkai:{label:'行楷',family:'"Xingkai SC",serif',weight:300,spacing:'.035em'},
 libian:{label:'隶变',family:'"Libian SC",serif',weight:400,spacing:'.035em'},
 baoli:{label:'报隶',family:'"Baoli SC",serif',weight:400,spacing:'.035em'}
});
window.DanniType.names.songti.label='宋体';
window.DanniType.names.songtiBold.label='粗宋体';
window.DanniType.nameChoices=['pingfang','pingfangLight','hiragino','rounded','songti','songtiBold','kaiti','xingkai','libian','baoli'];

window.DanniType.oldNameChoices=window.DanniType.nameChoices.slice();
Object.assign(window.DanniType.names,{"smiley": {"label": "得意黑", "family": "\"Danni-smiley\",sans-serif", "weight": 400, "spacing": ".025em", "note": "窄斜体，线条有弧度", "source": "https://github.com/atelier-anchor/smiley-sans", "webfont": true}, "glowNarrow": {"label": "未来荧黑 · 窄黑", "family": "\"Danni-glowNarrow\",sans-serif", "weight": 400, "spacing": ".035em", "note": "窄而厚，适合搭配 Impact", "source": "https://github.com/welai/glow-sans", "webfont": true}, "glowCompressed": {"label": "未来荧黑 · 超窄", "family": "\"Danni-glowCompressed\",sans-serif", "weight": 400, "spacing": ".045em", "note": "更纤长、更紧凑", "source": "https://github.com/welai/glow-sans", "webfont": true}, "neoSans": {"label": "霞鹜新晰黑", "family": "\"Danni-neoSans\",sans-serif", "weight": 400, "spacing": ".035em", "note": "清瘦利落，笔画有细节", "source": "https://github.com/lxgw/LxgwNeoXiHei", "webfont": true}, "neoSerif": {"label": "霞鹜新致宋", "family": "\"Danni-neoSerif\",sans-serif", "weight": 400, "spacing": ".03em", "note": "细宋体，保留锋利的衬线", "source": "https://github.com/lxgw/LxgwNeoZhiSong", "webfont": true}, "xiaowei": {"label": "站酷小薇", "family": "\"Danni-xiaowei\",sans-serif", "weight": 400, "spacing": ".035em", "note": "更有标识感的宋体结构", "source": "https://github.com/google/fonts/tree/main/ofl/zcoolxiaowei", "webfont": true}, "douyin": {"label": "抖音美好体", "family": "\"Danni-douyin\",sans-serif", "weight": 400, "spacing": ".025em", "note": "圆角粗黑，笔画更饱满", "source": "https://github.com/bytedance/fonts/tree/main/DouyinSans", "webfont": true}, "pixel": {"label": "缝合像素", "family": "\"Danni-pixel\",sans-serif", "weight": 400, "spacing": ".04em", "note": "像素字形，早期网络感", "source": "https://github.com/TakWolf/fusion-pixel-font", "webfont": true}});
window.DanniType.newNameChoices=["smiley", "glowNarrow", "glowCompressed", "neoSans", "neoSerif", "xiaowei", "douyin", "pixel"];
window.DanniType.nameChoices=window.DanniType.newNameChoices.concat(window.DanniType.oldNameChoices);

Object.assign(window.DanniType.names,{"eqNarrow": {"label": "等高体 · 窄黑", "family": "\"Danni-eqNarrow\",sans-serif", "weight": 400, "spacing": ".025em", "note": "较窄、笔画平直，和 Impact 的高度关系更接近", "source": "https://github.com/howlingFounts/EqHiSans", "webfont": true}, "eqMedium": {"label": "等高体 · 中黑", "family": "\"Danni-eqMedium\",sans-serif", "weight": 400, "spacing": ".025em", "note": "稍轻、稍宽，不让中文名字压过英文", "source": "https://github.com/howlingFounts/EqHiSans", "webfont": true}, "zeroHei": {"label": "香萃零度黑", "family": "\"Danni-zeroHei\",sans-serif", "weight": 400, "spacing": ".025em", "note": "更方、更有棱角的标题字形", "source": "https://github.com/Miiiller/Xiangcui-ZeroHei", "webfont": true}, "waveSans": {"label": "香萃自在舒畅黑", "family": "\"Danni-waveSans\",sans-serif", "weight": 400, "spacing": ".025em", "note": "带轻微曲线变化，更偏艺术字方向", "source": "https://github.com/Miiiller/Xiangcui-Wave-Sans", "webfont": true}});

window.DanniType.names.smileyTight={...window.DanniType.names.smiley,label:'得意黑 · 紧排',spacing:'-.035em',note:'同一款得意黑，收紧字距，名字更像一个整体',variant:true};
window.DanniType.names.smileyOpen={...window.DanniType.names.smiley,label:'得意黑 · 疏排',spacing:'.10em',note:'同一款得意黑，放开字距，轮廓更轻松',variant:true};
window.DanniType.focusNameChoices=['smiley','smileyTight','smileyOpen','eqNarrow','eqMedium','zeroHei','waveSans'];
window.DanniType.nameChoices=[...new Set(window.DanniType.focusNameChoices.concat(window.DanniType.nameChoices))];

window.DanniType.names.glowNarrow.spacing=".025em";
