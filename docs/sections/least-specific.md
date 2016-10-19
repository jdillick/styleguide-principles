# Principal 1: Least Specificity

**Principal 1:** Make any CSS selector only as specific as it **must be** to avoid breaking other styles, **no more**.

**Values:** Preserves reuse of styles, and reduces the cost of style maintenance.

### CSS Specificity rules:

Before we can get into the nitty-gritty of least specificity, you must first understand how the browser handles specificity.

Selector types have different precedence, and all browsers use these differences to decide which style “wins” if any two selectors are setting the same property.

Below we have an example of the problem the browser is solving:

**What is the background color of the below markup?**

**HTML**
``` html/xml
<div class="person">
	I'm a person too.
</div>
```

**CSS**
``` css
div.person {
	background-color: red;
}

.person {
	background-color: blue;
}

div {
	background-color: grey;
}
```

The CSS specification was really smart in deciding how this system would work. By placing a completely different order of denomination upon different html markup characteristics that are more or less specific in the DOM, you can create a style system that naturally target the precise level of generic / specific that you desire.

It is useful to understand the math that goes into this comparison.

#### Element Selectors

Elements (e.g. `<p>`, `<a>`, `<span>`, `<h1>`) by themselves are the generic building blocks
of markup, and their CSS selectors are the least specific. Each of these has a specificity worth 1.

**Count each element in the following selector and assign 1 to each.**
``` css
div span a { /* 1 + 1 + 1 = 3 */}
```
