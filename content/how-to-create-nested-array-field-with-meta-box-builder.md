---
title: How to create nested array field with Meta Box Builder
permalink: /how-to-create-nested-array-field-with-meta-box-builder/
---

Did you used some advanced fields like Post, Taxonomy, Date picker...? You can define these field easily with nested array but how to do it with Meta Box Builder?

Imagine you want to create a **Post** field like so:

https://gist.github.com/tanng/a776f381f5e44c0c2828

**Prior to version 1.2**, to create a nested array in Meta Box Builder, you can use JSON, encode the whole array of tax_query and paste to it value. Like so:

![json value](https://metabox.io/wp-content/uploads/2015/04/Screen-Shot-2015-04-20-at-01.58.35.png)

**From 1.2**, you can use ***dot notation*** to define an array. For that `tax_query` above. We can define with dot notation like so:

![dot notation](https://metabox.io/wp-content/uploads/2015/04/Screen-Shot-2015-04-20-at-02.03.27.png)

Please note that I use `tax_query.0.taxonomy`, `tax_query.0.field`, and `tax_query.0.terms` because the taxonomy named `category`, the field named `slug` and the term named technology are belong to the first (and only one) array of tax_query, not directly belongs to tax_query.