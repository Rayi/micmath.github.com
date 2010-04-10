---
layout: post
title: More Succinct, More Explicit, More Standard
excerpt: A description of my goals in redesigning the doc tags in Version 3.
categories:
  - jsdoc
---

Or, three goals for tags in _JsDoc Toolkit 3_: shorter, clearer, better.

As this is a major version upgrade I feel I can break some backwards compatibility. As much as possible I will limit these breaks to things outside the tag standard. Asking people to rewrite all their doc comments would be a step too far. So today I committed a feature already available in Version 2: tag synonyms. This essentially allows users to use their preferred tag name in the comment, while internally JsDoc Toolkit will normalise the various names into a single doc property. It's worth pointing out that these synonyms will be exposed and can thus be modified by the user via a plugin, if they wish.

However, without breaking Version 2 support, I will be deprecating a few longer tag names for shorter versions. For example `@desc` will now be preferred over `@description` and `@member` over `@memberOf`.

### Beware of Helpful Machines


One flaw in the design of Version 2 was that it tried to be too helpful. I started with a laudable goal, I wanted to make the tool clever enough to find the name of the thing you were documenting. This meant the user wouldn't have to provide a `@name` tag. Unfortunately this only sometimes worked. That's because JavaScript is a very dynamic language with a very wide range of coding conventions. There can be a nearly infinite number of ways to define a function named "foo" for example. The result was that people expected and relied on the tool to find the name of the thing they were documenting for them, and more and more code had to be added to make that work.

Version 3 will only support the most straightforward patterns in source code to find the name for you. For example these two snippets will be equivalent:

Example 1. An explicit name provided:
{% highlight js %}
    /**
        @constructor
        @name Foo
     */
    function Foo() {
    }
{% endhighlight %}

Example 2. A name implied from the nearby code:
{% highlight js %}
    /**
        @constructor
     */
    function Foo() {
    }
{% endhighlight %}

The second example is missing it's `@name` tag. This will result in a "No @name provided." warning from Version 3, even though, in this particular example, things will still work. The general rule will be that in places where JSDoc.pm (Version 1) could guess the name, Version 3 will also be able to guess the name, but missing the @name tag is always a gamble, and so will result in a warning. To avoid the warnings provide a `@name` in every doc comment.

On the other hand it will be easier than ever to provide a name in Version 3. For example the name of a constructor can now be provided as part of the `@constructor` tag, like so:

Example 3. A name provided, succinctly:
{% highlight js %}
    /**
        @constructor Foo
     */
    function Foo() {
    }
{% endhighlight %}

This pattern will be followed for several other tags too, like `@method`, `@property` and `@namespace`.

### Yet Another Standard

Finally I will publish a minimum standard for JsDoc tags, in a form that can be used by others wishing to implement their own tags or tag parsers. Hopefully this will make it easier for various venders to avoid stepping on each others toes, in particular mine!