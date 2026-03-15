---
slug: launching-physics-informed-learning-lab
title: Launching Physics-Informed Learning Lab
description: I just deployed a notebook-driven website for learning and exploring physics-informed machine learning, from PINNs fundamentals to operator learning and frontier research notes.
date: 2026-03-15
tags: [Physics-Informed ML, PINNs, Research, Jupyter Book]
---

I just deployed **Physics-Informed Learning Lab**, a public website that turns my `physics-informed-learning` repository into a structured, navigable learning and research surface.

Live site: [https://duncan-nguyen.github.io/physics-informed-learning/](https://duncan-nguyen.github.io/physics-informed-learning/)

GitHub repo: [https://github.com/duncan-nguyen/physics-informed-learning](https://github.com/duncan-nguyen/physics-informed-learning)

This project started from a simple frustration: a lot of the most valuable material in physics-informed machine learning lives in scattered notebooks, partial reproductions, paper notes, and experiments that are hard to revisit later. I wanted a format that felt more organized than a raw repository, but still more honest and more executable than a polished static article.

So instead of writing a conventional documentation site, I built a **notebook-driven research website**.

---

# Why I Built It

Physics-informed machine learning is one of those areas where theory, numerical methods, and implementation details are tightly coupled.

If you only read papers, it is easy to miss the training pathologies, boundary-condition tricks, and optimization tradeoffs that appear in practice. But if you only collect notebooks, the material becomes hard to browse, hard to connect, and hard to teach from.

The goal of this website is to sit in the middle:

* structured enough to learn from,
* close enough to the repo to stay reproducible,
* flexible enough to grow with ongoing experiments.

I wanted the site to reflect how research actually happens: not as a finished textbook, but as a layered system of fundamentals, deeper technical branches, and frontier notes that are still evolving.

---

# What the Website Contains

The site is organized into a few clear sections.

### Lab Guide

This section is the orientation layer. It is meant for readers who want to understand how the repository is organized, how experiments are meant to be run, and how to navigate the broader project without getting lost in implementation details too early.

### Core Path

This is the main learning sequence for readers who want to build intuition step by step.

It starts from the numerical and PDE foundations, then moves through topics like:

* vanilla PINNs for forward problems,
* boundary and initial condition enforcement,
* loss landscape and training dynamics,
* residual-based adaptive sampling,
* multi-scale PINNs,
* parameter identification,
* DeepONet,
* Fourier Neural Operators.

Rather than treating these as isolated topics, the site frames them as part of a progression from classical PINN ideas toward broader operator-learning methods.

### Research Tracks

Beyond the core path, I grouped more specialized topics into research-oriented tracks. These currently include areas such as:

* foundations and extensions,
* advanced PINNs,
* operator extensions,
* structure-preserving networks,
* inverse problems and scientific discovery,
* scalable methods for larger systems.

This structure makes it easier to go deep in one direction without turning the main path into an overwhelming survey.

### Frontier Notes

Some topics are too interesting to ignore, but still too early or too broad to present as mature reproductions. For those, I added a frontier-notes layer.

These pages act more like guided reading maps around emerging directions such as attention-based PDE solvers, diffusion models for scientific computing, in-context operator learning, and foundation-model-style approaches for PDEs.

That distinction matters to me. I want the site to be useful, but also honest about what is polished, what is runnable, and what is still exploratory.

---

# What I Wanted the Site to Optimize For

While building it, I kept returning to four principles.

### 1. Clarity over breadth

There is always a temptation to turn a technical learning site into a giant archive. I wanted the opposite. The core path should remain digestible, and the deeper material should be available without overwhelming first-time readers.

### 2. Notebook-native workflow

The site mirrors the repository structure instead of hiding it behind a completely separate docs layer. That makes the website feel closer to the actual research workflow, which is important for a project like this.

### 3. Honest maturity

Not every page is equally complete, and that is intentional. Some notebooks are ready to teach from. Others are scaffolds for future work. The frontier notes are explicitly exploratory.

That transparency is part of the design, not a temporary flaw.

### 4. Continuous deployment

The website is deployed through **GitHub Pages**, so every push to `main` can publish a fresh version of the site. That keeps the barrier low for iterating on content and turns the repo into something that is continuously improving in public.

---

# Why This Format Matters

I think there is real value in making research repositories easier to read without disconnecting them from their implementation.

For technical domains like physics-informed learning, a good learning surface should do more than display final results. It should help readers answer questions like:

* Where should I start if I am new to PINNs?
* Which notebooks are foundational, and which are advanced?
* What is stable knowledge versus active exploration?
* How do ideas connect across PDE solvers, operator learning, and scientific machine learning more broadly?

This site is my attempt to answer those questions in a way that is practical for both learning and ongoing research.

---

# What Comes Next

This is only the first public version.

Over time, I want to keep improving the runnable notebooks, expand the research tracks, tighten the experiment workflow, and make the website a stronger bridge between reading, implementation, and reproducibility.

If you are working on PINNs, neural operators, scientific machine learning, or adjacent research areas, I hope this becomes a useful resource.

If you want to explore it, start here:

* [Physics-Informed Learning Lab](https://duncan-nguyen.github.io/physics-informed-learning/)
* [physics-informed-learning on GitHub](https://github.com/duncan-nguyen/physics-informed-learning)

I will likely write follow-up posts on specific sections of the project, especially the core PINN path, operator-learning notes, and the engineering workflow behind turning notebook research into a published website.
