---
outline: deep
---

# 《剑指Vue3——从入门到实践》学习心得

## 第一章

## 第二章 核心语法

### 2.1 模板语法

#### 2.1.1 插值语法

插值语法用来向标签体中插入一个`动态`的值。插值语法的结构很固定，用双大括号包含一个JavaScript表达式，即

```md
{{JavaScript表达式}}
```

#### 2.1.2 指令语法




This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
