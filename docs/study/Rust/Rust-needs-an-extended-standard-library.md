---
outline: deep
---

# Rust needs an extended standard library
# Rust 需要一个扩展的标准库

Rust developers are stuck in an endless hamster wheel where every month / week there is a new best way to do something, and the previous way is now deprecated, kind of like in the frontend development world with the weekly hottest JavaScript framework.<br />
<span style="background-color: #FFFF00;">`Rust 开发者陷入了一个无休止的轮回，每个月或每周都有一种新的最佳方法出现，而之前的方法现在被弃用，这种情况就像前端开发世界中每周都有热门 JavaScript 框架一样。`</span>

The time has come for Rust to graduate from a shadow employment program in Big Tech companies to a programming language empowering the masses of engineers (and not just "programmers") wanting to build efficient and robust sfotware. <br />
<span style="background-color: #FFFF00;">`是时候让 Rust 从大型科技公司的`
<span class="tooltip">`影子就业计划`<span class="tooltiptext">指的是一种非正式或间接的工作安排，通常是指员工在没有正式雇佣关系的情况下参与某种工作或项目。在这个上下文中，指的是 Rust 作为一种编程语言在大型科技公司内部使用，但并未被广泛推广或充分利用，像是处于一种不显眼的状态。它暗示 Rust 还没有得到应有的认可和应用，尽管它有很大的潜力。</span></span>
`中毕业，成为一种赋能广大工程师（不仅仅是“程序员”）构建高效和稳健软件的编程语言。`
</span>

<style>
  .tooltip {
    position: relative;
    display: inline-block;
  }
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 600px;
    background-color: black;
    color: #fff;
    text-align: left;
    border-radius: 6px;
    padding: 5px 0;
 
    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -60px;
  
    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
  }
 
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>