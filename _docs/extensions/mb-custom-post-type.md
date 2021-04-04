---
title: MB Custom Post Type
---

MB Custom Post Type helps you create custom post types and custom taxonomies with a user-friendly interface.

![screenshot](https://i.imgur.com/hppj98e.png)

## Creating post types

Go to **Meta Box &rarr; Post Types** and click **Add New** (see screenshot above). The settings are divided into 4 tabs:

- General: the post type names and slug
- Labels: all labels for the post type
- Advanced: advanced settings for the post types, including menu position, menu icon, REST API support, rewrite rules, etc.
- Supports: the features that the post type supports
- Taxonomies: the taxonomies that connect to the post type

After set all the settings, click **Publish** button to register the post type. Or click the **Get PHP Code** button to get the PHP code that you can insert into your theme's `functions.php` file (or your plugin's file). After inserting, you can deactivate the extension to make your site a little bit faster.

## Creating taxonomies

Go to **Meta Box &rarr; Taxonomies** and click **Add New**.

![create taxonomies](https://i.imgur.com/yy7wy9w.png)

The settings are similar to creating post types above.

## Notes

### Custom capabilities for custom post types

When creating custom post types, you have 3 options to set capabilities: copy from "post", copy from "page" or create custom capabilities. While copying from "post" or "page" is clear (the plugin simply applies the same capabilities from post or page for this custom post type), creating custom capabilities might be confusing.

When you select "custom" for capabilities, the plugin does the following (assumming we have a post type `book`):

- Set `'capability_type' => array( 'book', 'books' ),`, and
- Set `'map_meta_cap' => true`

These 2 steps will create the following capabilities for the post types:

```php
[edit_post]              => 'edit_book'
[read_post]              => 'read_book'
[delete_post]            => 'delete_book'

// Primitive capabilities used outside of map_meta_cap():

[edit_posts]             => 'edit_books'
[edit_others_posts]      => 'edit_others_books'
[publish_posts]          => 'publish_books'
[read_private_posts]     => 'read_private_books'

// Primitive capabilities used within map_meta_cap():

[read]                   => 'read',
[delete_posts]           => 'delete_books'
[delete_private_posts]   => 'delete_private_books'
[delete_published_posts] => 'delete_published_books'
[delete_others_posts]    => 'delete_others_books'
[edit_private_posts]     => 'edit_private_books'
[edit_published_posts]   => 'edit_published_books'
[create_posts]           => 'edit_books'
```

And thanks to `map_meta_cap`, standard admin role is able to edit the posts types.

### Block templates with MB Blocks

Sometimes you want to load default blocks created by [MB Blocks](https://metabox.io/plugins/mb-blocks/) when creating a new post. Block templates allow to specify a default initial state for an editor session. Use the argument `template` when registering the post type:

`'template'              => [
    ['meta-box/{$block_id}']
]`

### Reserved terms

There is a complete set of reserved keywords, or terms, in WordPress that should not be used in certain circumstances as they may conflict with core functionality. See more in [the documentation](https://codex.wordpress.org/Reserved_Terms).

### Force migrate

Since version 2.0.0, we've used the React JS when creating post types and taxonomies. If you update this extension from the older version 1.9.5 and face some errors like encoding characters or post types, taxonomies disappeared, please add the param mbcpt-force=1 to the URL and run it to force migrate post types and taxonomies to the new version. Example: [http://domain.com/wp-admin/?mbcpt-force=1](http://domain.com/wp-admin/?mbcpt-force=1)