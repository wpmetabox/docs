---
title: Creating a post type
---

Creating a custom post type is done via UI with our free MB Custom Post Types & Custom Taxonomies extension. This extension is already bundled in Meta Box AIO/MB Core, or you can install it from [WordPress.org](https://wordpress.org/plugins/mb-custom-post-type/).

To create a new custom post type, go to **Meta Box &rarr; Post Types** and click **Add New**:

![creating a post type](https://i.imgur.com/hppj98e.png)

The settings are divided into 4 tabs:

- General: the post type names and slug
- Labels: all labels for the post type
- Advanced: advanced settings for the post types, including menu position, menu icon, REST API support, rewrite rules, etc.
- Supports: the features that the post type supports
- Taxonomies: the taxonomies that connect to the post type

After done, click **Publish** button to register the post type. Or click the **Get PHP Code** button to get the PHP code that you can insert into your theme's `functions.php` file (or your plugin's file). After inserting, you can deactivate the extension to make your site a little bit faster.
