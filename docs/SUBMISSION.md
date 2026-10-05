---
title: "Barista Buddy: A Little More Confident, One Shift at a Time"
published: true
tags: devchallenge, weekendchallenge, hf26challenge
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

## What I Built

My friend recently moved to a new country and is training to become a barista. He’s learning drink recipes, customer phrases, and a new work environment at the same time. I wanted to give him somewhere to put all of that instead of trying to remember everything after a shift.

So I built **Barista Buddy**, a personal shift notebook and practice coach.

He can log what he made, the steps his café taught him, what felt tricky, and advice from his trainer. Those entries become his own drink handbook. Before the next shift, he can review recall cards made from his latest saved notes, revisit workplace phrases, or ask the local AI coach what to focus on.

The recipes come from what he records. That matters because I wanted him to learn his café’s routine, rather than memorize a random recipe from the internet.

There’s also a small progress view showing what he has practiced and his own confidence ratings. Sample entries are clearly labeled, and he can remove them when he starts his real notebook.

I have not handed the app to my friend yet, so this submission does not include user feedback.

## Demo

[Open Barista Buddy](https://ryuuseiwa.github.io/barista-buddy/)

[Browse the source on GitHub](https://github.com/ryuuseiwa/barista-buddy)

A quick walkthrough:

1. Open **Today** and load the sample notebook, or save a drink of your own.
2. Open **Drink notebook** to see the latest recipe notes and earlier shift entries.
3. Try **Practice → Drink recall**, reveal your saved notes, and mark what you want to review.
4. Open **Settings & backup → Prepare AI coach** while online to download the open model. The initial model download is several hundred MB and may be slow or fail on some connections; sample recall practice works without it.
5. Try **Practice → AI coach** with a question such as “What should I focus on before my next shift?”
6. In a drink draft, try **Organize my steps with AI**, then review the suggested steps before applying them.

The source repository includes a local launcher so the app can also be handed over as a laptop app served on localhost.

## Code

[Browse the MIT-licensed source project](https://github.com/ryuuseiwa/barista-buddy)

The application code is MIT licensed. The included runtime libraries retain their own licenses, and model weights are downloaded separately.

## How I Built It

I built the interface with HTML, CSS, and JavaScript. Drink notes and practice records are stored in **IndexedDB** on the user’s own browser. JSON export and import make it possible to back up the notebook or move it to another device.

For the AI, I used **[SmolLM2-360M-Instruct](https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct)**, an Apache-2.0 open-weight model, through **[Transformers.js](https://huggingface.co/docs/transformers.js/en/index)** and ONNX Runtime Web. The app uses a pinned model revision and quantized q4 weights. Generation runs in a browser worker, using the device’s CPU through WebAssembly.

The model has two jobs: tidy up steps the user already wrote and respond to questions using recent saved training notes. It is instructed to avoid inventing recipes, quantities, or café rules. Since a small model can still make mistakes, its suggestions are labeled and kept separate from the notebook until the user reviews them.

Recall practice uses the saved notes directly. It does not treat an AI-generated recipe as the correct answer. Cards marked for review are prioritized, alongside drinks with lower self-rated confidence.

A service worker caches the app and bundled inference runtime. Transformers.js caches downloaded model files. There is no API key and no remote model endpoint receiving the user’s notes.

In local browser checks, the interface rendered at desktop (1280x900) and narrow (390x844) sizes without horizontal overflow. A sample recall answer and self-rating updated the progress view, and sample records were removed afterward. The browser worker attempted to download the pinned model twice, but the Hugging Face CDN failed with an HTTP/2 protocol error (around 72% on the first try and 64% on retry). I could not verify a browser-generated AI response or offline AI inference in this test. The model did generate from sample trainer notes using local ONNX inference in Node on the original build machine; that is not a browser inference test. I have not yet tested the app with my friend, so I have no user feedback to report.

## Why Does Open Innovation Matter?

My friend should be able to write “I forgot this” or “I’m still struggling with this” without sending that learning history to a remote AI service.

The design uses an open-weight model to run the coach on his own device. After the initial download, inference does not need a paid model API or upload his notes for processing. The browser is intended to cache the model so local offline use is possible when all required files remain available. It does need internet for the first download, and offline access depends on the browser and its cache.

I can also inspect and change the prompts, replace the model, or adjust how much of his notebook the coach sees. The project isn’t tied to one hosted model provider.

For this particular app, that’s the intended benefit of open innovation: he can keep a private learning notebook and, once the model is successfully installed, get personalized help from it without a paid model API or model server. Browser inference and offline use still need to be confirmed on his device.

## My Agent Session

I saved a DevRelay session documenting local browser testing and the model-download failure: [Barista Buddy local browser testing](https://dev.to/agent_sessions/barista-buddy-local-browser-testing-js1pha). The session is private/unpublished and may not be accessible to judges.

## Prize Categories

I am not claiming eligibility for an optional partner prize category.
