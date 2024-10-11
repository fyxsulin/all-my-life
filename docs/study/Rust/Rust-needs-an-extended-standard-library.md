---
outline: deep
---

# Rust needs an extended standard library
# Rust 需要一个扩展的标准库

Rust developers are stuck in an endless hamster wheel where every month / week there is a new best way to do something, and the previous way is now deprecated, kind of like in the frontend development world with the weekly hottest JavaScript framework.<br />
<span style="background-color: #FFFF00;">`Rust 开发者陷入了一个无休止的轮回，每个月或每周都有一种新的最佳方法出现，而之前的方法现在被弃用，这种情况就像前端开发世界中每周都有热门 JavaScript 框架一样。`</span>

<p>
  <image src="/all-my-life/assets/images/2024/10/hamster_wheel.jpg" style="margin-left:auto;margin-right:auto;" />
</p>

The time has come for Rust to graduate from a shadow employment program in Big Tech companies to a programming language empowering the masses of engineers (and not just "programmers") wanting to build efficient and robust sfotware. <br />
<span style="background-color: #FFFF00;">`是时候让 Rust 从大型科技公司的`
<span class="tooltip">`影子就业计划`<span class="tooltiptext">指的是一种非正式或间接的工作安排，通常是指员工在没有正式雇佣关系的情况下参与某种工作或项目。在这个上下文中，指的是 Rust 作为一种编程语言在大型科技公司内部使用，但并未被广泛推广或充分利用，像是处于一种不显眼的状态。它暗示 Rust 还没有得到应有的认可和应用，尽管它有很大的潜力。</span></span>
`中毕业，成为一种赋能广大工程师（不仅仅是“程序员”）构建高效和稳健软件的编程语言。`
</span>

What crypto library should we use? ring, RustCrypto, rust-crypto (don't use it!), boring, aws-lc-s or openssl? <br />
<span style="background-color: #FFFF00;">我们应该使用哪个加密库？[ring](https://crates.io/crates/ring)、[RustCrypto](https://github.com/RustCrypto)、[rust-crypto](https://github.com/DaGenix/rust-crypto)（不要使用它！）、[boring](https://crates.io/crates/boring)、[aws-lc-rs](https://crates.io/crates/aws-lc-rs) 还是 [openssl](https://crates.io/crates/openssl)？</span>

<p>
  <image src="/all-my-life/assets/images/2024/10/ring-crate-info.jpg" style="margin-left:auto;margin-right:auto;" />
</p>

<p>
  <image src="/all-my-life/assets/images/2024/10/rust-crypto-crate-info.jpg" style="margin-left:auto;margin-right:auto;" />
</p>

<p>
  <image src="/all-my-life/assets/images/2024/10/OpenSSL-crate-info.jpg" style="margin-left:auto;margin-right:auto;" />
</p>

> **小知识点:**
> "bindings" 是指 绑定，通常用于描述编程语言与库或底层系统之间的接口。<br />
> 具体来说，在 OpenSSL 项目中，"bindings" 通常表示通过某种方式将 OpenSSL 库的功能暴露给某种编程语言或框架。例如，OpenSSL 本身是用 C 语言编写的，但如果你希望在 Rust、Python 等其他编程语言中使用它，就需要有对应的“bindings”来桥接这些语言与 OpenSSL。这样，开发者可以在他们喜欢的编程语言中调用 OpenSSL 的加密功能，而不需要直接处理 C 语言的代码。
> 换句话说，bindings 是编程语言与库之间的“桥梁”，使开发者能够在更高层次的语言中调用低层次库的功能。

Which HTTP framework? actix-web, axum, dropshot or hyper? <br />
<span style="background-color: #FFFF00;">`我们应该使用哪个 HTTP 框架？actix-web、axum、dropshot 还是 hyper？`</span>

What about a time library? time, chrono or jiff (how I'm even supposed to find this one)? <br />
<span style="background-color: #FFFF00;">`我们应该使用哪个时间库？time、chrono 还是 jiff`</span>

You get it, if you are not constantly following the latest news, your code is already technical debt before it's even written. Fragmentation is exhausting. <br />
<span style="background-color: #FFFF00;">`如果你不持续关注最新消息，你的代码在写之前就已经存在技术债务了。不知道选择哪个更好, 让人疲惫。`</span>

I just looked at the dependencies of a medium-sized project I'm working on, and we have 5+ (!) different crpyto libraries: 2 different versions of ring, aws-lc-rs, boring, and various libraries from RustCrypto. All of this because our various dependencies have picked a different one for their own cryptographic usage. This is insane, first because it introduces a lot of supply chain attack entry points, but also because there is no way that we will audit all of them, and only a aws-lc-rs and boring have an FIPS-validated mode. <br />
<span style="background-color: #FFFF00;">`查看了正在进行的一个中型项目的依赖项，发现我们有 5 个以上不同的加密库：2 个不同版本的 ring, aws-lc-rs、boring 以及来自 RustCrypto 的各种库。所有这一切都是因为我们的不同依赖项为各自的加密使用选择了不同的库。这真是疯狂，首先因为这引入了许多`<span class="tooltip">`供应链攻击`<span class="tooltiptext">文中提到的项目中使用了多个不同的加密库，这就形成了一个复杂的依赖链。每个库及其所依赖的库都是供应链的一部分。如果这些库中有一个存在漏洞或被恶意修改，那么整个项目的安全性都会受到影响。
文中特别提到供应链攻击的威胁：依赖库的多样性和复杂性增加了攻击面，尤其是当开发者使用多个未经严格审查的外部依赖时，很难保证所有的库都是安全的。</span></span>`的入口点，其次因为我们根本无法审核所有这些库，只有 aws-lc-rs 和 boring 有经过 `<span class="tooltip">`FIPS 验证的模式。`<span class="tooltiptext">FIPS 验证的模式是指符合《联邦信息处理标准》（FIPS，Federal Information Processing Standards）的加密模块或系统。FIPS 是由美国国家标准与技术研究院（NIST）制定的标准，旨在确保政府和相关机构使用的加密技术是安全和可靠的。通过 FIPS 认证的加密模块意味着它们经过严格的测试和评估，符合特定的安全要求。因此，许多组织，特别是政府机构，通常要求使用 FIPS 认证的加密技术。</span></span></span>

## The status quo is deplorable.(现状令人堪忧。)

In a recent analysis, Adam Harvey found that among the 999 most popular crates on crates.io, around 17% contained code that didn't match their code repository. <br />
<span style="background-color: #FFFF00;">`在最近的一项分析中，亚当·哈维发现，在 crates.io 上最受欢迎的 999 个 crate 中，发现大约 17% 的 crate 中的代码与它们的代码库（repository）中的代码不匹配`</span>

17%!

Let me rephrase this, 17% of the most popular Rust packages contain code that virtually nobody knows what it does (I can't imagine about the long tail which receives less attention).  <br />
<span style="background-color: #FFFF00;">`让我换句话说，17% 的最受欢迎的 crate 包含有几乎没有人知道其作用的代码（我无法想象那些关注度较低的包会怎样）。`</span>

> **扩展解读**
> 这个 "不匹配" 可能意味着以下几种情况：<br />
> 1、发布的代码和源代码库中的代码不同：
> - 这些 crate 在发布到 crates.io（Rust 的包管理平台）时，代码可能经过了修改，但这些修改并没有反映在代码库中。这意味着开发者在检查源码时，看到的和实际使用的版本不一致。

> 2、未公开的变更：
> - 一些依赖库可能在发布时加入了一些变更或修复，但这些变更并未记录或同步到公开的代码库。这种情况让其他开发者难以审查和信任这些 crate，因为他们无法确认实际使用的代码是否安全。

> 3、潜在的供应链攻击风险：
> - 如果代码不匹配，那么这可能为供应链攻击提供了机会。例如，攻击者可以篡改发布到 crates.io 的代码，注入恶意代码，而开发者在查看代码库时却看不到这些恶意代码。这会大大增加项目被攻击的风险。

> 17% 这个数据说明了什么？
> - 这意味着在 Rust 生态系统中，几乎五分之一的流行依赖库存在代码不一致的问题。这样的不一致让依赖这些库的开发者和项目面临着巨大的安全风险，因为他们无法完全信任或审查这些库的真实代码。
> - 因此，这个 17% 的数字突显了当前供应链安全问题的严重性——开发者使用的依赖库可能并不像他们想象中那样透明和可信。

> 总结：
> - "17% 的 crate 代码与代码库不匹配" 表示有将近五分之一的 Rust 依赖库中，发布到 crates.io 的代码与其在公共代码库中展示的代码不同。这反映了 Rust 生态系统中存在的供应链安全隐患，让开发者难以完全信任他们所使用的依赖库。

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

Secure by Design means that it's hard to introduce uninvited code in your projects and that we have effective controls in place to prevent backdoored dependencies. <br />
<span style="background-color: #FFFF00;">`设计时安全意味着在你的项目中很难引入未被邀请的代码，并且我们有有效的控制措施来防止后门依赖的出现。`</span>

## The (obvious) solution(（显而易见的）解决方案)

Rust needs an extended standard library. <br />
<span style="background-color: #FFFF00;">`Rust 需要一个扩展的标准库。`</span>

All other major programming languages and ecosystems have internalized this fact and provide solid and secure foundations to their developers. Go is paving the way, with deno and zig following closely.<br />
<span style="background-color: #FFFF00;">`其他主要编程语言和生态系统都已经内化了这一事实，为开发者提供了稳固和安全的基础。Go 正在开辟道路，Deno 和 Zig 也紧随其后。`</span>

The extended standard library, let's call it stdx, should be independent of the language so it can evolves at its own pace and make breaking changes when it's required.<br />
<span style="background-color: #FFFF00;">`扩展的标准库，我们称之为 stdx，应该独立于语言，这样它可以按照自己的节奏发展，并在需要时进行重大更改。`</span>

This extended standard library could be a monorepo with a cargo workspace under the rust-lang GitHub organization composed of many crates that most developers need on an daily basis.<br />
<span style="background-color: #FFFF00;">`为了确保这个扩展的标准库的安全性，最重要的是它不应使用除 stdx 包和 Rust 标准库以外的任何依赖。`</span>

stdx would not only contain high-quality and robust implementations that are "good enough" for most situations (and developers are free to use third-party packages if they have special needs) but it would also be a common ground that all Rust developers can use and master, instead of having to deal with completely random packages that do the same thing but with a different API when jumping from one project to another.<br />
<span style="background-color: #FFFF00;">`stdx 不仅会包含高质量且稳健的实现，这些实现对大多数情况来说是“足够好的”（开发者如果有特殊需求可以自由使用第三方包），而且它还将成为所有 Rust 开发者可以使用和掌握的共同基础，而不必在不同项目之间跳转时处理完全随机的、功能相同但 API 各异的包。`</span>

## Funding and other operational challenges(资金和其他运营挑战)

Talk is cheap, developers are expensive, how do you fund this? <br />
<span style="background-color: #FFFF00;">`空谈容易，开发者成本高，你如何为此提供资金？`</span>

The Rust foundation of course! With such high-profile members I have have absolutely no doubts that the Rust foundation is be able to raise ~$700K / year to pay 5 people to work on the foundations of a programming language used to generate billions of dollars of revenues.<br />
<span style="background-color: #FFFF00;">`当然是 Rust 基金会！有如此高知名度的成员，我完全相信 Rust 基金会能够每年筹集约 70 万美元，以支付 5 人的薪水来从事一种用于产生数十亿美元收入的编程语言的基础工作。`</span>

Today, Rust developers are not limited by the language itself, which is often considered as the most advanced mainstream programming language. Instead, we are greatly limited by a slowly moving and fragmented ecosystem of libraries. There is no other way around, we need paid developers to work on solving this huge problem.<br />
<span style="background-color: #FFFF00;">`今天，Rust 开发者并不受限于语言本身，通常认为这是最先进的主流编程语言。相反，我们受到一个缓慢发展且碎片化的库生态系统的极大限制。别无选择，我们需要付费开发者来解决这个巨大问题。`</span>

An extended standard library can't work without the support of the Rust foundation: if it's not official, a lot of people won't trust it and we will be back to the current situation. It needs to live under the rust-lang GitHub organization. <br />
<span style="background-color: #FFFF00;">`一个扩展的标准库离不开 Rust 基金会的支持：如果没有官方认证，很多人就不会信任它，我们将回到当前的状况。它需要在 rust-lang GitHub 组织下运作。`</span>

## Some Closing Thoughts(一些结束的思考)

After using it for many years, I feel that Rust is currently not sustainable: too much energy is wasted by everybody fighting an (increasingly more) fragmented ecosystem.<br />
<span style="background-color: #FFFF00;">`在使用 Rust 多年后，我觉得它目前不可持续：每个人都在为一个越来越碎片化的生态系统而斗争，浪费了太多精力。`</span>

While it may be a guarantee for your job's security as a developer, it makes little sense for businesses to spend money developing software that will need an ever growing amount of spending just for maintenance. Thus, smart decision makers will choose other programming languages. <br />
<span style="background-color: #FFFF00;">`虽然这可能为作为开发者的你提供工作安全保障，但对企业来说，花钱开发需要不断增加维护支出的软件并没有多大意义。因此，聪明的决策者会选择其他编程语言。`</span>

Rust's current trajectory is making its code a liability for businesses that are not Big Tech. What if instead we work together to make it a worthy investment for everyone? <br />
<span style="background-color: #FFFF00;">`Rust 目前的发展轨迹使其代码成为非大型科技公司的一种负担。如果我们一起努力，使其成为对所有人都值得投资的项目，情况会如何呢？`</span>

Do you feel that a career upgrade is long-awaited? Take a look at my book Black Hat Rust where you will learn production-grade Rust, offensive security and applied cryptography.<br />
<span style="background-color: #FFFF00;">`你觉得职业升级早已迫在眉睫吗？请查看我的书《Black Hat Rust》，在这里你将学习到生产级 Rust、攻击性安全和应用密码学。`</span>

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