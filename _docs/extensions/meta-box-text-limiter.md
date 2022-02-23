---
title: Meta Box Text Limiter
---

Meta Box Text Limiter helps you to limit the number of characters or words entered for text and textarea fields.

## Settings

Assume you have a text field with the following settings:

```php
[
	'title' => 'My Text Field',
	'id'    => 't',
	'type'  => 'text',
],
```

And you want to limit the number of characters for that field to 40. Doing that by adding `'limit' => 40` to the field:

```php
[
	'title' => 'My Text Field',
	'id'    => 't',
	'type'  => 'text',
	'limit' => 40,
],
```

If you need to limit by words, just add `'limit_type' => 'word'`:


```php
[
	'title'      => 'My Text Field',
	'id'         => 't',
	'type'       => 'text',
	'limit'      => 40,
	'limit_type' => 'word',
],
```

That's all!

Note that this extension works only with [text](https://docs.metabox.io/fields/text/) and [textarea](https://docs.metabox.io/fields/textarea/) fields.
