# Principal 1: Least Specificity

**Principal 1:** Make any CSS selector only as specific as it **must be** to avoid breaking other styles, **no more**.

**Values:** Preserves reuse of styles, and reduces the cost of style maintenance.

## Think you understand CSS specificity?

**Quick Quiz: What background color is applied for the below <a> tag on hover?**
``` css
#headerSection div.class1 span.class2 a.class3 {
	background-color: red;
}

.headerSection div.class1 ul#myList span.class2 a.class3:hover {
	background-color: blue;
}

#headerSection #myList a {
  background-color: green;
}
```

``` html/xml
<header id="headerSection">
	<div class="class1">
		<ul id="myList">
			<li>
				<span class="class2">
					<a class="class3" href="#">I'm a link!</a>
				</span>
			</li>
		</ul>
	</div>
</header>
```

If you said, blue, you need to brush up on [CSS Specificity](css-specificity.md).
If you said, green, let's continue on.
