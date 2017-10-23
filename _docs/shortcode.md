---
title: Shortcode
---

You can use`[rwmb_meta]`shortcode built in Meta Box plugin to deal with the problem of inserting values of custom fields in post content without opening theme files and inserting PHP code.

The shortcode take the following attributes:

```php
[rwmb_meta post_id="15" meta_key="field_id" type="image" size="thumbnail" ...]
```

The `[rwmb_meta]` shortcode works exactly like `rwmb_meta` function (look at this [documentation](/displaying-fields/)). All attributes are the same.

## Shortcode attributes

Attribute|Description
---|---
`post_id`|The post ID. Optional. If not defined, then the ID of current post is used.
`meta_key`|The meta key, same as field ID. Required.
`type`|Field type. Default is `text`. You can bypass this attribute if your field has single value (e.g. not multiple, not clone). Required for field which is multiple or clone (`checkbox_list`, file and image fields, `taxonomy`, etc.).
`multiple`|If field has multiple values (like `select` with multiple selections), set this argument to `true`. It's automatically set to `true` for `checkbox_list`, file and image fields.
`size`|Image size, used for image fields only. If not present, the `thumbnail` size will be used.
`taxonomy`|The taxonomy for which to retrieve terms, used for taxonomy fields.