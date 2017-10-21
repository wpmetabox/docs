---
title: Conditional Logic and Taxonomies
permalink: /conditional-logic-taxonomies/
---

As you know, Meta Box Conditional Logic can works with default taxonomies like tags or categories and even custom taxonomy. For example:

*Visible a field or meta box when selected post category is either 4, or 5, or 6:*

```php
'visible' => ['post_category', 'in', [4,5,6]]
```

Since 1.3, you can define the condition's value using `slug`. Just append `slug:` before the selector. Like so:

```php
'visible' => ['slug:post_category', 'in', ['fashion', 'gaming', 'technology']]
```

Cool right?

You can also set conditional logic depends on selected custom taxonomy by using `tax_query`. Like so:

*Hide a field or meta box when selected custom taxonomy's id is greater than 5:*

```php
'hidden' => ['tax_query[product]', '>', 5]
```

Of course, it works with `slug` also:

```php
'hidden' => ['slug:tax_query[product]', '!=', 'drones']
```