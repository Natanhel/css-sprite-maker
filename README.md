# css-sprite-maker
  This small project makes CSS sprites from svg/png/gif

# Installation
1. Install [node.js](https://nodejs.org/),[python(2 version)](https://www.python.org/downloads/release/python-2710/),[Microsoft Visual Studio C++ 2013](https://support.microsoft.com/ru-ru/help/3179560/update-for-visual-c-2013-and-visual-c-redistributable-package) and gulp globally

		npm install gulp -g

2. Install npm packages. If you have problems in browser-sync install on Windows look [here](http://www.browsersync.io/docs/#windows-users)

		npm i

	If you use link of global packages:

		npm install gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace -g && npm link gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace
    
# Running
Put all your SVG/PNG/GIF files into the input folder and run

    npm run start
    
# Using in broswer
  A template is in the public/index.html folder and running the app would create a server on port 3000 that will run the index file.
  
  the basics:
  
        <!-- Examples on using SVG sprite -->
        <svg class="icon icon-home red_mod">
            <use xlink:href="img/sprite.svg#home"></use>
        </svg>
        
        <!-- Example of using PNG sprite -->        
        <div class="_1_png"></div>
        <div class="dot_png"></div>

        
        <!-- Example of using GIF sprite -->        
        <div class="_2_png"></div>
        <div class="tw_png"></div>  


# Credits
  The SVG part was taken from Glivera Team and all credits reserved to [them](https://github.com/glivera-team/glivera-team-template)

  [Here's their article](http://glivera-team.github.io/svg/2019/03/15/svg-sprites-2.en.html) about making SVG sprite.

  Hope you like it! :)
