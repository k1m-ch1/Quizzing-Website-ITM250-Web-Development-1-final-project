# Quizzing-Website-ITM250-Web-Development-1-final-project

Simple quizzing website

# Creating new quizzes

We can quickly create new quizzes like the examples in `/quizzes/guess-the-flag.html` and `/real-vs-ai.html`.

We expect that the quiz follows the following format:

 - We always assume that the first element is an `h1` tag
 - We always assume that the first section contains `quiz-info`, and will not be modified
 - The next few sections will all be quiz questions
 - They will all be multiple choice with one answer (radio button) with the correct answer being at the top.
 - We will shuffle at load-time.

To turn that quiz into a page, go into `/quiz-pages`. If you've created a `my-quiz.html`, just do (while in `/quiz-pages`):

```
mkdir my-quiz
```

then do a hardlink from `template.html` to `./my-quiz/index.html`

```
ln ./template.html ./my-quiz/index.html
```

Done.

> [!NOTE]
> you can add whatever HTML elements you want in the section, just ensure that there's a `fieldset` with `input` elements for multiple choice

# Inspiration

- [NPR's audio quality test](https://www.npr.org/sections/therecord/2015/06/02/411473508/how-well-can-you-hear-audio-quality)
- [Website design](https://codepip.com/)

# Sources

- [image sources for the png vs jpg quiz](https://wallhaven.cc/)

# Tools

- [color palette generator](https://www.hover.dev/css-color-palette-generator) using the "Unreal Engine-ish" preset
- [opencode](https://opencode.ai/) to organize assets such as simplifying filenames and enumerating files and also generating tables for file format comparison
- [ffmpeg](https://ffmpeg.org/) to reformat files across different formats
- [chatgpt](https://chatgpt.com) used to ask for syntax and general best practices
- [google's gemini](https://gemini.google.com) used to generate AI images for quiz (Real vs. AI)
- [github copilot](https://github.com/copilot) used for code debugging and troubleshooting (mainly for JS)


# Notes

- I've stored the assets [here](https://quiz.k1mch1.space)

# Project Requirements

## HTML Structure & Content

- [x] Create a multi-page website with a minimum of 4 pages (e.g., Home, About, Contact, Core Content)
- [x] Use proper HTML5 document structure `(<!DOCTYPE html>,
`<html>, <head>, <body>)`
- [x] Apply semantic HTML elements `(<header>, <nav>, <main>, <section>, <article>, <footer>)`
- [x] Include headings, paragraphs, lists (ordered and/or unordered), and hyperlinks for navigation
- [x] Embed at least one image and one multimedia element (audio or video)
- [x] Include at least one table used appropriately for tabular data
- [x] Include at least one form with appropriate input types, labels,
and fieldsets

## CSS Styling & Layout

- [x] Use an external CSS stylesheet linked to all pages
- [x] Apply consistent typography (font families, sizes, weights, line-height, letter-spacing)
- [x] Style colors, backgrounds, and borders (for buttons)
- [x] Use the CSS box model (margin, padding, border) effectively
- [x] Implement page layout using Flexbox and/or CSS Grid
- [x] Style links with hover, visited, and active states
- [x] Style the table and form elements for a polished look

## Responsive Design

- [x] Implement at least two CSS media queries to adapt the layout for different screen sizes (e.g., mobile, tablet, desktop)
- [] Ensure the navigation, images, and layout adjust gracefully across devices
- [x] Use relative units (%, em, rem, vw/vh) where appropriate

# TODO



## Fixes

~~- [] fix the templating issue without using hardlinks (because `git` doesn't preserve hardlinks)~~
~~- [] css styling~~
- [] style table
- [x] responsive layout
  - [x] adjust header for different screens
  - [x] adjust grid for different screens
  - [] adjust hero-section for different screens
- [x] dark mode / light mode

## General stuff

- [] fix header theme, responsiveness and add a dark mode
- [x] format the `html` page with proper semantic elements
- [x] use external `css` for styling 
- [x] make the site mobile friendly through responsive layouts like `flexbox` and `css`
~~- [] use fonts using Google Fonts~~
- [x] include tables in the quizzes
- [x] include images and multimedia elements in the quizzes
- [x] include forms to report issues, and to submit quizzes will be used
- [x] include proper `css` styling will be used to make the site easy to use

## Pages

- [x] Home: there will be a hero section, a short description, and a list of quizzes available
- [x] Documentation: contains the correct `html` format for quiz creation, such that it's easy and repeatable to create new quizzes (We'll simply inject that `html` into the body of a simple template page we define for now).
  - [x] figure out that correct format
~~  - [] also try to do the bare minimum to prevent easy cheating~~
- [x] Submit a quiz: we'll have a form to allow visitors to submit their quizzes to be hosted on our website
- [x] `mp3` vs `wav`: a quiz to test whether the test taker can hear the difference between the lossy `mp3` audio vs the lossless `wav` audio format. We may also include different lossy audio compression formats such as `m4a`, `opus`, `ogg`, with different bitrates. This quiz demonstrates the usage of audio elements.
  - [x] make sure to include fall back text, make sure to include only non-copyrighted music
~~- [] Guess the song quiz~~
~~  - [] just play sections of copyrighted music~~
- [x] `png` vs `jpg`: a quiz to test whether we can see the difference between the lossless `png` image compression format vs the `jpg` image compression format. We may also include the `heic` and use different compression ratios
- [x] Guess the flag quiz
- [x] Real vs AI quiz
- [x] figure skating jumps

# Notes

To use `ffmpeg` in batch:

```
ls ./png/|xargs -I {} basename {} png | xargs -I {} ffmpeg -i ./png/{}png ./jpg/{}jpg
```
