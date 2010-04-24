---
layout: post
title: XML and JSDoc
excerpt: Working towards the goal of a machine-readable documentation standard.
categories:
  - jsdoc
---

A major goal of _JsDoc Toolkit 3_ is to promote standards. It will finally fulfil a frequently made request from JSDoc users: A standard XML output. The challenge with this has never been technical. JsDoc Toolkit already generates XHTML, modifying the templates to produce XML would be trivial. The real challenge is deciding what XML schema to follow. As far as I know there is no authoritative standard for representing JSDoc as XML. So, to accomplish the (as I described it) trivial task of writing a XML-based template, it looks like I'll first have to tackle the much larger task of defining a standard for that format.

> "The great thing about standards is there are so many to choose from."

I really am loathe to add yet another so-called standard to the mix of all those that are out there. Why? For starters I have no authority. Any suggestion I make is likely to be ignored or subverted by third parties. A perfect example of this is Google's recent release of "Closure Compiler" wich simply [redefines the syntax of some JSDoc tags](http://code.google.com/p/closure-compiler/issues/detail?id=26) that had already been in use for years in the JS community. Did they do this after lots of discussion with the users and developers of JSDoc? Pfft, why bother? They are, after all, a behemoth: anything they do is a defacto standard just because there is instantly a large community of users for whatever they release. So, no, they did not make any attempt at including the JSDoc users in such decisions. But that's another blog post...

The point is, this is fairly thin ice to be skating on, but we need to get across the river somehow, and I cannot wait any longer for a readymade standard to be offered up. So, begrudgingly, it appears that I will be exposing myself to more gonad-punches from the likes of Google; this time in the form of a proposed standard for a JSDoc XML representation.

Let's at least keep our exposure to such pain small, by following the closest thing to a standard that is currently out there. I've searched for this mythical thing and the nearest thing I came up with was--wait for it--the XML comments used in C#. Now, C# and JavaScript don't have a lot in common, except one small thing when it comes to standards: Turns out the C# language is defined by ECMA, and so is the JavaScript language. Okay, that's a pretty tenuous connection, but the bit I'm interested in is documentation comments, and looking at the [ECMA-334 Annex E](http://en.csharp-online.net/ECMA-334:_Annex_E._Documentation_Comments) docs it appears to be a good match for our needs.

And lucky for us it is a flexible standard too, as they state:

> Although developers are free to create their own set of tags, a recommended set is defined in §E.2.

So, let's start with an example of documentation written in JSDoc tags:

{% highlight js %}
    /**
    * Changes the Point's location by the given x- and y-offsets.
    * @param {Number} xoff The x-coordinate offset.
    * @param {Number} yoff The y-coordinate offset.
    * @example
    * The following code:
    *
    *     var p = new Point(3, 5);
    *     p.translate(-1, 3);
    *
    * results in `p`'s having the value (2, 8).
    * @returns {Point} A reference to this point.
    */
    Point.prototype.translate = function(xoff, yoff) {
        this.x += xor;
        this.y += yor;
        return this;
    }
{% endhighlight %}

Would translate to:

{% highlight xml %}
    <doc name="Point#translate">
    <summary>
    Changes the Point's location by the given x- and y-offsets.
    </summary>
    <param name="xoff" type="Number">The x-coordinate offset.</param>
    <param name="yoff" type="Number">The y-coordinate offset.</param>
    <example>
    The following code:
    <code>
    var p = new Point(3, 5);
    p.translate(-1, 3);
    </code>
    results in <c>p</c>'s having the value (2, 8).
    </example>
    <returns type="Point">
    A reference to this point.
    </returns>
    </doc>
{% endhighlight %}
