---
title: MB Rank Math
---

MB Rank Math helps you to add content of custom fields to Rank Math Content Analysis to have better SEO score.

![Meta Box - Rank Math Integration](https://i.imgur.com/tIyC0u9.jpg)

## Settings

To let Rank Math get a field's content to analyze, add `'rank_math_analysis' => true` to the field:

```php
[
	'name' => 'My custom editor',
	'id'   => 'custom_content',
	'type' => 'wysiwyg',
	'rank_math_analysis' => true,
],
```

The plugin supports all types of fields, such as text, textarea and wysiwyg.

This is the video tutorial:

<iframe width="560" height="315" src="https://www.youtube.com/embed/I3ncHxLxwlM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
