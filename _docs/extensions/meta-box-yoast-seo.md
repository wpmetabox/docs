---
title: Meta Box for Yoast SEO
---

## Overview

Meta Box for Yoast SEO is a free extension which allows developers to add content of custom fields to Yoast SEO Content Analysis to have better SEO score.

It allows you to live preview the result with Javascript.

![yoast seo preview](https://i2.wp.com/metabox.io/wp-content/uploads/2015/08/meta-box-yoast-seo.png?w=760)

{% include installation.html %}

## Usage

Assume you have a [wysiwyg](https://docs.metabox.io/fields/wysiwyg/) field where you enter content:

```php
[
	'name' => 'My custom editor',
	'id'   => 'custom_content',
	'type' => 'wysiwyg',
],
```

And you want Yoast SEO to get its content to analyze. To do that, add `'add_to_wpseo_analysis' => true` to the field:


```php
[
	'name' => 'My custom editor',
	'id'   => 'custom_content',
	'type' => 'wysiwyg',
	'add_to_wpseo_analysis' => true,
],
```

That's all.

The plugin supports all types of fields, such as text, textarea and wysiwyg.
