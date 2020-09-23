---
title: MB Custom Post Type
---

## Overview

The MB Custom Post Type extension is a powerful tool that helps you manage your custom post types and custom taxonomies via a user-friendly interface. It's very helpful when you want to create or edit a custom post type / custom taxonomy without touching code.

![screenshot](https://i.imgur.com/mmbVRPn.png)

For more information, please see the [extension page](https://metabox.io/plugins/custom-post-type/).

{% include installation.html %}

## Usage

After installing and activating the plugin, you'll see new menu items **Meta Box &rarr; Post Types** and **Meta Box &rarr; Taxonomies**. Clicking on each menu will go to the admin page where you can create/edit custom post types and custom taxonomies.

Here is the video tutorial on using the plugin to create a custom post type:

<iframe width="560" height="315" src="https://www.youtube.com/embed/9c4w5zdeTJI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

### Reserved terms

There is a complete set of reserved keywords, or terms, in WordPress that should not be used in certain circumstances as they may conflict with core functionality. See more in [the documentation](https://codex.wordpress.org/Reserved_Terms).