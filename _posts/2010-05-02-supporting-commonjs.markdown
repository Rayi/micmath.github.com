---
layout: post
title: Supporting CommonJS
excerpt: New tags will make JsDoc Toolkit the best choice for documenting CommonJS modules.
categories:
  - jsdoc
  - commonjs
---

As I stated in [a recent post](/commonjs/jsdoc/2010/05/02/supporting-commonjs.html), "I am a great admirer of recursion." It's one of the reasons I chose to write a JavaScript documentation tool in JavaScript. Accordingly, starting now, the official and only purpose of _JsDoc Toolkit 3_ is to automatically generate documentation for itself. If anyone else finds it useful, that is merely coincidental.

As I've chosen to use a CommonJS standard to organize my projects code into modules, I am planning a `@module` tag to document it. Here's an example:

{% highlight js %}
    /**
	A collection of objects that relate to 2D geometry.
	@module geom/twoD
	@exports geom.twoD
	@requires geom/plane
    */
    
    geom = geom || {};
    geom.twoD = exports;
    require('geom/plane');
    
    /** @constructor geom.twoD.Point */
    geom.twoD.Point = function(x, y) {
        this.x = x;
        this.y = y;
    }
{% endhighlight %}

The `@exports` tag will default to the standard `exports` but, as shown above, you can document the fact that some other symbol name is referring to `exports`.