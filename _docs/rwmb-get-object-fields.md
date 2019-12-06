---
title: rwmb_get_object_fields
---

## Overview

`rwmb_get_object_fields` is a helper function which gets list of custom fields for a specific object. The object can be a post or a term or a settings page.

## Usage

To get list of object fields, please use the following code:

```php
// For posts
$fields = rwmb_get_object_fields( 123 ); // Get by post ID, or
$fields = rwmb_get_object_fields( 'your_post_type' ); // By post type

// For terms, requires MB Term Meta extension
$fields = rwmb_get_object_fields( 123, 'term' ); // Get by term ID, or
$fields = rwmb_get_object_fields( 'your_taxonomy_slug', 'term' ); // Get by taxonomy slug
```
## Arguments

This function accepts 4 arguments as below:

```php
rwmb_get_object_fields( $type_or_id, $object_type = 'post' );
```

Name|Description
---|---
`$type_or_id`|The object ID or type. Type should be post type/post ID for posts, or taxonomy/term ID for terms or settings page ID for settings pages. Required.
`$object_type`|The object type: `post` (default), `term`, `user` or `setting`. Optional.

## Returned value

This function returns an associated array of fields, with keys are the fields' IDs. Each field is a full array of its own settings.
