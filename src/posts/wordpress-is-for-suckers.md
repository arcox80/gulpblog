---
author: Andrew Cox
date: 2016/07/31
title: Wordpress is for Suckers 
tagline: Blog site? Using Gulp? No problem.
tags: blog, jekyll, markdown, gulp, devschool, clean blog, gulpjs 
image: wdpsblog.jpg 
---

Well, after working for over 6 straight hours last night, I now have a fully functional blog site. Of course there are a couple of things that need to get ironed out, but I feel really good about what I have so far. Sure, it's not the coolest reason to be up at 3:30 am on a Saturday night/Sunday morning, but I'm a parent with a toddler so I don't mind. My wife didn't mind having control of the remote all night either.

<!--more-->

This site is being created using [Jekyll](https://jekyllrb.com). Jekyll is a static site generator. It takes a template directory containing text files, runs it through a converter, in my case [Markdown](https://daringfireball.net/projects/markdown), then its [Liquid](https://github.com/Shopify/liquid/wiki) renderer, and finally creates a complete website ready to be published.

So I am creating each post in Markdown while using a [YAML](http://yaml.org) front matter block that makes it easy to create posts with all of the information like author, date, title, tags, etc. right there and ready to be processed. These posts get placed into my existing template and a new page is created and added to the site. Everything is processed and put together thanks to [GulpJs](http://gulpjs.com). Gulp, you ask? I'll let [Jim's Blog](https://devschool.rocks/we-teach-gulpjs-for-front-end-development/) handle that one.

> With GulpJS we can build pages and posts from templates and markdown and json data, then inject the correct stylesheet and Javascript link tags, minify the html, css, and js, add cache-bursting urls, and even bundle up dozens of scripts and stylesheets into a single, compressed resource, making our websites super-duper fast.

Thanks Jim. Of course getting to this point in my blog has been rough and a lot of precious time was wasted on getting certain things to work, but that's okay. It's all part of the learning process. I started with the [Clean Blog](https://startbootstrap.com/template-overviews/clean-blog/) template using Bootstrap, but then found some other sites that were doing some nice things as well. So now my site is kind of a Frankenstein monster, having been stitched together using a couple of different themes. 

![Frankenstein Picture](../../img/frank.png)

While I feel like everything does fit, I know my code and definitely my CSS is a bit of a mess. Until I learn more, it's probably going to have to stay that way. 

There are two things I can take away from this experience. First, I now see why having a project to work on while you learn is so important. It makes your learning that much more powerful. The exercises that you do while watching videos and reading books have their uses sometimes. But my most meaninful moments were learning something new and then realizing this new knowledge could be used to fix a problem on my project. It was a great feeling and leads me to the second thing I can take away from all of this.

I'm having fun. There's few other things that I could see myself giving up a Saturday night to do. I've taken a risk to go down this path of web development, and it could have easily backfired. The school I put a lot of money to enroll in could have been a dud, or I could have gotten to this point and realize I hate it. Thankfully, neither one is the case. [Devschool](https://devschool.rocks) is great, and I can't wait to learn more. So thanks to Jim and all of my fellow students for making this a great experience!
