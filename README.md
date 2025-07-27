# Frontend Mentor - REST Countries API with color theme switcher solution

created: 27/7/2025

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:
- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Toggle the color scheme between light and dark mode
- Have the initial color scheme as the user's OS color scheme
- Have the full website functionallity and experience only using the keyboard

### Screenshot

![](./project%20screenshots/Screenshot%202025-07-28%20012945.png)

![](./project%20screenshots/Screenshot%202025-07-28%20014415.png)

![](./project%20screenshots/Screenshot%202025-07-28%20013453.png)

### Links

- Solution URL: [https://github.com/majedJh/Project13-rest-countries]

## My process

### Built with

- HTML5
- CSS
- Used my small self-built CSS library
- JS 
- JS intersecion observer
- JS Fetch API
- Rest Countries API

### What I learned

First time dealing whith modules (import export), and moving between two pages.I learnt a lot about window.location and how to manipulate the url, especially URLSearchParams.Used lazy load to load small batches of the countries. The best thing was fetching the API only once in all this proccess. I also used window.matchmedia to get the user's OS color scheme to first decide the color scheme, then stored the prefered color scheme in the localstorage

### Continued development

I'd like to implement more searching features and more sorting for the countries.

### Useful resources

- [ELzero web school Youtube](https://www.youtube.com/@ElzeroWebSchool)
- [MDN Web Documents](https://developer.mozilla.org/en-US/)
- [Rest countries API](https://restcountries.com/v3.1/)

## Author

- Frontend Mentor - https://www.frontendmentor.io/profile/majedJh
- Github - https://www.frontendmentor.io/profile/majedJh


