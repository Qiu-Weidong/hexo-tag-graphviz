# hexo-tag-graphviz
A hexo plugin to add graphviz graphs in hexo blog using tags.

In the process of blogging, sometimes you need to draw pictures. For example, when writing a blog related to graph theory, you need to draw a directed or undirected graph. Using `graphviz` is a good choice.

This plugin allows users to write `dot` language directly in the blog, without having to write locally and then generate pictures.

## Instructions
installation method:
```bash
npm i hexo-graphviz-tag
```
After the installation is complete, you can use it the same as the general hexo tag plugin. The tag plugin has only one parameter, the title of the image.
```
{% graphviz image title %}
digraph {
     a -> b;
     b -> c;
     c -> d;
     d -> e;
     a -> e;
     a -> f;
     a -> g;
     g -> f;
     g -> k;
     k -> f;
     e -> f;
}
{% endgraphviz %}
```
The effect under the default theme of hexo:
![Screenshot](screenshot/screenshot.jpg)
The effect under the butterfly theme:
![Screenshot](screenshot/screenshot1.jpg)