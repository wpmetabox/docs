---
title: Meta Box for Yoast SEO
---

Meta Box for Yoast SEO helps you to add content of custom fields to Yoast SEO Content Analysis to have better SEO score.

![yoast seo preview](https://i2.wp.com/metabox.io/wp-content/uploads/2015/08/meta-box-yoast-seo.png?w=760)

## Settings

To let Yoast SEO get a field's content to analyze, add `'add_to_wpseo_analysis' => true` to the field:

```php
[
	'name' => 'My custom editor',
	'id'   => 'custom_content',
	'type' => 'wysiwyg',
	'add_to_wpseo_analysis' => true,
],
```

The plugin supports all types of fields, such as text, textarea and wysiwyg.
