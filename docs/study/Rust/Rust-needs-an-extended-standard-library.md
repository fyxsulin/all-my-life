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

What crypto library should we use? ring, RustCrypto, rust-crypto (don't use it!), boring, aws-lc-s or openssl? <br />
<span style="background-color: #FFFF00;">`我们应该使用哪个加密库？ring、RustCrypto、rust-crypto（不要使用它！）、boring、aws-lc-s 还是 openssl？`</span>

Which HTTP framework? actix-web, axum, dropshot or hyper? <br />
<span style="background-color: #FFFF00;">`我们应该使用哪个 HTTP 框架？actix-web、axum、dropshot 还是 hyper？`</span>

What about a time library? time, chrono or jiff (how I'm even supposed to find this one)? <br />
<span style="background-color: #FFFF00;">`我们应该使用哪个时间库？time、chrono 还是 jiff（我应该如何找到这个库）？`</span>

You get it, if you are not constantly following the latest news, your code is already technical debt before it's even written. Fragmentation is exhausting. <br />
<span style="background-color: #FFFF00;">`你明白了，如果你不持续关注最新消息，你的代码在写之前就已经成为技术债务了。碎片化真让人疲惫。`</span>

I just looked at the dependencies of a medium-sized project I'm working on, and we have 5+ (!) different crpyto libraries: 2 different versions of ring, aws-lc-rs, boring, and various libraries from RustCrypto. All of this because our various dependencies have picked a different one for their own cryptographic usage. This is insane, first because it introduces a lot of supply chain attack entry points, but also because there is no way that we will audit all of them, and only a aws-lc-rs and boring have an FIPS-validated mode. <br />
<span style="background-color: #FFFF00;">`我刚查看了我正在进行的一个中型项目的依赖项，发现我们有 5 个以上（！）不同的加密库：2 个不同版本的 ring、aws-lc-rs、boring 以及来自 RustCrypto 的各种库。所有这一切都是因为我们的不同依赖项为各自的加密使用选择了不同的库。这真是疯狂，首先因为这引入了许多供应链攻击的入口点，其次因为我们根本无法审核所有这些库，只有 aws-lc-rs 和 boring 有经过 `<span class="tooltip">`FIPS 验证的模式。`<span class="tooltiptext">FIPS 验证的模式是指符合《联邦信息处理标准》（FIPS，Federal Information Processing Standards）的加密模块或系统。FIPS 是由美国国家标准与技术研究院（NIST）制定的标准，旨在确保政府和相关机构使用的加密技术是安全和可靠的。通过 FIPS 认证的加密模块意味着它们经过严格的测试和评估，符合特定的安全要求。因此，许多组织，特别是政府机构，通常要求使用 FIPS 认证的加密技术。</span></span></span>

## The status quo is deplorable.(现状令人堪忧。)

In a recent analysis, Adam Harvey found that among the 999 most popular crates on crates.io, around 17% contained code that didn't match their code repository. <br />
<span style="background-color: #FFFF00;">`在最近的一项分析中，亚当·哈维发现，在 crates.io 上最受欢迎的 999 个 crate 中，约有 17% 的代码与它们的代码库不匹配。`</span>

17%!

Let me rephrase this, 17% of the most popular Rust packages contain code that virtually nobody knows what it does (I can't imagine about the long tail which receives less attention).  <br />
<span style="background-color: #FFFF00;">`让我换句话说，17% 的最受欢迎的 Rust 包含有几乎没有人知道其作用的代码（我无法想象那些关注度较低的包会怎样）。`</span>

Letting "the community build the packages" is literally promoting xkcd 2347 as the official policy. It's a meme intended to make us realize that something is wrong with our current approch to building software, not a a doctrine to build secure and reliable software. <br />
<span style="background-color: #FFFF00;">`让“社区来构建包”简直是在将`<span class="tooltip">`xkcd 2347` <span class="tooltiptext">xkcd 2347 是一个漫画，标题为“Dependency”，描绘了一个复杂的软件依赖关系图，强调了软件包之间互相依赖的混乱和不确定性。这个漫画旨在讽刺当前软件开发中存在的依赖管理问题，尤其是当开发者将过多的信任寄托在社区维护的包时。通过提到这个漫画，作者意在表达对当前软件构建方式的不满，认为仅仅依靠社区构建包是不够的。</span></span>`作为官方政策。这是一个旨在让我们意识到当前构建软件的方法存在问题的梗，而不是建立安全和可靠软件的教义。`</span>

I already have documented how this problem is compounded by Rust's tooling and compile-time features (macros...) so I invite you to read the following articles to learn more about the technical and organizational details of supply chain attacks: <br />
<span style="background-color: #FFFF00;">`我已经记录了 Rust 的工具和编译时功能（宏等）如何使这个问题复杂化，因此我邀请您阅读以下文章，以了解有关供应链攻击的技术和组织细节的更多信息：`</span>

## What can we do now?(我们现在能做什么？)

We first need to understand the 3 levels of maturity of supply chain security. <br />
<span style="background-color: #FFFF00;">`我们首先需要了解供应链安全的三个成熟度级别。`</span>

### Level -2: If I don't See It, It Doesn't Exist! (级别-2：如果我看不见它，那就不存在！)

Digital systems are so complex that even the most advanced users rarely understand more than 1% of the entire system. Everything else is "dark magic": CPUs, compilers, Operating Systems...<br />
<span style="background-color: #FFFF00;">`数字系统如此复杂，即使是最先进的用户也很少能理解整个系统的 1% 以上。其他一切都是“黑魔法”：CPU、编译器、操作系统……`</span>

This insane complexity can't fit in a single Human brain, so it's all natural that software engineers (you, me, everybody) decide to ignore it and instead rely on abstractions and fuzzy ideas of how it works under the hood.<br />
<span style="background-color: #FFFF00;">`这种疯狂的复杂性无法容纳在一个人脑中，因此软件工程师（你、我、每个人）选择忽视它，转而依赖抽象和模糊的概念来理解它的内部工作原理，这也是很自然的。`</span>

It's intrinsically not a bad thing, otherwise we couldn't get any work done! <br />
<span style="background-color: #FFFF00;">`这本质上并不是一件坏事，否则我们无法完成任何工作！`</span>

But, the darker face of the coin is that it also leads to the following reasoning: "I don't understand it, so I don't look at it, so I don't see it, therefore it doesn't exist". <br />
<span style="background-color: #FFFF00;">`但这一事实的阴暗面在于，它也导致了以下推理：“我不理解它，所以我不去看它，因此我看不见它，所以它就不存在。”`</span>

This is where most organizations are today and why supply chain attacks are so common and successful. <br />
<span style="background-color: #FFFF00;">`这正是大多数组织目前的状况，也就是供应链攻击如此普遍和成功的原因。`</span>

### 级别 -1：主动对策(级别 -1：主动对策)

Bigger companies that can pay armies of developers such as Google have employees dedicated to auditing the packages they use (google/rust-crate-audits), but let's be honest, it's the exception, not the norm. <br />
<span style="background-color: #FFFF00;">`能够支付大量开发者费用的大公司，例如谷歌，有专门的员工负责审计他们使用的包（google/rust-crate-audits），但说实话，这只是例外，而不是常态。`</span>

The other most-often discussed active countermeasure is sandboxing, such as this proposal to use WebAssembly to limit the impact of malicious proc macros. <br />
<span style="background-color: #FFFF00;">`另一个最常讨论的主动对策是沙箱技术，例如这个提议，使用 WebAssembly 来限制恶意过程宏的影响。`</span>

While I'm a great fan of sandboxing, in practice it rarely scales and we often see it disabled because it slowed down developers or because it's too hard to configure (Linux' appmarmor...). It's like putting makeup on a donkey, it won't make it an unicorn. <br />
<span style="background-color: #FFFF00;">`虽然我非常支持沙箱技术，但在实践中，它很少能有效扩展，我们常常看到它被禁用，因为它会拖慢开发者的工作速度或配置起来太复杂（如 Linux 的 apparmor）。这就像给驴子化妆，依然不会让它变成独角兽。`</span>

### Level 0: Security by Design(级别 0：设计时安全)

Finally, level 0, where we can start to actually build on solid foundations: Security by Design. <br />
<span style="background-color: #FFFF00;">`最后是级别 0，在这里我们可以开始在坚实的基础上真正构建：设计时安全。`</span>

When it comes to supply chain security, Secure by Design means reducing the number of external dependencies, and, maybe more importantly, the number of people who can commit code in your own codebase (via your dependencies). <br />
<span style="background-color: #FFFF00;">`在供应链安全方面，设计时安全意味着减少外部依赖的数量，也许更重要的是，减少可以在你的代码库中提交代码的人数（通过你的依赖项）`</span>

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